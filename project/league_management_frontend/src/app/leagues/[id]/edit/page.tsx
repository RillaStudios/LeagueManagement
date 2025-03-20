import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import RowColumn from "@/lib/components/layout/row_column";
import { DisplayMedium, HeadlineMedium } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import LeagueActionRow from "@/lib/components/ui/display/league_displays/league_actions_row";
import LeagueManagerRow from "@/lib/components/ui/display/league_manager_role";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";
import { getLeague } from "@/lib/service/league_service";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

export default async function LeagueEditPage({ params }: { params: Promise<{ id: number }> }) {

    const { id } = await params;

    const league = await getLeague(id);

    if (!league) {
        return (
            <Page header={<Header />} footer={<Footer />}>
                <div className="h-[calc(100vh-8rem)]">
                    <Column
                        mainAxisAlign="center"
                        crossAxisAlign="center"
                        gap="4"
                        expanded
                    >
                        <HeadlineMedium text="League not found." />
                        <Link href="/" passHref><Button>Go Back</Button></Link>
                    </Column>
                </div>
            </Page>
        );
    }

    return (
        <Page header={<Header />} footer={<Footer />}>
            <Container height="h-full">
                <LeagueManagerRow league={league} />
                <RowColumn>
                    <h1>{league.name}</h1>
                </RowColumn>
                <div>League: {league.name}</div>
                <RowColumn mainRowAxisAlign="end" expanded>
                    <Column
                        width="full"
                        expanded
                    >
                        <DisplayMedium
                            text={"Edit League"}
                        />
                        <Separator className="mt-4 md:mt-8 w-full md:w-2/3" />

                    </Column>
                </RowColumn>
                <LeagueActionRow leagueId={id} />
            </Container>
        </Page>
    );
}
