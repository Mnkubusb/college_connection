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
import { useTransition } from "react";
import { login } from "../../actions/login";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { LogIn } from "lucide-react";

export function LoginForm() {

  const router = useRouter();
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
            toast.error(data.error)
          }
          if (data.success) {
            form.reset()
            toast.success(data.success)
            router.push("/auth/onboarding")
          }
          if (data.error === "Email not verified Please verify your email") {
            redirect("/auth/verify")
          }
        })
    })

  }



  return (
    <Card className="max-w-md rounded-none h-full flex flex-col justify-center sm:border-r-1 px-auto m-0">
      <CardHeader>
        <CardTitle className="text-xl">Welcome to College Connections</CardTitle>
        <CardDescription>
          Enter your email below to login to your account, Please use Google or Github for login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input
                    {...field}
                    placeholder="m@example.com"
                    disabled={isPending}
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
              <Button type="submit" className="w-full h-10" variant="gooeyLeft">
                {isPending ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Login</span>
                    <LogIn className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
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
