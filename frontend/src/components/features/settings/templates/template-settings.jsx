"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { TemplatesTable } from "@/components/features/settings/templates/templates-table";
import { columns } from "./columns";

import { useData } from "@/providers/data-provider";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

import { cn, stripTrailingSlash } from "@/lib/utils";

export function TemplateSettings({ vulnerabilityId }) {
  const { templates, setLoadingTemplates } = useData();
  const form = useForm();
  const { toast } = useToast();

  async function onSubmit(values) {
    // let postBody = values
    // postBody.startDate = values?.dateRange?.from
    // postBody.endDate = values?.dateRange?.to
    // delete postBody?.dateRange

    // const res = await fetch(`/api/engagements/${engagementId}`, {
    //     method: "POST",
    //     body: JSON.stringify(postBody)
    // })

    // const data = await res.json()
    // const oldEngagement = engagements.find((engagement) => engagement._id === engagementId)
    // data.clientShortName = oldEngagement.clientShortName
    // data.clientLongName = oldEngagement.clientLongName

    // setEngagements([...engagements.filter((engagement => engagement._id !== engagementId)), data])
    // toast({ description: `Engagement "${data.engagementIdentifier}" has been updated successfully.` })
    return null;
  }
  return (
    <div className="space-y-6 h-full">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Templates</h3>
          <p className="text-sm text-muted-foreground">
            Upload templates used when generating Antimatter reports.
          </p>
        </div>
      </div>
      <Separator />
      <TemplatesTable columns={columns} />
    </div>
  );
}
