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
    Paintbrush2
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
                    {!loadingTemplates && templates.length > 0 && (
                        <>
                            <CommandGroup heading="Templates">
                                {templates.map((template) => {
                                    return (
                                        <CommandItem key={template._id} onSelect={() => runCommand(() => router.push(`/dashboard/templates/${template._id}`))}>
                                            <FileCode2 className="mr-2 h-4 w-4" />
                                            <span>{template.name}</span>
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
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Account</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
                            <Paintbrush2 className="mr-2 h-4 w-4" />
                            <span>Apperance</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
