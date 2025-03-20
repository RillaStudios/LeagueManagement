import Container from "@/lib/components/layout/container";
import Row from "@/lib/components/layout/row";
import NavMenu from "./menu/nav_menu";
import Image from "next/image";
import Link from "next/link";
import { DrawerProvider } from "../../../providers/ham_menu_provider";
import HeaderAuthButtons from "../../buttons/header_auth_buttons";

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
                <NavMenu />
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