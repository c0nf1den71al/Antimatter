const Vulnerability = require("../models/Vulnerability");
const { createLog } = require("../lib/utils");

module.exports.getVulnerabilities = async (req, res) => {
  try {
    const vulnerabilities = await Vulnerability.find({});
    return res.json(vulnerabilities);
  } catch (e) {
    createLog("error", e);
    return res.json({ error: "An error occured" }).status(500);
  }
};

module.exports.createVulnerability = async (req, res) => {
  try {
    const { vulnerabilityIdentifier = undefined, title = undefined } = req.body;
    if (!title || !vulnerabilityIdentifier)
      return res.json({
        error: "'vulnerabilityIdentifier' and 'title' are required.",
      });
    const client = await Vulnerability.create({
      vulnerabilityIdentifier,
      title,
    });
    createLog(
      "info",
      `The vulnerability "${vulnerabilityIdentifier}" was created successfully`,
    );
    return res.json(client);
  } catch (e) {
    createLog("error", e);
    return res.json({ error: "An error occured" }).status(500);
  }
};

module.exports.deleteVulnerability = async (req, res) => {
  try {
    const vulnerabilities = await Vulnerability.findByIdAndDelete(
      req.params.vulnerabilityId,
      { new: true },
    );
    createLog(
      "info",
      `The vulnerability "${vulnerabilities.vulnerabilityIdentifier}" was deleted successfully`,
    );
    return res.json(vulnerabilities);
  } catch (e) {
    createLog("error", e);
    return res.json({ error: "An error occured" }).status(500);
  }
};

module.exports.updateVulnerability = async (req, res) => {
  try {
    let {
      vulnerabilityIdentifier = undefined,
      severity = undefined,
      title = undefined,
      category = undefined,
      summary = undefined,
      impact = undefined,
      remediation = undefined,
    } = req.body;

    if (summary) summary = JSON.stringify(summary);
    if (remediation) remediation = JSON.stringify(remediation);
    if (impact) impact = JSON.stringify(impact);
    const updateObject = Object.assign(
      {},
      ...Object.entries({
        vulnerabilityIdentifier,
        severity,
        title,
        category,
        summary,
        impact,
        remediation,
      })
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => ({ [key]: value })),
    );

    if (Object.keys(updateObject).length > 0) {
      const vulnerability = await Vulnerability.findByIdAndUpdate(
        req.params.vulnerabilityId,
        updateObject,
        { new: true },
      );
      createLog(
        "info",
        `The vulnerability "${vulnerability.vulnerabilityIdentifier}" was updated successfully`,
      );
      return res.json(vulnerability);
    } else {
      return res.json({ error: "Please specify a field to update" });
    }
  } catch (e) {
    console.log(e);
    return res.json({ error: "An error occured" }).status(500);
  }
};
