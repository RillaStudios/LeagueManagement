'use client'

import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPortal, DrawerTitle } from "@/lib/components/shadcn/drawer";
import { Button } from "@/lib/components/shadcn/button";
import { X } from "lucide-react";
import Row from "@/lib/components/layout/row";
import { Separator } from "@/lib/components/shadcn/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/lib/components/shadcn/accordion";
import { useDrawer } from "../../../providers/ham_menu_provider";
import { useAuth } from "@/lib/hooks/useAuth";

/* 
A drawer component for displaying the menu in mobile view.

@Author: IFD
@Date: 2025-04-01
*/
const MenuDrawer: React.FC = () => {
    const { drawerOpen, closeDrawer } = useDrawer();
    const { openAuthForm, isAuthenticated, logout } = useAuth();

    return (
        <Drawer open={drawerOpen} onClose={closeDrawer}>
            <DrawerPortal>
                <DrawerContent className="w-72 border-r-0 bg-popover" aria-describedby={undefined}>
                    <DrawerHeader className="flex justify-between">
                        <Row
                            mainAxisAlign="between"
                            expanded={true}
                            crossAxisAlign="center"
                        >
                            <DrawerTitle>Menu</DrawerTitle>
                            <Button onClick={closeDrawer} variant="ghost" className="flex items-center justify-center lg:hidden [&_svg]:size-4" size={'icon'}>
                                <X />
                            </Button>
                        </Row>
                    </DrawerHeader>
                    <div className="px-4">
                        <Separator />
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="hover:no-underline">Leagues</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="hover:no-underline">Features</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="hover:no-underline">News & Media</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <DrawerFooter>
                        {
                            !isAuthenticated ? <>
                                <Button onClick={() => {
                                    closeDrawer();
                                    openAuthForm("login");
                                }}>
                                    Login
                                </Button><Button variant="secondary" onClick={() => {
                                    closeDrawer();
                                    openAuthForm("register");
                                }}>
                                    Register
                                </Button></> : <Button onClick={logout}>Logout</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    );
}

export default MenuDrawer;