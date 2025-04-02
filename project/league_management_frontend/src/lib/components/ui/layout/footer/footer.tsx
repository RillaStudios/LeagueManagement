import Row from "@/lib/components/layout/row";

/* 
A footer component for the app.

@Author: IFD
@Date: 2025-04-01
*/
const Footer: React.FC = () => {
    return (
        <footer className="p-4 bg-gray-800 text-white">
            <Row crossAxisAlign="center" mainAxisAlign="center" gap="4">
                <div>
                    <h1 className="text-2xl font-semibold text-center">League Management System</h1>
                    <p className="text-sm mt-2 text-center">© 2025 League Management System. All rights reserved.</p>
                    <p className="text-sm mt-2 text-center">Developed by IFD</p>
                </div>
            </Row>
        </footer>
    );
}

export default Footer;