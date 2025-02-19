"use client";
import React, { Suspense } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { RegisterSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "../../actions/register";
import { Button } from "@/components/ui/button";
import ShowSocial from "./social";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FaSpinner } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
export default function SignUpForm() {

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const router = useRouter();

  const [isPending, startTransition] = React.useTransition()

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log(values)
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error)
          }
          if (data?.success) {
            toast.success(data.success)
            router.push("/auth/verify")
          }
        })
    })
  }

  return (
    <Card className="max-w-md rounded-none flex flex-col justify-center h-full my-10 sm:my-0 sm:border-r-1 shadow-none" >
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
                <div className="flex flex-row space-y-0 space-x-5">
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <Input
                          {...field}
                          id="firstName"
                          disabled={isPending}
                          placeholder="Tyler"
                          type="text"
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <Input
                          {...field}
                          id="lastName"
                          disabled={isPending}
                          placeholder="Hill"
                          type="text"
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        {...field}
                        id="email"
                        disabled={isPending}
                        placeholder="3i5eI@example.com"
                        type="email"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Input
                        {...field}
                        id="password"
                        disabled={isPending}
                        placeholder="••••••••"
                        type="password"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        {...field}
                        id="confirmPassword"
                        disabled={isPending}
                        placeholder="••••••••"
                        type="password"
                      />
                    </FormItem>
                  )}
                />
              </div>
              <ShowSocial className=" mb-5" />
              <Button
                type="submit"
                variant={"gooeyLeft"}
                disabled={isPending}
                className="w-full"
              >
                {isPending? (
                  <FaSpinner  className="w-4 h-4 ml-2 animate-spin"/>
                ):(
                  <>
                    <span>Sign Up</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )
                }
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










