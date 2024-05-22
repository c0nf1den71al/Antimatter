// "use client"

// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { TextEditor } from "@/components/shared/text-editor"
// export function FindingDetail({ findingId }) {
//     return (
//         <div className="space-y-6">
//             <div className="flex flex-row justify-between items-center">
//                 <div>
//                     <h3 className="text-lg font-medium">Finding</h3>
//                     <p className="text-sm text-muted-foreground">
//                         Change details relating to a finding using the form below.
//                     </p>
//                 </div>
//                 <div>
//                     <Button onClick={() => { form.handleSubmit(onSubmit)() }}>Save (ctrl+s)</Button>
//                 </div>
//             </div>
//             <Separator />
//             <TextEditor />
//         </div>
//     )
// }
//
//
//

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useData } from "@/providers/data-provider";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function FindingDetail({ engagementId, findingId }) {
  const { engagements, setEngagements, loadingEngagements, settings } =
    useData();

  const form = useForm();
  const { toast } = useToast();

  const engagement = engagements.filter(
    (engagement) => engagement._id == engagementId,
  )[0];

  const finding = engagement?.findings.filter(
    (finding) => finding._id == findingId,
  )[0];

  const categories = settings.find(
    (setting) => setting.name === "categories",
  )?.value;

  async function onSubmit(values) {
    let postBody = values;

    // const res = await fetch(`/api/vulnerabilities/${vulnerabilityId}`, {
    //   method: "POST",
    //   body: JSON.stringify(postBody),
    // });

    // const data = await res.json();
    // setVulnerabilities([
    //   ...vulnerabilities.filter(
    //     (vulnerability) => vulnerability._id !== vulnerabilityId,
    //   ),
    //   data,
    // ]);
    toast({
      description: `Finding "${data.findingIdentifier}" has been updated successfully.`,
    });
  }

  useEffect(() => {
    form.setValue("title", finding?.title);
    form.setValue("findingIdentifier", finding?.findingIdentifier);
    form.setValue("severity", finding?.severity);
    form.setValue("status", finding?.status);
    form.setValue("category", finding?.category);

    const down = (e) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        form.handleSubmit(onSubmit)();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [engagements]);

  return (
    <div className="space-y-6 h-full">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Overview</h3>
          <p className="text-sm text-muted-foreground">
            Change details relating to a finding using the form below.
          </p>
        </div>
        <div>
          <Button
            onClick={() => {
              form.handleSubmit(onSubmit)();
            }}
          >
            Save (ctrl+s)
          </Button>
        </div>
      </div>
      <Separator />
      <ScrollArea className="h-full">
        <Form {...form}>
          <form onSubmit={() => form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid-cols-4 grid gap-4 w-full">
                <FormField
                  control={form.control}
                  name="findingIdentifier"
                  render={({ field }) => (
                    <FormItem className="flex flex-col col-span-3">
                      <FormLabel>Finding Identifier</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="VULN-001"
                          value={field.value}
                          onChange={field.onChange}
                          autoComplete="off"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Default Severity</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={finding?.severity}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a severity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="informational">
                            Informational
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Remote Code Execution (RCE) via SQL Injection"
                        value={field.value}
                        onChange={field.onChange}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid-cols-4 grid gap-4 w-full">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex flex-col col-span-2">
                      <FormLabel>Category</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? categories.find(
                                    (category) => category === field.value,
                                  )
                                : "Select category"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-[200px] p-0"
                          align={"start"}
                        >
                          <Command>
                            <CommandInput placeholder="Search categories..." />
                            <CommandEmpty>No categories found.</CommandEmpty>
                            <CommandGroup>
                              {categories?.map((category) => (
                                <CommandItem
                                  value={category}
                                  key={category}
                                  onSelect={() => {
                                    form.setValue("category", category);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      category.toUpperCase() ===
                                        field.value?.toUpperCase()
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {category}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-col col-span-2">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={finding?.status}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a severity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="unaddressed">
                            Unaddressed
                          </SelectItem>
                          <SelectItem value="partially-remediated">
                            Partially Remediated
                          </SelectItem>
                          <SelectItem value="remediated">Remediated</SelectItem>
                          <SelectItem value="risk-accepted">
                            Risk Accepted
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
}
