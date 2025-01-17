"use client"
import { Profile } from "@prisma/client";
import { ExtendedUser } from "../../next-auth";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import ProfilePic from "./ui/profilePic";
import { Card, CardContent } from "./ui/card";
import { Form, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, ChevronDown, Link } from "lucide-react";
import { UpdateProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { update } from "@/actions/update";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

const branches = [
    {label: "Information Technology", value:"Information Technology"},
    {label: "Computer Science Engineering", value:"Computer Science Engineering"},
    {label: "Electrical Engineering", value:"Electrical Engineering"},
    {label: "Mechanical Engineering", value:"Mechanical Engineering"},
    {label: "Civil Engineering", value:"Civil Engineering"},
    {label: "Mining Engineering", value:"Mining Engineering"},
  ] as const 
  


interface UserProps {
    user?: ExtendedUser,
    profile?: Profile[]
}

const SettingsPage = ({ user, profile }: UserProps) => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const userProfile = profile?.find((profile) => profile.userId === user?.id);

    const form = useForm<z.infer<typeof UpdateProfileSchema>>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            firstName: user?.name?.split(" ")[0] as string,
            lastName: user?.name?.split(" ")[1] as string,
            email: user?.email as string,
            batch: userProfile?.batch as string,
            branch: userProfile?.branch as string,
            wannabe: userProfile?.wannabe as string,
            skills: userProfile?.skills as string[],
            story: userProfile?.bio as string,
        }
    })

    const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            update(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data?.error)
                    }

                    if (data.success) {
                        form.reset()
                        setSuccess(data?.success)
                    }
                })
        })
    }


    return (
        <div className="md:flex h-full min-h-[84vh] sm:mx-3 border flex-col lg:col-span-2 bg-background absolute sm:relative sm:w-full w-[100%]">
            <div className="w-full sm:overflow-hidden overflow-auto h-full overflow-x-hidden">
                <div className="div">
                    <div className="flex justify-center items-center sm:h-[150px] h-[120px] sm:w-full relative">
                        <div className="bg-gradient-to-r from-slate-900 to-slate-700 w-full h-full" >
                            <AnimatedGridPattern />
                        </div>
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:pt-10 px-7 sm:bottom-[7rem] bottom-14 relative gap-6">
                    <ProfilePic image={user?.image as string} className="w-[120px] h-[120px]" />
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
                <div className="wrap relative bottom-14 p-5 flex flex-col sm:flex-row gap-2 items-center justify-center sm:-top-16">
                    <>
                        <div className="font-josefin w-[25%] px-2">
                            <div className="font-bold ">
                                Personal info
                            </div>
                            <div className="font-light ">
                                Update your photo and personal details
                            </div>
                        </div>
                        <Card className="w-[75%] border">
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="grid gap-6">
                                            <FormField control={form.control} name="firstName" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <Input
                                                        {...field}
                                                        placeholder="John"
                                                        required
                                                        value={userProfile?.name.split(" ")[0]}
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
                                                            value={userProfile?.name.split(" ")[1]}

                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="email" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="email">Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="m@example.com"
                                                            type="email"
                                                            value={user?.email as string}
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <div>
                                                <Button type="submit" className="w-full h-10" variant="gooeyLeft">
                                                    Save Changes
                                                </Button>
                                                <Button className="w-full h-10" variant="gooeyLeft">
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </>
                    <>
                        <div className="font-josefin w-[25%] px-2">
                            <div className="font-bold ">
                                Personal info
                            </div>
                            <div className="font-light ">
                                Update your photo and personal details
                            </div>
                        </div>
                        <Card className="w-[75%] border">
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="grid gap-6">
                                            <FormField control={form.control} name="firstName" render={({ field }) => (
                                                <FormItem>
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
                                                                        : "Select Branch"}
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
                                            <FormField control={form.control} name="lastName" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Doe"
                                                            type="text"
                                                            value={userProfile?.name.split(" ")[1]}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="email" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="email">Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="m@example.com"
                                                            type="email"
                                                            value={user?.email as string}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <div>
                                                <Button type="submit" className="w-full h-10" variant="gooeyLeft">
                                                    Save Changes
                                                </Button>
                                                <Button className="w-full h-10" variant="gooeyLeft">
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </>
                </div>
            </div>
        </div>
    );
}


export default SettingsPage;