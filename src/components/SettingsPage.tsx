"use client"
import { Profile } from "@prisma/client";
import { ExtendedUser } from "../../next-auth";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import ProfilePic from "./ui/profilePic";
import { Card, CardContent } from "./ui/card";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, ChevronDown, Link, User } from "lucide-react";
import { UpdateProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z  from "zod";
import { useState, useTransition } from "react";
import { update } from "@/actions/update";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { MultiSelect } from "./ui/multi-select";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Combobox, ComboboxOptions } from "./ui/Combobox";
import toast, { Toaster } from "react-hot-toast"
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import FileUpload from "./image-upload";

const branches = [
    { label: "Information Technology", value: "Information Technology" },
    { label: "Computer Science Engineering", value: "Computer Science Engineering" },
    { label: "Electrical Engineering", value: "Electrical Engineering" },
    { label: "Mechanical Engineering", value: "Mechanical Engineering" },
    { label: "Civil Engineering", value: "Civil Engineering" },
    { label: "Mining Engineering", value: "Mining Engineering" },
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

const batches = [
    { label: "2019", value: "2019" },
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
] as const

const pronouns = [
    { label: "Still Figuring out", value: "Still Figuring out" },
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

interface UserProps {
    user?: ExtendedUser,
    profile?: Profile[]
}

const SettingsPage = ({ user, profile }: UserProps) => {

    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const userProfile = profile?.find((profile) => profile.userId === user?.id);


    function handleAppendGroup(label: ComboboxOptions['label']) {
        const newPronouns = {
            value: label,
            label,
        };
        pronouns.push(newPronouns);
    }

    const form = useForm<z.infer<typeof UpdateProfileSchema>>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            firstName: user?.name?.split(" ")[0] as string,
            lastName: user?.name?.split(" ")[1] as string,
            batch: userProfile?.batch as string,
            image: userProfile?.image as string,
            branch: userProfile?.branch as string,
            wannabe: userProfile?.wannabe as string,
            skills: userProfile?.skills as string[],
            story: userProfile?.bio as string,
            insta: userProfile?.insta as string,
            linkedin: userProfile?.linkedin as string,
            github: userProfile?.github as string,
            twitter: userProfile?.twitter as string,
        }
    })


    const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
        startTransition(() => {
            update(values)
                .then((data) => {
                    if (data?.error) {
                        toast.error(data?.error as string)
                    }

                    if (data.success) {
                        form.reset()
                        toast.success(data?.success as string)
                    }
                })
            router.refresh();
        })
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full overflow-auto h-full overflow-x-hidden scroll">
                <div>
                    <div className="flex justify-center items-center sm:h-[150px] h-[120px] sm:w-full relative">
                        <div className="dark:bg-gradient-to-r from-slate-900 to-slate-700 w-full h-full" >
                            <AnimatedGridPattern />
                        </div>
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:pt-10 px-7 sm:bottom-[7rem] bottom-14 relative gap-6">
                    <ProfilePic image={userProfile?.image as string} className="w-[120px] h-[120px]" />
                    <div className="flex flex-col sm:mt-4 gap-3 w-3/4">
                        <div className="flex flex-col sm:justify-center sm:mb-4 sm:mt-20 gap-1 sm:gap-0 w-full">
                            <div className="flex flex-col sm:flex-row justify-between w-full">
                                <div className="flex flex-col">
                                    <h3 className="text-3xl font-sans font-bold">
                                        {userProfile?.name}
                                    </h3>
                                    <div className="div">
                                        <h4 className="sm:text-md texts-sm font-sans font-light sm:flex text-wrap w-72">
                                            {user?.email}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrap relative bottom-14 p-5 flex flex-col gap-2 sm:-top-16">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex sm:flex-row flex-col gap-2">
                                <div className="font-josefin sm:w-[25%] px-2">
                                    <div className="font-bold ">
                                        Personal info
                                    </div>
                                    <div className="font-light ">
                                        Update your photo and personal details
                                    </div>
                                </div>
                                <Card className="sm:w-[75%] border rounded-lg shadow-[0px_43px_100px_20px_rgba(0,_0,_0,_0.7)]">
                                    <CardContent className="w-full p-0">
                                        <div className="grid gap-6">
                                            <div className="grid sm:gap-6 gap-4 sm:grid-cols-2 w-full px-6 pt-7" >
                                                <FormField control={form.control} name="firstName" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>First Name</FormLabel>
                                                        <Input
                                                            {...field}
                                                            placeholder="John"
                                                            required
                                                            defaultValue={userProfile?.name.split(" ")[0]}
                                                            disabled={isPending}
                                                            className="h-10"
                                                        />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="lastName" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Last Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Doe"
                                                                type="text"
                                                                defaultValue={userProfile?.name.split(" ")[2] ? userProfile?.name.split(" ")[1] + " " + userProfile?.name.split(" ")[2] : userProfile?.name.split(" ")[1]}
                                                                disabled={isPending}
                                                                className="h-10"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                            <FormField control={form.control} name="image" render={({ field }) => (
                                                <FormItem className="px-6">
                                                    <div className="flex sm:flex-row flex-col gap-6">
                                                        <Avatar className="w-32 h-32 border ">
                                                            <AvatarImage src={field.value ? field.value : userProfile?.image as string} />
                                                            <AvatarFallback>{userProfile?.name.slice(0, 2)}</AvatarFallback>
                                                        </Avatar>
                                                        <FormControl>
                                                            <FileUpload endpoint="profileImage" onChange={field.onChange} value={field.value} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )} />
                                            <div className="flex gap-4 flex-row-reverse border-t p-4">
                                                <Button type="submit" className="w-34 h-9" variant="secondary" >
                                                    Save Changes
                                                </Button>
                                                <Button className="w-34 h-9" variant="outline" onClick={() => form.reset()}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="h-[1px] w-full bg-gray-400 my-4 " />
                            <div className="flex sm:flex-row flex-col gap-2">
                                <div className="font-josefin sm:w-[25%] px-2">
                                    <div className="font-bold ">
                                        Profile
                                    </div>
                                    <div className="font-light ">
                                        Update your portfolio and profile
                                    </div>
                                </div>
                                <Card className="sm:w-[75%] border rounded-lg shadow-[0px_43px_100px_20px_rgba(0,_0,_0,_0.7)]">
                                    <CardContent className="w-full p-0">
                                        <div className="grid gap-6 ">
                                            <div className="grid pt-7 px-6 gap-6">
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <FormField control={form.control} name="branch" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Branch</FormLabel>
                                                            <Popover open={isOpen} onOpenChange={setIsOpen}>
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
                                                                                : userProfile?.branch as string}
                                                                            <ChevronDown size={24} className="opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-200px p-0" >
                                                                    <Command>
                                                                        <CommandInput placeholder="Select Your Branch" className="h-8" />
                                                                        <CommandList>
                                                                            <CommandEmpty>No Branch found.</CommandEmpty>
                                                                            <CommandGroup>
                                                                                {branches.map((branch) => (
                                                                                    <CommandItem
                                                                                        disabled={isPending}
                                                                                        value={branch.value}
                                                                                        key={branch.value}
                                                                                        onSelect={() => {
                                                                                            form.setValue("branch", branch.value)
                                                                                            setIsOpen(false);
                                                                                        }}>
                                                                                        {branch.label}
                                                                                        <Check className={cn("ml-auto", branch.value === field.value ? "opacity-100" : "opacity-0")} />
                                                                                    </CommandItem>
                                                                                ))}
                                                                            </CommandGroup>
                                                                        </CommandList>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </FormItem>
                                                    )} />
                                                    <FormField control={form.control} name="batch" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Batch</FormLabel>
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
                                                                                ? batches.find((batch) => batch.value === field.value)?.label
                                                                                : userProfile?.batch as string}
                                                                            <ChevronDown size={24} className="opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-200px p-0" >
                                                                    <Command>
                                                                        <CommandInput placeholder="Select Your Batch" className="h-8" />
                                                                        <CommandList>
                                                                            <CommandEmpty>No Batches found.</CommandEmpty>
                                                                            <CommandGroup>
                                                                                {batches.map((batch) => (
                                                                                    <CommandItem
                                                                                        disabled={isPending}
                                                                                        value={batch.value}
                                                                                        key={batch.value}
                                                                                        onSelect={() => {
                                                                                            form.setValue("batch", batch.value)
                                                                                            setOpen(false);
                                                                                        }}>
                                                                                        {batch.label}
                                                                                        <Check className={cn("ml-auto", batch.value === field.value ? "opacity-100" : "opacity-0")} />
                                                                                    </CommandItem>
                                                                                ))}
                                                                            </CommandGroup>
                                                                        </CommandList>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>
                                                <FormField control={form.control} name="wannabe" render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>Identify Yourself</FormLabel>
                                                            <Combobox
                                                                disalbed={isPending}
                                                                options={pronouns}
                                                                placeholder="Select your Pronoun"
                                                                selected={field.value}
                                                                onChange={(option) => field.onChange(option.value)}
                                                                onCreate={handleAppendGroup}
                                                                className="min-w-56 w-full"
                                                            />
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="skills" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Skills</FormLabel>
                                                        <MultiSelect
                                                            disabled={isPending}
                                                            placeholder={"Select your skills (Max 5)"}
                                                            options={skills}
                                                            onValueChange={field.onChange}
                                                            animation={2}
                                                            defaultValue={userProfile?.skills ?? []}
                                                            maxCount={3}
                                                        />
                                                    </FormItem>
                                                )} />
                                                <FormField
                                                    name="story"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Your Story</FormLabel>
                                                            <Textarea
                                                                className="h-32 scroll"
                                                                disabled={isPending}
                                                                placeholder="Tell us a bit about yourself"
                                                                {...field}
                                                            />
                                                        </FormItem>
                                                    )} />
                                            </div>
                                            <div className="flex gap-4 flex-row-reverse border-t p-4">
                                                <Button type="submit" className="w-34 h-9" variant="secondary" >
                                                    Save Changes
                                                </Button>
                                                <Button className="w-34 h-9" variant="outline" onClick={() => form.reset()}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="h-[1px] w-full bg-gray-400 my-4 " />
                            <div className="flex sm:flex-row flex-col gap-2">
                                <div className="font-josefin sm:w-[25%] px-2">
                                    <div className="font-bold ">
                                        Social Media
                                    </div>
                                    <div className="font-light ">
                                        Update your social media links
                                    </div>
                                </div>
                                <Card className="sm:w-[75%] border rounded-lg shadow-[0px_43px_100px_20px_rgba(0,_0,_0,_0.7)] mb-10">
                                    <CardContent className="w-full p-0">
                                        <div className="grid gap-6 ">
                                            <div className="grid pt-7 px-6 gap-6">
                                                <FormField control={form.control} name="insta" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-1"><InstagramLogoIcon /> Instagram</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={isPending}
                                                                placeholder="Enter your instagram username or link"
                                                                {...field}
                                                                defaultValue={userProfile?.insta as string}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="linkedin" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-1"><LinkedInLogoIcon />Linkedin</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={isPending}
                                                                placeholder="Enter your linkedin username or link"
                                                                {...field}
                                                                defaultValue={userProfile?.linkedin as string}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="twitter" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-1" ><TwitterLogoIcon />X(Twitter)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={isPending}
                                                                placeholder="Enter your twitter handle or link"
                                                                {...field}
                                                                defaultValue={userProfile?.twitter as string}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="github" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-1"><GitHubLogoIcon />Github</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={isPending}
                                                                placeholder="Enter your github username or link"
                                                                {...field}
                                                                defaultValue={userProfile?.github as string}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                            <div className="flex gap-4 flex-row-reverse border-t p-4">
                                                <Button type="submit" className="w-34 h-9" variant="secondary" >
                                                    Save Changes
                                                </Button>
                                                <Button className="w-34 h-9" variant="outline" onClick={() => form.reset()}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </form>
                    </Form>
                </div>
            </div >
        </div>
    );
}


export default SettingsPage;