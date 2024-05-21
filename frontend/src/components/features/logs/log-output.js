"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";

import { useEffect, useState } from "react";

export function LogOutput() {
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  useEffect(() => {
    const getLogs = async () => {
      const res = await fetch("/api/logs");
      const data = await res.json();
      setLogs(data);
      setLoadingLogs(false);
    };

    getLogs();
  }, []);

  const downloadLogs = () => {
    const formattedLogs = logs.map(
      (log) => `[${log.timestamp}] ${log.type.toUpperCase()}: ${log.message}`,
    );
    const logText = formattedLogs.join("\n");

    const blob = new Blob([logText], { type: "text/plain" });

    const link = document.createElement("a");
    link.download = `antimatter-logs-${new Date().toISOString()}.txt`;
    link.href = window.URL.createObjectURL(blob);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Logs</h3>
          <p className="text-sm text-muted-foreground">
            View and download the Antimatter event log.
          </p>
        </div>
        <div>
          <Button onClick={downloadLogs}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <Separator />
      <div>
        <ScrollArea className="border p-5 rounded-lg h-full max-h-[455px] overflow-y-scroll">
          {!loadingLogs &&
            logs.map((log) => {
              if (log.type === "info")
                return (
                  <pre className="text-sm text-wrap" key={log._id}>
                    [{log.timestamp}] {log.type.toUpperCase()}: {log.message}
                  </pre>
                );
              if (log.type === "warn")
                return (
                  <pre
                    className="text-sm text-amber-500 text-wrap"
                    key={log._id}
                  >
                    [{log.timestamp}] {log.type.toUpperCase()}: {log.message}
                  </pre>
                );
              if (log.type === "error")
                return (
                  <pre className="text-sm text-red-500 text-wrap" key={log._id}>
                    [{log.timestamp}] {log.type.toUpperCase()}: {log.message}
                  </pre>
                );
            })}
        </ScrollArea>
      </div>
    </div>
  );
}
