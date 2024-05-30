"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [engagements, setEngagements] = useState([]);
  const [loadingEngagements, setLoadingEngagements] = useState(true);
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loadingVulnerabilities, setLoadingVulnerabilities] = useState(true);
  const [findings, setFindings] = useState([]);
  const [loadingFindings, setLoadingFindings] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [settings, setSettings] = useState([]);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const fetchData = async (endpoint, setter, setLoading) => {
    setLoading(true);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setter(data);
    } catch (error) {
      console.error(error);
      setter([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData("/api/settings", setSettings, setLoadingSettings);
    fetchData("/api/engagements", setEngagements, setLoadingEngagements);
    fetchData("/api/clients", setClients, setLoadingClients);
    fetchData(
      "/api/vulnerabilities",
      setVulnerabilities,
      setLoadingVulnerabilities,
    );
    fetchData("/api/templates", setTemplates, setLoadingTemplates);

    // Fetch data every 5 seconds
    // TODO: Find a better way to do this without interval? Websockets?
    // This currently doesnt work as overwrites the user when they are typing...

    // const intervalId = setInterval(() => {
    //   fetchData("/api/settings", setSettings, setLoadingSettings);
    //   fetchData("/api/engagements", setEngagements, setLoadingEngagements);
    //   fetchData("/api/clients", setClients, setLoadingClients);
    //   fetchData(
    //     "/api/vulnerabilities",
    //     setVulnerabilities,
    //     setLoadingVulnerabilities,
    //   );
    // }, 5000);

    // return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <DataContext.Provider
      value={{
        settings,
        setSettings,
        loadingSettings,
        engagements,
        setEngagements,
        loadingEngagements,
        clients,
        setClients,
        loadingClients,
        vulnerabilities,
        setVulnerabilities,
        loadingVulnerabilities,
        findings,
        setFindings,
        loadingFindings,
        setLoadingFindings,
        templates,
        setTemplates,
        loadingTemplates,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
