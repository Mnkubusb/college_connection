"use client"
export const dynamic = "force-dynamic"
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
  FormControl,
  FormLabel,
  FormItem
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema, LoginSchema } from "../../schemas";
import { Suspense, useEffect, useState, useTransition } from "react";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { newpassword } from "@/actions/newpassword";


export function ForgotPassword() {
  
  const searchParams = useSearchParams();
  const [token , setToken] = useState<string | null>(null);
  const router = useRouter()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setToken(searchParams.get("token"));
  }, [searchParams]);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      newPassword: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(() => {
      newpassword(values, token)
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

  if (success) {
    router.push("/auth/login")
  }


  return (
    <Card className="max-w-md rounded-none h-full flex flex-col justify-center border-r-1">
      <CardHeader>
        <CardTitle className="text-xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your Email below
        </CardDescription>
      </CardHeader>
      <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter New Password</FormLabel>
                    <Input
                      {...field}
                      placeholder=""
                      type="password"
                    />
                  </FormItem>
                )} />
                <FormField control={form.control} name="newPassword" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )} />
                {error && <FormError message={error} />}
                {success && <FormSuccess message={success} />}
                <Button type="submit" className="w-full h-10" variant="gooeyLeft">
                  Login
                </Button>
              </div>
            </form>
          </Form>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
        <div className="mt-4 text-center text-sm flex justify-center items-center">
          Don&apos;t have an account?{" "}
          <Button variant={"linkHover2"} className="w-14">
            <Link href="/profile/signup">
              Sign up
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
