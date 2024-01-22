"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [engagements, setEngagements] = useState([])
    const [loadingEngagements, setLoadingEngagements] = useState(true);

    const [clients, setClients] = useState([])
    const [loadingClients, setLoadingClients] = useState(true)


    useEffect(() => {
        async function getEngagements() {
            try {
                const session = await getSession()

                fetch("/api/engagements?showClientName=true", {
                    headers: {
                        "Authorization": "Bearer",
                    }
                }).then((res) => res.json())
                .then((data) => {
                    setEngagements(data)
                })
            } catch(error) {
                console.log(error)
                setEngagements([]);
            } finally {
                setLoadingEngagements(false);
            }
        };

        const getClients = async () => {
            try {
                fetch("/api/clients", {credentials: "include"}).then((res) => res.json())
                .then((data) => {
                    setClients(data)
                })
            } catch(error) {
                console.log(error)
                setClients([]);
            } finally {
                setLoadingClients(false)
            }
        }

        getEngagements();
        getClients() 
        }, [])


    return (
        <DataContext.Provider value={{ engagements, setEngagements, loadingEngagements, clients, setClients, loadingClients }}>
            {children}
        </DataContext.Provider>
        )
}

export const useData = () => useContext(DataContext)