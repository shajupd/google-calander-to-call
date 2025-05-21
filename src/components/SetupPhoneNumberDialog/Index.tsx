"use client";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { updateUserBuEmail } from "@/actions/actions.server";
import { useRouter } from "next/navigation";

const SetupPhoneNumberDialog = () => {
  const { data } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const formSchema = z.object({
    phoneNumber: z.string().regex(/^\+\d{10,15}$/, {
      message: 'Mobile number must start with "+" and contain 10 to 15 digits without spaces.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (!data?.user?.email) {
      return;
    }

    console.log({
      phoneNumber: values.phoneNumber,
      email: data?.user?.email,
    });

    try {
      await updateUserBuEmail(data?.user?.email, {
        phone: values.phoneNumber,
      });
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SettingsIcon />
          Configure mobile number
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setup phone number</DialogTitle>
          <DialogDescription>Add your phone number to receive notifications and updates.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="123-456-7890" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SetupPhoneNumberDialog;
