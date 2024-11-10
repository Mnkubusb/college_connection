"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { OtpStyledInput } from "@/components/extentions/otp-input"
import { VerificationSchema } from "@/schemas";
import { verify } from "@/actions/verify";
import { useState, useTransition } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useRouter } from "next/navigation";


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
             setError(data?.error);
           }
           if (data?.success) {
             form.reset();
             setSuccess(data?.success);
           }
         })
     })
  };

  if(success) {
    router.push("/auth/login")
  }

  return (
    <div className="max-w-md h-full flex items-center justify-center outline outline-1 outline-muted p-6 bg-background">
      <div className="w-full space-y-2 flex flex-col gap-3">
        <div className="space-y-3">
          <h2 className="font-semibold text-xl">Verify Your Email</h2>
          <p className="text-xs text-muted-foreground">
            Enter the 5-digit code sent to your email address
          </p>
        </div>
        <Form {...form}>
          <form className="grid gap-4 justify-items-start" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormControl>
                  <>
                    <FormItem>
                      <OtpStyledInput
                        numInputs={6}
                        inputType="text"
                        disabled={isPending}
                        {...field}
                      />
                    </FormItem>
                    <FormMessage />
                  </>
                </FormControl>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" variant={"gooeyLeft"} className="w-full" disabled={isPending}>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};


export default VerifyForm