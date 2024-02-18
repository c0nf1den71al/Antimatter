"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { stripTrailingSlash } from "@/lib/utils";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [engagements, setEngagements] = useState([])
    const [loadingEngagements, setLoadingEngagements] = useState(true);

    const [clients, setClients] = useState([])
    const [loadingClients, setLoadingClients] = useState(true)

    const [vulnerabilities, setVulnerabilities] = useState([])
    const [loadingVulnerabilities, setLoadingVulnerabilities] = useState(true)

    const [findings, setFindings] = useState([])
    const [loadingFindings, setLoadingFindings] = useState(true)

    const [templates, setTemplates] = useState([])
    const [loadingTemplates, setLoadingTemplates] = useState(true)

    const [settings, setSettings] = useState([])
    const [loadingSettings, setLoadingSettings] = useState(true)

    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState(true)


    useEffect(() => {
        async function getSettings() {
            try {
                const res = await fetch("/api/settings")
                const data = await res.json()
                setSettings(data)
            } catch (error) {
                console.log(error)
                setEngagements([])
            } finally {
                setLoadingSettings(false)
            }
        }

        async function getEngagements() {
            try {
                const res = await fetch("/api/engagements")
                const data = await res.json()
                setEngagements(data)
            } catch (error) {
                console.log(error)
                setEngagements([]);
            } finally {
                setLoadingEngagements(false);
            }
        };

        const getClients = async () => {
            try {
                const res = await fetch("/api/clients")
                const data = await res.json()
                setClients(data)
            } catch (error) {
                console.log(error)
                setClients([]);
            } finally {
                setLoadingClients(false)
            }
        }

        const getVulnerabilities = async () => {
            try {
                const res = await fetch("/api/vulnerabilities")
                const data = await res.json()
                setVulnerabilities(data)
            } catch (error) {
                console.log(error)
                setVulnerabilities([]);
            } finally {
                setLoadingVulnerabilities(false)
            }
        }

        getSettings();
        getEngagements();
        getClients();
        getVulnerabilities();
    }, [])

    return (
        <DataContext.Provider value={{ 
            settings, setSettings, loadingSettings,
            engagements, setEngagements, loadingEngagements,
            clients, setClients, loadingClients,
            vulnerabilities, setVulnerabilities, loadingVulnerabilities,
            findings, setFindings, loadingFindings, setLoadingFindings,
            templates, setTemplates, loadingTemplates
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)