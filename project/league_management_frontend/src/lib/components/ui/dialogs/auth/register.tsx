"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/lib/components/shadcn/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/shadcn/form"
import { Input } from "@/lib/components/shadcn/input"
import { useState } from "react"
import { useAuth } from "@/lib/hooks/useAuth"
import useLoading from "@/lib/hooks/useLoading"

const formSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Must be a valid email address" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[0-9]/, { message: "Password must contain at least 1 number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least 1 special character" }),
    confirmPassword: z.string()
        .min(1, { message: "Password confirmation is required" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Does not match password",
    path: ["confirmPassword"],
})

const RegisterForm: React.FC = () => {
    // Server error state
    const [serverError, setServerError] = useState<string | null>(null);

    // Get the login function, form open state, and close form function
    const { signup } = useAuth();

    // Use the loading hook
    const { loading, setLoading } = useLoading();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {

            //Set loading to true
            setLoading(true);

            // Login the user
            await signup(values.email.trim().toLowerCase(), values.password);

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
                                <Input type="email" placeholder="Enter email" {...field} />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confrim Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter password again" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
                <div className="flex justify-center">
                    <Button type="submit">
                        {loading ? "Registering user..." : "Register"}
                    </Button>
                </div>
            </form>
        </Form>

    );
}

export default RegisterForm;