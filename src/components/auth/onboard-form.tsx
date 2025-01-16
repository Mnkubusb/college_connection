"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { ProfileSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { onboard } from "@/actions/onboard";
import { useCurrentUser } from "@/hooks/get-current-user";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check,ChevronDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Combobox, ComboboxOptions } from "../ui/Combobox";
import { MultiSelect } from "../ui/multi-select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { ExtendedUser } from "../../../next-auth";

const pronouns = [
  {label:"Still Figuring out", value: "SFT"},
  {label:"Singer", value: "Singer"},
  {label:"Dancer", value: "Dancer"},
  {label:"Sportsman", value: "Sportsman"},
  {label:"Artist", value: "Artist"},
  {label:"Designer", value: "Designer"},
  { value: "software_engineer", label: "Software Engineer" },
  { value: "full_stack_developer", label: "Full-Stack Developer" },
  { value: "front_end_developer", label: "Front-End Developer" },
  { value: "back_end_developer", label: "Back-End Developer" },
  { value: "data_scientist", label: "Data Scientist" },
  { value: "data_analyst", label: "Data Analyst" },
  { value: "cloud_engineer", label: "Cloud Engineer" },
  { value: "devops_engineer", label: "DevOps Engineer" },
  { value: "ai_ml_engineer", label: "AI/ML Engineer" },
  { value: "cybersecurity_engineer", label: "Cybersecurity Engineer" },
  { value: "blockchain_developer", label: "Blockchain Developer" },
  { value: "game_developer", label: "Game Developer" },
  { value: "mobile_app_developer", label: "Mobile App Developer" },
  { value: "systems_engineer", label: "Systems Engineer" },
  { value: "network_engineer", label: "Network Engineer" },
  { value: "database_administrator", label: "Database Administrator" },
  { value: "it_project_manager", label: "IT Project Manager" },
  { value: "product_manager", label: "Product Manager" },
  { value: "site_reliability_engineer", label: "Site Reliability Engineer (SRE)" },
  { value: "ui_ux_designer", label: "UI/UX Designer" },
  { value: "technical_support_engineer", label: "Technical Support Engineer" },
  { value: "qa_engineer", label: "QA Engineer (Quality Assurance)" },
  { value: "it_consultant", label: "IT Consultant" },
  { value: "iot_engineer", label: "IoT Engineer" },
  { value: "vlsi_design_engineer", label: "VLSI Design Engineer" },
  { value: "robotics_software_engineer", label: "Robotics Software Engineer" },
  { value: "big_data_engineer", label: "Big Data Engineer" },
  { value: "virtual_reality_engineer", label: "Virtual Reality Engineer" },
  { value: "augmented_reality_developer", label: "Augmented Reality Developer" },
  { value: "e_commerce_specialist", label: "E-commerce Specialist" },
  { value: "security_analyst", label: "Security Analyst" },
  { value: "web_developer", label: "Web Developer" },
  // Civil Engineering
  { value: "structural_engineer", label: "Structural Engineer" },
  { value: "construction_manager", label: "Construction Manager" },
  { value: "geotechnical_engineer", label: "Geotechnical Engineer" },
  { value: "transportation_engineer", label: "Transportation Engineer" },
  { value: "environmental_engineer", label: "Environmental Engineer" },
  { value: "urban_planner", label: "Urban Planner" },
  { value: "quantity_surveyor", label: "Quantity Surveyor" },
  { value: "site_engineer", label: "Site Engineer" },
  { value: "water_resources_engineer", label: "Water Resources Engineer" },
  { value: "highway_engineer", label: "Highway Engineer" },
  { value: "bim_specialist", label: "BIM Specialist" },
  { value: "coastal_engineer", label: "Coastal Engineer" },

  // Mechanical Engineering
  { value: "design_engineer", label: "Design Engineer" },
  { value: "hvac_engineer", label: "HVAC Engineer" },
  { value: "automotive_engineer", label: "Automotive Engineer" },
  { value: "maintenance_engineer", label: "Maintenance Engineer" },
  { value: "manufacturing_engineer", label: "Manufacturing Engineer" },
  { value: "thermal_engineer", label: "Thermal Engineer" },
  { value: "mechatronics_engineer", label: "Mechatronics Engineer" },
  { value: "robotics_engineer", label: "Robotics Engineer" },
  { value: "aerospace_engineer", label: "Aerospace Engineer" },
  { value: "tooling_engineer", label: "Tooling Engineer" },
  { value: "energy_systems_engineer", label: "Energy Systems Engineer" },
  { value: "materials_engineer", label: "Materials Engineer" },

  // Electrical Engineering
  { value: "electrical_design_engineer", label: "Electrical Design Engineer" },
  { value: "power_systems_engineer", label: "Power Systems Engineer" },
  { value: "control_systems_engineer", label: "Control Systems Engineer" },
  { value: "circuit_design_engineer", label: "Circuit Design Engineer" },
  { value: "embedded_systems_engineer", label: "Embedded Systems Engineer" },
  { value: "instrumentation_engineer", label: "Instrumentation Engineer" },
  { value: "renewable_energy_engineer", label: "Renewable Energy Engineer" },
  { value: "transmission_engineer", label: "Transmission Engineer" },
  { value: "substation_engineer", label: "Substation Engineer" },
  { value: "motor_control_engineer", label: "Motor Control Engineer" },
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
  // Soft Skills
  { value: "communication", label: "Communication" },
  { value: "teamwork", label: "Teamwork" },
  { value: "leadership", label: "Leadership" },
  { value: "problem_solving", label: "Problem Solving" },
  { value: "critical_thinking", label: "Critical Thinking" },
  { value: "time_management", label: "Time Management" },
  { value: "adaptability", label: "Adaptability" },
  { value: "conflict_resolution", label: "Conflict Resolution" },
  { value: "decision_making", label: "Decision Making" },
  { value: "creativity", label: "Creativity" },
  { value: "interpersonal_skills", label: "Interpersonal Skills" },
  { value: "emotional_intelligence", label: "Emotional Intelligence" },
  { value: "negotiation", label: "Negotiation" },
  { value: "collaboration", label: "Collaboration" },
  { value: "presentation_skills", label: "Presentation Skills" },
  { value: "attention_to_detail", label: "Attention to Detail" },

  // Programming Languages
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "c_plus_plus", label: "C++" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "r", label: "R" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "matlab", label: "MATLAB" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "assembly", label: "Assembly" },

  // Technologies
  { value: "cloud_computing", label: "Cloud Computing" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "aws", label: "AWS" },
  { value: "azure", label: "Azure" },
  { value: "google_cloud", label: "Google Cloud" },
  { value: "blockchain", label: "Blockchain" },
  { value: "machine_learning", label: "Machine Learning" },
  { value: "artificial_intelligence", label: "Artificial Intelligence" },
  { value: "data_science", label: "Data Science" },
  { value: "big_data", label: "Big Data" },
  { value: "devops", label: "DevOps" },
  { value: "internet_of_things", label: "Internet of Things (IoT)" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "web_development", label: "Web Development" },
  { value: "mobile_development", label: "Mobile Development" },
  { value: "virtual_reality", label: "Virtual Reality (VR)" },
  { value: "augmented_reality", label: "Augmented Reality (AR)" },
  { value: "robotics", label: "Robotics" },
  { value: "automation", label: "Automation" },
  { value: "bim", label: "Building Information Modeling (BIM)" },
  { value: "pdm", label: "Product Data Management (PDM)" },
  { value: "erp", label: "Enterprise Resource Planning (ERP)" },
  { value: "crm", label: "Customer Relationship Management (CRM)" },

  // Frameworks and Libraries
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue.js" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "spring", label: "Spring" },
  { value: "tensorflow", label: "TensorFlow" },
  { value: "pytorch", label: "PyTorch" },
  { value: "bootstrap", label: "Bootstrap" },
  { value: "tailwind_css", label: "Tailwind CSS" },

  // Miscellaneous
  { value: "version_control", label: "Version Control (Git)" },
  { value: "agile_methodologies", label: "Agile Methodologies" },
  { value: "scrum", label: "Scrum" },
  { value: "design_thinking", label: "Design Thinking" },
  { value: "ci_cd", label: "CI/CD" },
];


interface UserProps {
    user?: ExtendedUser,
}

export default function OnboardForm( {user} : UserProps) {
 
  const [selectedPronoun, setSelectedPronoun] = useState<ComboboxOptions>();

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
    }
  });

  const router = useRouter()
  const [success, setSuccess] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    setError(null);
    setSuccess(null);
    startTransition(() => {
      onboard(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          }
          if (data?.success) {
            setSuccess(data.success)
            form.reset()
          }
        })
    })
  }

  if(error === "Profile already exists"){
    router.push("/profile")
  }

  if (success) {
    router.push("/profile")
  }

  return (
    <Card className="max-w-md rounded-none h-full flex flex-col py-2 border-r-1" >
      <CardHeader>
        <CardTitle className="text-xl">
          Welcome to College Connection
        </CardTitle>
        <CardDescription>
          Login to college connections if you can because we don&apos;t have a login flow yet
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
                        <Popover>
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
                        <Popover>
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
                          <PopoverContent className="w-200px p-0" >
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
                      <FormLabel>How do you Identify Yourself / Your Pronouns</FormLabel>
                      <Combobox
                        disalbed={isPending}
                        options={pronouns}
                        placeholder="Select your pronoun"
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
              <FormSuccess className="my-4" message={success} />
              <FormError className="my-4" message={error} />
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















