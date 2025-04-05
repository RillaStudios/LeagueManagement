import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import RowColumn from "@/lib/components/layout/row_column";
import { DisplayMedium } from "@/lib/components/layout/typography";
import { Separator } from "@/lib/components/shadcn/separator";
import TeamCardList from "@/lib/components/ui/cards/team/team_card_list";
import AccountPlayerListDisplay from "@/lib/components/ui/display/account_player_list_display";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";

/* 
A page that displays the teams the user 
is a member of and the players in those teams.

@Author: IFD
@Date: 2025-04-01
*/
export default async function AccountTeamsPage() {

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
                    expanded={true} gap="8">
                    <Column
                        width="full"
                        expanded>
                        <DisplayMedium
                            text={"My Teams"}
                        />
                        <Separator className="mt-4 mb-8 md:mt-8 w-full" />
                        <TeamCardList useOwner={true} />
                    </Column>
                    <Column
                        width="full"
                        expanded>
                        <DisplayMedium
                            text={"My Players"}
                        />
                        <Separator className="mt-4 mb-8 md:mt-8 w-full" />
                        <AccountPlayerListDisplay />
                    </Column>
                </RowColumn>
            </Container>
        </Page >
    );
}