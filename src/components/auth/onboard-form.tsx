"use client";
import React, { Suspense, useState } from "react";
import Link from "next/link";
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

const pronouns = [
  {label:"Still Figuring out", value: "SFT"},
  {label:"Singer", value: "Singer"},
  {label:"Dancer", value: "Dancer"},
  {label:"Sportsman", value: "Sportsman"},
  {label:"Artist", value: "Artist"},
  {label:"Designer", value: "Designer"},
  {label:"Full Stack Web Developer", value: "WEBD"},
  {label:"Full Stack App Developer", value: "APPD"},
  {label:"FrontEnd Developer", value: "FD"},
  {label:"BackEnd Developer", value: "BD"},
]
const branches = [
  {label: "Information Technology", value:"IT"},
  {label: "Computer Science Engineering", value:"CSE"},
  {label: "Electrical Engineering", value:"EEE"},
  {label: "Mechanical Engineering", value:"MECH"},
  {label: "Civil Engineering", value:"CIVIL"},
  {label: "Mining Engineering", value:"MINING"},
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




export default function OnboardForm() {

  const [selectedPronoun, setSelectedPronoun] = useState<ComboboxOptions>();

  function handleSelect(option: ComboboxOptions) {
    console.log('handleSelect');
    console.log(option);
    setSelectedPronoun(option);
  }

  function handleAppendGroup(label: ComboboxOptions['label']) {
    const newFlameWork = {
      value: label,
      label,
    };
    pronouns.push(newFlameWork);
    console.log('handleAppendGroup');
    console.log(newFlameWork);
    handleSelect(newFlameWork);
  }
  

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: user?.email || "",
      batch: "",
      department: "",
      wannabe: "",
      skills: [],
      story: "",
    }
  })
  const router = useRouter()
  const [success, setSuccess] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {

    values.wannabe = selectedPronoun?.value ?? '';

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

  if (success) {
    router.push("/profile")
  }

  return (
    <Card className="max-w-md rounded-none h-full flex flex-col py-14 border-r-1" >
      <CardHeader>
        <CardTitle className="text-xl">
          Welcome to College Connection
        </CardTitle>
        <CardDescription>
          Login to college connections if you can because we don&apos;t have a login flow yet
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Suspense fallback={<p>Loading...</p>}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                variant={"outline"}
                                role="combobox"
                                disabled={isPending}
                                className={cn(
                                  "w-full justify-between h-9",
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
                                  "w-200px justify-between h-9",
                                  !field.value && "text-muted-foreground"
                                )}> 
                                  {field.value
                                   ? batches.find((batch) => batch.value === field.value)?.label
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
                {/* <FormField
                  name="wannabe"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>  
                      <FormLabel> How do you Identify Yourself / Your Pronouns</FormLabel>
                      <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                role="combobox"
                                className={cn(
                                  "w-full justify-between h-9",
                                  !field.value && "text-muted-foreground"
                                )}>
                                  {field.value
                                   ? pronouns.find((pronoun) => pronoun.value === field.value)?.label
                                 :"Select Batch"}
                                 <ChevronDownIcon size={24} className="opacity-50" />
                                </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-200px p-0" >
                            <Command>
                              <CommandInput placeholder="Select Your Batch" className="h-8"/>
                              <CommandList>
                                <CommandEmpty >Select from list below</CommandEmpty>
                                <CommandGroup>
                                  {pronouns.map((pronoun)=>(
                                    <CommandItem
                                      value={pronoun.value}
                                      key={pronoun.value}
                                      onSelect={() => {
                                        form.setValue("wannabe", pronoun.value)
                                      }}>
                                      {pronoun.label}
                                      <Check className={cn("ml-auto", pronoun.value === field.value ?"opacity-100":"opacity-0" )} />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                    </FormItem>
                  )}
                /> */}
                <FormField
                  name="wannabe"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How do you Identify Yourself / Your Pronouns</FormLabel>
                      <Combobox
                        options={pronouns}
                        placeholder="Select your pronoun"
                        selected={selectedPronoun?.value ?? ''}
                        onChange={handleSelect}
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
                        placeholder="Select your skills"
                        options={skills}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        animation={2}
                        maxCount={3}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <FormSuccess className="my-4" message={success} />
              <FormError className="my-4" message={error} />
              <Button
                type="submit"
                variant={"gooeyLeft"}
                disabled={isPending}
                className="w-full"
              >
                Sign up &rarr;
              </Button>
            </form>
          </Form>
        </Suspense>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
        <div className=" mt-4 text-center text-sm flex justify-center items-center">
          Already have an account?{"  "}
          <Button variant={"linkHover2"} className="w-12">
            <Link href="/auth/login">
              Log In
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}











// className=" text-xl text-neutral-800 dark:text-white font-bold"

// className="max-w-md w-full rounded-none p-6 md:py-10 bg-white dark:bg-background h-full border-r-1 overflow-auto scroll dark:border-neutral-700"










