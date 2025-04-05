import Page from "@/lib/components/layout/page";
import { DisplayLarge } from "@/lib/components/layout/typography";
import TeamList from "@/lib/components/ui/display/team_list";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";

/* 
A function to render the teams page

@Author: IFD
@Date: 2025-04-01
*/
export default function TeamsPage() {
    return (
        <Page
            header={<Header />}
            footer={<Footer />}
        >
            <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 my-8">
                <DisplayLarge text="All Teams" />
                <TeamList accountTeams={false} />
            </div>
        </Page>
    );
}