"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useData } from "@/providers/data-provider"
import { useCallback, useRef, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { TextEditor } from "@/components/shared/text-editor"


export function FindingSummary({ engagementId, findingId }) {
    const { engagements, setEngagements, loadingEngagements } = useData()

    const engagement = engagements.filter((engagement) => engagement._id == engagementId)[0]
    console.log(engagement)
    const finding = engagement?.findings.filter((finding) => finding._id == findingId)[0]

    const summary  = useRef(null)
    const {toast} = useToast()


    const submit = useCallback(async () => {
        const editor = summary.current;

        // Handle the case where editor is null
        if (editor) {

            // const res = await fetch(`/api/vulnerabilities/${vulnerabilityId}`, { 
            //     method: "POST",
            //     body: JSON.stringify({summary: editor.children})
            // }) 
            
            // const data = await res.json()
            // let updatedVulnerabilities = [...vulnerabilities]
            // updatedVulnerabilities[vulnerabilities.findIndex(vulnerability => vulnerability._id === vulnerabilityId)] = data

            // setVulnerabilities(updatedVulnerabilities)
            // toast({ description: `Vulnerability "${data.vulnerabilityIdentifier}" has been updated successfully.` })
        }
    }, []);

    useEffect(() => {
        const down = (e) => {
            if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                submit()
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <div className="space-y-6 h-full">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium">Summary</h3>
                    <p className="text-sm text-muted-foreground">
                        Edit summary of a finding using the text editor below.
                    </p>
                </div>
                <div>
                    <Button onClick={() => { submit() }}>Save (ctrl+s)</Button>
                </div>
            </div>
            <Separator />
        {!loadingEngagements && finding?.summary ? (
            <TextEditor initialValue={JSON.parse(finding?.summary)} editorRef={summary}/>
        ) : (
            <span className="w-full flex items-center justify-center pt-6"><Loader2 className="h-8 w-8 animate-spin" /></span>
        )}
        <p></p>
        </div>
    )
}