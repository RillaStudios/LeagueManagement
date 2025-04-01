"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/lib/components/shadcn/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/shadcn/form";
import { Input } from "@/lib/components/shadcn/input";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import useLoading from "@/lib/hooks/useLoading";

const formSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required.",
    }).email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(1, {
        message: "Password is required.",
    }),
});

/* 
A React component that renders a login form.

@Author: IFD
@Date: 2025-04-01
*/
const LoginForm: React.FC = () => {

    // Server error state
    const [serverError, setServerError] = useState<string | null>(null);

    // Get the login function, form open state, and close form function
    const { login } = useAuth();

    // Use the loading hook
    const { loading, setLoading } = useLoading();

    // Create a form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    /* 
    A function that is called when the form is submitted.

    @param values - The form values

    @returns {Promise<void>}

    @Author IFD
    @Since 2025-02-38
    */
    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            //Set loading to true
            setLoading(true);

            // Login the user
            await login(values.email.trim().toLowerCase(), values.password);

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
                <div className="flex justify-center">
                    <Button type="submit">
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
