import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import RowColumn from "@/lib/components/layout/row_column";
import { DisplayMedium } from "@/lib/components/layout/typography";
import { Separator } from "@/lib/components/shadcn/separator";
import AddLeagueDisplay from "@/lib/components/ui/dialogs/league/add_league_form";
import LeagueList from "@/lib/components/ui/display/league_list";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";

/* 
A page that displays the leagues the user 
is a member of and allows them to add a new league.

@Author: IFD
@Date: 2025-04-01
*/
export default async function AccountLeaguesPage() {

    return (
        <Page
            header={<Header />}
            footer={<Footer />}
        >
            <Container
                padding="p-3 md:p-5 lg:p-20"
                className="h-auto"
            >
                <RowColumn
                    expanded={true}>
                    <Column
                        width="full"
                        expanded>
                        <DisplayMedium
                            text={"My Leagues"}
                        />
                        <Separator className="mt-4 mb-8 md:mt-8 w-full md:w-2/3" />
                        <LeagueList accountLeagues={true} alignList="start" cardWidth="full md:w-3/4 lg:w-4/5" />
                    </Column>
                    <Column
                        width="full"
                        expanded>
                        <DisplayMedium
                            text={"Add League"}
                        />
                        <Separator className="mt-4 md:mt-8 w-full md:w-2/3" />
                        <AddLeagueDisplay />
                    </Column>
                </RowColumn>
            </Container>
        </Page >
    );
}