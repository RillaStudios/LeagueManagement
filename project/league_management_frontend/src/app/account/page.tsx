import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import RowColumn from "@/lib/components/layout/row_column";
import { DisplayMedium } from "@/lib/components/layout/typography";
import { Separator } from "@/lib/components/shadcn/separator";
import AccountDisplay from "@/lib/components/ui/display/account_display";
import ChangePasswordDisplay from "@/lib/components/ui/display/change_password_display";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";

/* 
A page that displays the account information 
of the user and allows them to change their password.

@Author: IFD
@Date: 2025-04-01
*/
export default async function AccountPage() {

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
                            text={"My Account"}
                        />
                        <Separator className="mt-4 md:mt-8 w-full md:w-2/3" />
                        <AccountDisplay />
                    </Column>
                    <div className="block md:hidden h-8"></div>
                    <Column
                        width="full"
                        expanded>
                        <DisplayMedium
                            text={"Change Password"}
                        />
                        <Separator className="mt-4 md:mt-8 w-full md:w-2/3" />
                        <ChangePasswordDisplay />
                    </Column>
                </RowColumn>
            </Container>
        </Page >
    );
}