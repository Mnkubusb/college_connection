"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod"
import ShowSocial from "./social";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
  FormItem
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../schemas";
import { Suspense, useState, useTransition } from "react";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { login } from "../../actions/login";
import { useRouter } from "next/navigation";

export function LoginForm() {


  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values)
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

  if (error === "Email not verified Please verify your email") {
    router.push("/auth/verify")
  }

  if (success) {
    router.push("/profile")
  }

  
  return (
    <Card className="max-w-md rounded-none h-full flex flex-col justify-center border-r-1">
      <CardHeader>
        <CardTitle className="text-xl">Welcome to College Connections</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input
                      {...field}
                      placeholder="m@example.com"
                      required
                    />
                  </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="••••••••"
                        type="password"
                      />
                    </FormControl>
                    <FormControl>
                      <Button
                        variant="linkHover2"
                        size="sm"
                        className="px-0 font-medium"
                      >
                        <Link href="/auth/reset">Forgot Password?</Link>
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <ShowSocial />
                {error && <FormError message={error} />}
                {success && <FormSuccess message={success} />}
                <Button type="submit" className="w-full h-10" variant="gooeyLeft">
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </Suspense>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" ></div>
        <div className="mt-4 text-center text-sm flex justify-center items-center">
          Don&apos;t have an account?{" "}
          <Button variant={"linkHover2"} className="w-14">
            <Link href="/auth/signup">
              Sign up
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
