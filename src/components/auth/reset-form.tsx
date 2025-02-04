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
import {
  Form,
  FormField,
  FormLabel,
  FormItem
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { ResetSchema } from "../../schemas";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";
import toast from "react-hot-toast";

export const ResetForm = () => {

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      reset(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data?.error)
          }

          if (data.success) {
            form.reset()
            toast.success(data?.success)
          }
        })
    })

  }

  return (
    <Card className="max-w-md rounded-none h-full flex flex-col justify-center sm:border-r-1">
      <CardHeader>
        <CardTitle className="text-xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below to reset your Password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    placeholder="m@example.com"
                    required
                    disabled={isPending}
                  />
                </FormItem>
              )} />
              <Button type="submit" className="w-full h-10" variant="gooeyLeft" disabled={isPending}>
                Send Reset Password Link
              </Button>
            </div>
          </form>
        </Form>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
        <div className="mt-4 text-center text-sm flex justify-center items-center">
          Do you know your Password?{" "}
          <Button variant={"linkHover2"} className="w-14">
            <Link href="/profile/login">
              Login
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
