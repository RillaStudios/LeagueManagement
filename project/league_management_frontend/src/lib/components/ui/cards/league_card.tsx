import { League } from "@/lib/types/league/league";
import Container from "../../layout/container";
import { BodySmall, HeadlineMedium, HeadlineSmall, } from "../../layout/typography";
import RowColumn from "../../layout/row_column";
import Column from "../../layout/column";
import Image from "next/image";
import { Button } from "../../shadcn/button";
import { Separator } from "../../shadcn/separator";
import Row from "../../layout/row";
import { useUserData } from "@/lib/hooks/useUserData";
import Link from "next/link";
import LeagueButton from "../buttons/league_button";

interface LeagueCardProps {
    league: League;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {

    const { user } = useUserData();

    return (
        <Container
            className="p-4 bg-secondary/40"
            borderRadius="rounded-lg"
        >
            <RowColumn
                rowHeight="h-full"
                gap="4"
                expanded
            >
                <Column
                    mainAxisAlign="between"
                    width="full"
                    expanded
                >
                    <Container className="full md:w-auto">
                        <Image alt="League Logo" src={"/images/lmsLogo.png"} width={100} height={100} style={{ objectFit: "cover" }} />
                        <div className="my-4" />
                        <HeadlineMedium text={`${league.name}`} />
                        {league.location && league.location !== "" && <HeadlineMedium text={`${league.location}`} />}

                    </Container>
                    <Container>
                        <Separator className="my-4" />
                        <BodySmall text={`League ID: #${league.id}`} />
                    </Container>

                </Column>

                <Column gap="4" expanded width="full" mainAxisAlign="between">
                    <Container className="flex flex-col gap-4">
                        <HeadlineSmall text="League Info" />
                        <BodySmall text={`Conferences: ${league.conferences?.length.toString()}`} />
                        <BodySmall text={`Divisions: ${league.divisions?.length.toString()}`} />
                        <BodySmall text={`Game Type: ${league.gameType === null ? league.gameType : "N/A"}`} />
                    </Container>
                    <Row mainAxisAlign="end" gap="4" expanded>
                        <Link href={`/leagues/${league.id}`}><Button>
                            View League
                        </Button></Link>
                        {user && user.id === league.createdBy && <LeagueButton league={league} className="m-0" variant="outline" />}
                    </Row>
                </Column>
            </RowColumn>
        </Container >
    );
}

export default LeagueCard;