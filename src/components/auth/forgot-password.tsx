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
import { ForgotPasswordSchema} from "../../schemas";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { newpassword } from "@/actions/newpassword";
import toast from "react-hot-toast";


export function ForgotPassword() {


  function Search() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    return token
  }
  
  const router = useRouter()
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      newPassword: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(() => {
      newpassword(values, Search())
        .then((data) => {
          if (data?.error) {
            toast.error(data?.error)
          }

          if (data.success) {
            form.reset()
            toast.success(data?.success)
            router.push("/auth/login")
          }
        })
    })

  }

  return (
    <Card className="max-w-md rounded-none h-full flex flex-col justify-center sm:border-r-1">
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
