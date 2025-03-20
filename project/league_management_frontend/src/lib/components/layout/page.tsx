import React from 'react';

interface PageProps {
    header: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({
    header,
    footer,
    children,
}) => {
    return (
        <div className="min-h-screen min-w-full bg-background">
            {/* Header */}
            <header className='flex justify-center bg-background shadow-md w-full px-3 md:px-5 lg:px-20 py-3'>
                {header}
            </header>

            {/* Main content area (Column will expand here) */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer>
                {footer}
            </footer>
        </div>
    );
};

export default Page;
