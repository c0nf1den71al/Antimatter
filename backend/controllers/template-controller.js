const { database, driver } = require("../lib/mongoose");
const { createLog } = require("../lib/utils");
const { Readable } = require("stream");
const mongoose = require("mongoose");

const bucket = new driver.GridFSBucket(database, { bucketName: "templates" });

module.exports.getTemplates = async (req, res) => {
  try {
    const files = await bucket.find().toArray();
    return res.json(files);
  } catch (e) {
    return res.json(e);
  }
};

module.exports.createTemplate = async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    const title = req.body.title;

    // TODO: check mimetype

    const writeStream = bucket.openUploadStream(originalname, {
      metadata: { title: title, mimetype: mimetype },
    });

    const readable = new Readable();

    readable.push(buffer);
    readable.push(null);

    // Pipe the readable stream into the write stream and wait for it to finish
    readable.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    createLog("info", `The template "${title}" has been uploaded successfully`);

    const files = await bucket.find().toArray();

    const newFile = files.find(
      (file) => file._id.toString() === writeStream.id.toString(),
    );

    return res.json(newFile);
  } catch (e) {
    createLog("error", e);
    return res.json(e);
  }
};

module.exports.downloadTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(id),
    );

    downloadStream.on("file", (file) => {
      res.set("Content-Type", file.metadata.mimetype);
    });

    downloadStream.pipe(res);
  } catch (e) {
    return res.json(e);
  }
};
