"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useData } from "@/providers/data-provider";
import { useState } from "react";

export function CreateDialog() {
  const { toast } = useToast();
  const { templates, setTemplates } = useData();
  const { file, setFile } = useState();
  const form = useForm();

  async function onSubmit(values) {
    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("file", values.file);

    const res = await fetch("/api/templates", {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    setTemplates([...templates, data]);
    toast({
      description: `Template "${data.metadata.title}" has been created successfully.`,
    });
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-3">Upload Template</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Upload Template</DialogTitle>
              <DialogDescription>
                Use the form below to upload a new template.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Penetration Testing Template - v1.0"
                        {...field}
                        autoComplete="off"
                        data-1p-ignore
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(event) => {
                          onChange(event.target.files && event.target.files[0]);
                        }}
                        {...fieldProps}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
