'use client';

import { useUserData } from "@/lib/hooks/useUserData";
import { Input } from "../../shadcn/input";
import { z } from "zod";
import { useState, useEffect } from "react";
import useLoading from "@/lib/hooks/useLoading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/form";
import { Button } from "../../shadcn/button";
import { updateUserData } from "@/lib/service/user_service";
import { useAuth } from "@/lib/hooks/useAuth";

const formSchema = z.object({
    email: z.string(),
    firstName: z.string().min(1, {
        message: "First name is required.",
    }),
    lastName: z.string().min(1, {
        message: "Last name is required.",
    }),
});

/* 
A component that displays the account information of the user.

@Author: IFD
@Date: 2025-04-01
*/
const AccountDisplay: React.FC<{}> = () => {
    const { accessToken } = useAuth();
    const { user } = useUserData();
    const [serverError, setServerError] = useState<string | null>(null);
    const { loading, setLoading } = useLoading();

    // Create a form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                email: user.email?.toString() || "",
                firstName: user.firstName?.toString() || "",
                lastName: user.lastName?.toString() || "",
            });
        }
    }, [user, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Set loading to true
            setLoading(true);

            await updateUserData(accessToken!, values);

            form.reset({
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
            });

        } catch (error: any) {
            // Set the server error
            setServerError(error.message?.toString() || "An error occurred. Please try again.");
        } finally {
            // Set loading to false
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8 w-full">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input className="w-full md:w-1/2" placeholder="Enter email" disabled readOnly {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input className="w-full md:w-1/2" placeholder="Enter first name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input className="w-full md:w-1/2" placeholder="Enter last name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-left">{serverError}</p>}
                <div className="flex justify-start">
                    <Button type="submit" disabled={!form.formState.isDirty || loading}>
                        {loading ? "Updating info..." : "Change Info"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default AccountDisplay;