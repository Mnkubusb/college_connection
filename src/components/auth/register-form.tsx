"use client";
import React from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { RegisterSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "../../actions/register";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import ShowSocial from "./social";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
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
  const router = useRouter()
  const [success, setSuccess] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values)
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
    router.push("/auth/verify")
  }

  return (
    <Card className="max-w-md rounded-none -z-10 h-full flex flex-col justify-center border-r-1" >
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
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










