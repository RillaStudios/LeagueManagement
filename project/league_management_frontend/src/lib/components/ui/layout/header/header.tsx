import Container from "@/lib/components/layout/container";
import Row from "@/lib/components/layout/row";
import Image from "next/image";
import Link from "next/link";
import { DrawerProvider } from "../../../providers/ham_menu_provider";
import HeaderAuthButtons from "../../buttons/header_auth_buttons";

/* 
A header component for the app.

It contains the logo and the nav menu.
It also contains the auth buttons.
It is used in the layout component.

@Author: IFD
@Date: 2025-04-01
*/
const Header: React.FC = () => {
    return (
        <>
            <Row
                mainAxisAlign="between"
                crossAxisAlign="center"
                expanded={true}
            >
                <Container className="flex justify-start items-center">
                    <Link href={"/"} passHref className="flex items-center gap-4">
                        <Image src="/images/lmsLogo.png" width={50} height={50} alt="logo"
                            style={{
                                objectFit: "contain",
                            }}
                            priority
                        />
                        <h4 className="text-sm lg:text-lg">League Management System</h4>
                    </Link>
                </Container>
                {/*
                
                Outside scope for now 
                of this project, 
                but this is where the nav menu would go.
                
                <NavMenu /> 
                
                
                */}
                <Container className="flex justify-end gap-4">
                    <DrawerProvider>
                        <HeaderAuthButtons />
                    </DrawerProvider>
                </Container>
            </Row>
        </>
    );
};

export default Header;