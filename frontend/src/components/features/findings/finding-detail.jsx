"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TextEditor } from "@/components/shared/text-editor"
export function FindingDetail({ findingId }) {
    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium">Finding</h3>
                    <p className="text-sm text-muted-foreground">
                        Change details relating to a finding using the form below.
                    </p>
                </div>
                <div>
                    <Button onClick={() => { form.handleSubmit(onSubmit)() }}>Save (ctrl+s)</Button>
                </div>
            </div>
            <Separator />
            <TextEditor />
        </div>
    )
}