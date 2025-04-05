'use client';

import { deleteLeague } from "@/lib/service/league/league_service";
import { Button } from "../../shadcn/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const DelLeagueButton = ({ leagueId }: { leagueId: number }) => {
    const { accessToken } = useAuth();

    return (
        <Button className="mt-4" variant={'destructive'} onClick={() => {
            deleteLeague(leagueId, accessToken!).then((res) => {

                toast({
                    title: "League deleted",
                    description: "The league has been deleted successfully.",
                    duration: 2000,
                });

                window.location.reload();

            }).catch((err) => {

                toast({
                    title: "Error deleting league",
                    description: "There was an error deleting the league.",
                    variant: "destructive",
                    duration: 2000,
                });

            });

        }}>Delete League</Button>
    );
}

export default DelLeagueButton;