"use client"

import {
    Sliders,
    Settings,
    FileCode2,
    Search,
    User,
    Route,
    Building2,
    Bug,
    Users,
    UserCog,
    FileClock
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

import { Button } from "@/components/ui/button"

import { useEffect, useState, useCallback } from "react"
import { useData } from "@/providers/data-provider"
import { useRouter } from "next/navigation"

export function GlobalSearch() {
    const { engagements, loadingEngagements, clients, loadingClients, vulnerabilities, loadingVulnerabilities, templates, loadingTemplates } = useData()
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = useCallback((command) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="ghost" size="icon" className="cursor-pointer"><Search className="h-5" /></Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/engagements"))}>
                            <Route className="mr-2 h-4 w-4" />
                            <span>Engagements</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/vulnerabilities"))}>
                            <Bug className="mr-2 h-4 w-4" />
                            <span>Vulnerabilities</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/clients"))}>
                            <Building2 className="mr-2 h-4 w-4" />
                            <span>Clients</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/templates"))}>
                            <FileCode2 className="mr-2 h-4 w-4" />
                            <span>Templates</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    {!loadingEngagements && engagements.length > 0 && (
                        <>
                            <CommandGroup heading="Engagements">
                                {engagements.map((engagement) => {
                                    return (
                                        <CommandItem key={engagement._id} onSelect={() => runCommand(() => router.push(`/dashboard/engagements/${engagement._id}`))}>
                                            <Route className="mr-2 h-4 w-4" />
                                            <span>{engagement.engagementIdentifier}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}
                    {!loadingVulnerabilities && vulnerabilities.length > 0 && (
                        <>
                            <CommandGroup heading="Vulnerabilities">
                                {vulnerabilities.map((vulnerability) => {
                                    return (
                                        <CommandItem key={vulnerability._id} onSelect={() => runCommand(() => router.push(`/dashboard/vulnerabilities/${vulnerability._id}`))}>
                                            <Bug className="mr-2 h-4 w-4" />
                                            <span>{vulnerability.title}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}
                    {!loadingClients && clients.length > 0 && (
                        <>
                            <CommandGroup heading="Clients">
                                {clients.map((client) => {
                                    return (
                                        <CommandItem key={client._id} onSelect={() => runCommand(() => router.push(`/dashboard/clients/${client._id}`))}>
                                            <Building2 className="mr-2 h-4 w-4" />
                                            <span>{client?.shortName ? client.shortName : client.longName}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}
                    <CommandGroup heading="Settings">
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
                            <Sliders className="mr-2 h-4 w-4" />
                            <span>General</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings/account"))}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Account</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings/vulnerabilities"))}>
                            <Bug className="mr-2 h-4 w-4" />
                            <span>Findings & Vulnerabilities</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings/users"))}>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Users</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings/roles"))}>
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>Roles</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings/templates"))}>
                            <FileCode2 className="mr-2 h-4 w-4" />
                            <span>Templates</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings/logs"))}>
                            <FileClock className="mr-2 h-4 w-4" />
                            <span>Logs</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
