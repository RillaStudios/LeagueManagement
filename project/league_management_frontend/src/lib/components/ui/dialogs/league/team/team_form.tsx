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
import { useEffect, useState } from "react";
import useLoading from "@/lib/hooks/useLoading";
import { Division } from "@/lib/types/league/division";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/components/shadcn/select";
import { getDivisions } from "@/lib/service/league/division_service";
import { createTeam, getTeam, updateTeam } from "@/lib/service/league/team_service";
import { Team } from "@/lib/types/league/team";
import { User } from "@/lib/types/user";
import { getAllUsers } from "@/lib/service/user_service";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/hooks/useAuth";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Team name is required.",
    }),
    location: z.string().min(1, {
        message: "Location is required.",
    }),
    selectedDivision: z.string(),
    selectedOwner: z.string(),
});

interface TeamFormProps {
    leagueId: number;
    teamId?: number;
    isEdit?: boolean;
    onSave?: (updatedTeam: Team) => void;
}

/* 
A form component for adding or editing a team in a league.

@Author: IFD
@Date: 2025-04-01
*/
const TeamForm: React.FC<TeamFormProps> = ({ leagueId, isEdit, teamId, onSave }) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [divisions, setDivisions] = useState<Division[] | null>(null);
    const [users, setUsers] = useState<User[] | null>(null);
    const { loading, setLoading } = useLoading();
    const { accessToken } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            location: "",
            selectedDivision: "",
            selectedOwner: "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const divisions = await getDivisions(leagueId);
                setDivisions(divisions);

                const users = await getAllUsers();
                setUsers(users);

                if (isEdit && teamId) {

                    const newTeam = await getTeam(leagueId, teamId);

                    form.setValue('name', newTeam?.teamName || '');
                    form.setValue('location', newTeam?.location || '');
                    form.setValue('selectedDivision', newTeam?.divisionId?.toString() || '');
                    form.setValue('selectedOwner', newTeam?.ownerId?.toString() || '');

                }


            } catch (error) {
                setServerError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isEdit, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const newTeam: Partial<Team> = {
                teamName: values.name,
                location: values.location,
                divisionId: parseInt(values.selectedDivision),
                ownerId: parseInt(values.selectedOwner),
            };

            let updatedTeam: Team | null;

            if (isEdit && teamId) {
                // Update the team if editing
                updatedTeam = await updateTeam(leagueId, teamId, newTeam, accessToken!);

            } else {
                // Create a new team if not editing
                updatedTeam = await createTeam(leagueId, newTeam, accessToken!);
            }

            if (!updatedTeam) {
                throw new Error("Failed to save team.");
            }

            if (onSave) {
                onSave(updatedTeam);
            }

            toast({
                variant: "default",
                title: "Success",
                description: `Team ${isEdit ? "updated" : "added"} successfully.`,
            });
        } catch (error: any) {
            setServerError(error.message || "An error occurred. Please try again.");

            toast({
                variant: "destructive",
                title: "Error",
                description: `Team could not be ${isEdit ? "updated" : "added"}!`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Team Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter team name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Team Location</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter team location" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="selectedDivision"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assign Division</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Assign team to division" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {divisions?.map((division) => (
                                            <SelectItem key={division.id} value={division.id.toString()}>
                                                {division.divisionName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="selectedOwner"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assign Owner</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Assign owner to team" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users?.map((user) => (
                                            <SelectItem key={user.id} value={user.id.toString()}>
                                                {user.firstName + " " + user.lastName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
                <div className="flex justify-center">
                    <Button type="submit">
                        {loading ? "Saving..." : isEdit ? "Edit Team" : "Add Team"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default TeamForm;