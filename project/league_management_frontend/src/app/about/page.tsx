import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Invoices',
};

export default function AboutPage() {
    return (
        <div>
            <h1>About</h1>
            <p>This is the about page.</p>
        </div>
    );
}