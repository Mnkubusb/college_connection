"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { VerificationSchema } from "@/schemas";
import { verify } from "@/actions/verify";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
import toast from "react-hot-toast";


const VerifyForm = () => {

  const router = useRouter()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof VerificationSchema>>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof VerificationSchema>) => {
    startTransition(() => {
      verify(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data?.error)
          }
          if (data?.success) {
            form.reset();
            router.push("/auth/login")
            toast.success(data?.success);
          }
        })
    })
  };

  return (
    <div className="max-w-md h-full flex items-center justify-center outline outline-1 outline-muted p-6 bg-background">
      <div className="w-full flex flex-col gap-3">
        <div className="space-y-2">
          <h2 className="font-semibold text-xl">Verify Your Email</h2>
          <p className="text-xs text-muted-foreground">
            Enter the 5-digit code sent to your email address
          </p>
        </div>
        <Form {...form}>
          <form className="grid gap-6 justify-items-start" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormControl>
                  <>
                    <FormItem>
                      <InputOTP 
                         maxLength={6} 
                         disabled={isPending} 
                         {...field}
                        >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormItem>
                    <FormMessage />
                  </>
                </FormControl>
              )}
            />
            <Button type="submit" variant={"gooeyLeft"} className="w-full" disabled={isPending}>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};


export default VerifyForm