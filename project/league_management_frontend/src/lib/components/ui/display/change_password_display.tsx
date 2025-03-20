'use client';

import { Input } from "../../shadcn/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/form";
import useLoading from "@/lib/hooks/useLoading";
import { Button } from "../../shadcn/button";
import { useState } from "react";
import { changePassword } from "@/lib/service/user_service";
import { useAuth } from "@/lib/hooks/useAuth";

const formSchema = z.object({
    oldPassword: z.string()
        .min(1, { message: "Old password is required" }),
    newPassword: z.string()
        .min(8, { message: "New password must be at least 8 characters" })
        .regex(/[0-9]/, { message: "New password must contain at least 1 number" })
        .regex(/[^a-zA-Z0-9]/, { message: "New password must contain at least 1 special character" }),
    confirmNewPassword: z.string()
        .min(1, { message: "Password confirmation is required" })
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Does not match password",
    path: ["confirmPassword"],
});

const ChangePasswordDisplay: React.FC<{}> = () => {

    const { accessToken } = useAuth();

    const [serverError, setServerError] = useState<string | null>(null);

    const { loading, setLoading } = useLoading();

    // Create a form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            //Set loading to true
            setLoading(true);

            await changePassword(accessToken!, values.oldPassword, values.newPassword, values.confirmNewPassword);

            form.reset({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            });

        } catch (error: any) {

            // Set the server error
            setServerError(error.message?.toString() || "An error occurred. Please try again.");

        } finally {

            //Set loading to false
            setLoading(false);

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8 w-full">
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Old Password</FormLabel>
                            <FormControl>
                                <Input className="w-full md:w-1/2" type="password" placeholder="Enter old password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input className="w-full md:w-1/2" type="password" placeholder="Enter new password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input className="w-full md:w-1/2" type="password" placeholder="Enter new password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-left">{serverError}</p>}
                <div className="flex justify-start">
                    <Button type="submit" disabled={!form.formState.isDirty || loading}>
                        {loading ? "Changing password..." : "Change Password"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default ChangePasswordDisplay;