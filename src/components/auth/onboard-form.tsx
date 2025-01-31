"use client";
import React, { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { ProfileSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { onboard } from "@/actions/onboard";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check,ChevronDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Combobox, ComboboxOptions } from "../ui/Combobox";
import { MultiSelect } from "../ui/multi-select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { ExtendedUser } from "../../../next-auth";
import toast, { Toaster } from "react-hot-toast";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const pronouns = [
  {label:"Still Figuring out", value: "Still Figuring out"},
  { value: "Software Engineer", label: "Software Engineer" },
  { value: "Full-Stack Developer", label: "Full-Stack Developer" },
  { value: "Front-End Developer", label: "Front-End Developer" },
  { value: "Back-End Developer", label: "Back-End Developer" },
  { value: "Data Scientist", label: "Data Scientist" },
  { value: "Data Analyst", label: "Data Analyst" },
  { value: "Cloud Engineer", label: "Cloud Engineer" },
  { value: "DevOps Engineer", label: "DevOps Engineer" },
  { value: "AI/ML Engineer", label: "AI/ML Engineer" },
  { value: "Cybersecurity Engineer", label: "Cybersecurity Engineer" },
  { value: "Blockchain Developer", label: "Blockchain Developer" },
  { value: "Game Developer", label: "Game Developer" },
  { value: "Mobile App Developer", label: "Mobile App Developer" },
  { value: "Web Developer", label: "Web Developer" },
  { value: "Site Reliability Engineer", label: "Site Reliability Engineer" },
  { value: "UI/UX Designer", label: "UI/UX Designer" },

  // Specialized Engineering Jobs
  { value: "HVAC Engineer", label: "HVAC Engineer" },
  { value: "Robotics Engineer", label: "Robotics Engineer" },
  { value: "Control Systems Engineer", label: "Control Systems Engineer" },
  { value: "Power Systems Engineer", label: "Power Systems Engineer" },
  { value: "Automation Engineer", label: "Automation Engineer" },
  { value: "Mechatronics Engineer", label: "Mechatronics Engineer" },
  { value: "Renewable Energy Engineer", label: "Renewable Energy Engineer" },
  { value: "VLSI Design Engineer", label: "VLSI Design Engineer" },
  { value: "Big Data Engineer", label: "Big Data Engineer" },
  { value: "IoT Engineer", label: "IoT Engineer" },
  { value: "Telecommunications Engineer", label: "Telecommunications Engineer" },
  { value: "Virtual Reality Engineer", label: "Virtual Reality Engineer" },
  { value: "Augmented Reality Developer", label: "Augmented Reality Developer" },

  // Project Management and Leadership Roles
  { value: "Engineering Manager", label: "Engineering Manager" },
  { value: "Project Engineer", label: "Project Engineer" },
  { value: "Technical Lead", label: "Technical Lead" },
  { value: "Product Manager", label: "Product Manager" },
  { value: "Quality Control Engineer", label: "Quality Control Engineer" },
  { value: "R&D Engineer", label: "R&D Engineer" },

  // Miscellaneous Engineering Jobs
  { value: "Safety Engineer", label: "Safety Engineer" },
  { value: "Materials Engineer", label: "Materials Engineer" },
  { value: "Geomatics Engineer", label: "Geomatics Engineer" },
  { value: "Geotechnical Engineer", label: "Geotechnical Engineer" },
  { value: "Construction Engineer", label: "Construction Engineer" },
  { value: "Forensic Engineer", label: "Forensic Engineer" },
  { value: "Acoustical Engineer", label: "Acoustical Engineer" },
]
const branches = [
  {label: "Information Technology", value:"Information Technology"},
  {label: "Computer Science Engineering", value:"Computer Science Engineering"},
  {label: "Electrical Engineering", value:"Electrical Engineering"},
  {label: "Mechanical Engineering", value:"Mechanical Engineering"},
  {label: "Civil Engineering", value:"Civil Engineering"},
  {label: "Mining Engineering", value:"Mining Engineering"},
] as const 

const batches = [
  {label: "2019", value:"2019"},
  {label: "2020", value:"2020"},
  {label: "2021", value:"2021"},
  {label: "2022", value:"2022"},
  {label: "2023", value:"2023"},
  {label: "2024", value:"2024"},
] as const

const skills = [ 
  { value: "Project Management", label: "Project Management" },
  { value: "Problem Solving", label: "Problem Solving" },
  { value: "Critical Thinking", label: "Critical Thinking" },
  { value: "Time Management", label: "Time Management" },
  { value: "Team Collaboration", label: "Team Collaboration" },
  { value: "Leadership", label: "Leadership" },
  { value: "Communication Skills", label: "Communication Skills" },
  { value: "Technical Writing", label: "Technical Writing" },
  { value: "Creativity", label: "Creativity" },
  { value: "Attention To Detail", label: "Attention To Detail" },

  // Design and Analysis
  { value: "CAD Design", label: "CAD Design" },
  { value: "Structural Analysis", label: "Structural Analysis" },
  { value: "Finite Element Analysis", label: "Finite Element Analysis" },
  { value: "Simulation Modeling", label: "Simulation Modeling" },
  { value: "Blueprint Reading", label: "Blueprint Reading" },
  { value: "System Design", label: "System Design" },

  // Programming and Software Development
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "C++", label: "C++" },
  { value: "C#", label: "C#" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Ruby", label: "Ruby" },
  { value: "MATLAB", label: "MATLAB" },
  { value: "SQL", label: "SQL" },
  { value: "R", label: "R" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "Go", label: "Go" },

  // Software Tools
  { value: "AutoCAD", label: "AutoCAD" },
  { value: "SolidWorks", label: "SolidWorks" },
  { value: "ANSYS", label: "ANSYS" },
  { value: "Revit", label: "Revit" },
  { value: "SketchUp", label: "SketchUp" },
  { value: "MATLAB", label: "MATLAB" },
  { value: "ArchiCAD", label: "ArchiCAD" },
  { value: "Primavera", label: "Primavera" },
  { value: "Microsoft Project", label: "Microsoft Project" },
  { value: "SAP2000", label: "SAP2000" },
  { value: "ETABS", label: "ETABS" },
  { value: "STAAD Pro", label: "STAAD Pro" },

  // Emerging Technologies
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Internet Of Things", label: "Internet Of Things" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Augmented Reality", label: "Augmented Reality" },
  { value: "Virtual Reality", label: "Virtual Reality" },
  { value: "3D Printing", label: "3D Printing" },
  { value: "Big Data", label: "Big Data" },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Cybersecurity", label: "Cybersecurity" },

  // Industry-Specific Skills
  { value: "HVAC Design", label: "HVAC Design" },
  { value: "Geotechnical Engineering", label: "Geotechnical Engineering" },
  { value: "Renewable Energy Systems", label: "Renewable Energy Systems" },
  { value: "Control Systems", label: "Control Systems" },
  { value: "Power Systems", label: "Power Systems" },
  { value: "Transportation Planning", label: "Transportation Planning" },
  { value: "Fluid Mechanics", label: "Fluid Mechanics" },
  { value: "Thermodynamics", label: "Thermodynamics" },

  // Soft Skills
  { value: "Adaptability", label: "Adaptability" },
  { value: "Conflict Resolution", label: "Conflict Resolution" },
  { value: "Emotional Intelligence", label: "Emotional Intelligence" },
  { value: "Networking", label: "Networking" },
  { value: "Negotiation Skills", label: "Negotiation Skills" },

  // Miscellaneous Skills
  { value: "Lean Manufacturing", label: "Lean Manufacturing" },
  { value: "Six Sigma", label: "Six Sigma" },
  { value: "Agile Methodology", label: "Agile Methodology" },
  { value: "Scrum Framework", label: "Scrum Framework" },
  { value: "Sustainability Practices", label: "Sustainability Practices" },
  { value: "Risk Assessment", label: "Risk Assessment" },
];
const socials = [
  { value: "insta", icon: FaInstagram, label: "Instagram" },
  { value: "linkedin", icon: FaLinkedin, label: "LinkedIn" },
  { value: "github", icon: FaGithub, label: "GitHub" },
  { value: "twitter", icon: FaTwitter, label: "Twitter" },
] as const


interface UserProps {
    user?: ExtendedUser,
}

export default function OnboardForm( {user} : UserProps) {

  const router = useRouter()

  function handleAppendGroup(label: ComboboxOptions['label']) {
    const newPronouns = {
      value: label,
      label,
    };
    pronouns.push(newPronouns);
  }
  
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: user?.email ?? "",
      batch: "",
      department: "",
      wannabe: "",
      skills: [],
      story: "",
      insta: "",
      linkedin: "",
      github: "",
      twitter: "",
    }
  });

  const [isPending, startTransition] = React.useTransition()
  const [open , setOpen] = React.useState(false)
  const [opened , setOpened] = React.useState(false)

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      onboard(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data?.error as string)
          }
          if (data?.success) {
            toast.success(data?.success as string)
            router.push("/profile")
          }
          if(data.error === "Profile already exists"){
            router.push("/profile")
          }
        })
     })
  }

 
  
  return (
    <Card className="max-w-md rounded-none h-full flex flex-col py-2 sm:border-r-1" >
      <Toaster />
      <CardHeader>
        <CardTitle className="text-xl">
          Welcome to College Connection
        </CardTitle>
        <CardDescription>
          Fill out the fields to continue creating your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit,(error)=>{ console.log(error)})}>
              <div className="grid gap-4 mb-4">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 gap-2">
                  <FormField
                    name="department"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:gap-2">
                        <FormLabel>Branch</FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isPending}
                                variant={"outline"}
                                role="combobox"
                                className={cn(
                                  "w-full justify-between h-10",
                                  !field.value && "text-muted-foreground"
                                )}>
                                  {field.value
                                   ? branches.find((branch) => branch.value === field.value)?.label
                                 :"Select Branch"}
                                 <ChevronDown size={24} className="opacity-50" />
                                </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-200px p-0" >
                            <Command>
                              <CommandInput placeholder="Select Your Branch" className="h-8"/>
                              <CommandList>
                                <CommandEmpty>No Branch found.</CommandEmpty>
                                <CommandGroup>
                                  {branches.map((branch)=>(
                                    <CommandItem
                                      disabled={isPending}
                                      value={branch.value}
                                      key={branch.value}
                                      onSelect={() => {
                                        form.setValue("department", branch.value)
                                        setOpen(false)
                                      }}>
                                      {branch.label}
                                      <Check className={cn("ml-auto", branch.value === field.value ?"opacity-100":"opacity-0" )} />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="batch"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Batch</FormLabel>
                        <Popover open={opened} onOpenChange={setOpened}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isPending}
                                variant={"outline"}
                                role="combobox"
                                className={cn(
                                  "w-200px justify-between h-10",
                                  !field.value && "text-muted-foreground"
                                )}> 
                                  {field.value
                                   ?batches.find((batch) => batch.value === field.value)?.label
                                 :"Select Batch"}
                                 <ChevronDown size={24} className="opacity-50" />
                                </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-200px p-0 z-[100]" >
                            <Command>
                              <CommandInput placeholder="Select Your Batch" className="h-8"/>
                              <CommandList>
                                <CommandEmpty>No results</CommandEmpty>
                                <CommandGroup>
                                  {batches.map((batch)=>(
                                    <CommandItem
                                      disabled={isPending}
                                      value={batch.value}
                                      key={batch.value}
                                      onSelect={() => {
                                        form.setValue("batch", batch.value)
                                        setOpened(false)
                                      }}>
                                      {batch.label}
                                      <Check className={cn("ml-auto", batch.value === field.value ?"opacity-100":"opacity-0" )} />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="wannabe"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How do you Identify Yourself / Your Pronouns(Or you can create one)</FormLabel>
                      <Combobox
                        disalbed={isPending}
                        options={pronouns}
                        placeholder="Select your pronoun or create one (Created pronouns is at last of the list)"
                        selected={field.value}
                        onChange={(option) => field.onChange(option.value)}
                        onCreate={handleAppendGroup}
                        />
                    </FormItem>
                  )}
                />
                <FormField  
                  name="skills"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <MultiSelect
                        disabled={isPending}
                        placeholder="Select your skills(Max 5)"
                        options={skills}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        animation={2}
                        maxCount={3}
                      />
                    </FormItem>
                  )}
                />
                <FormField  
                  name="story"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Story</FormLabel>
                      <Textarea
                        className="scroll"
                        disabled={isPending}
                        placeholder="Tell us a bit about yourself"
                        {...field}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" value={user?.email ?? ""} disabled={isPending}/>
                      </FormControl>
                    </FormItem>
                  )}
                />
               { socials.map((social) => (
                <FormField
                  key={social.value}
                  name={social.value}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder={"Enter your "+ social.label + " handle"} disabled={isPending}/>
                      </FormControl>
                    </FormItem>
                  )}
                />
                ))}
              <Button
                type="submit"
                disabled={isPending}
                variant={"gooeyLeft"}
                className="w-full"
              >
                Next &rarr;
              </Button>
              </div>
            </form>
          </Form>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
      </CardContent>
    </Card>
  );
}















