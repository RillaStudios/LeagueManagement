import React from 'react';

interface AlignProps {
    align?: 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    children: React.ReactNode;
}

const Align: React.FC<AlignProps> = ({ align = 'middle-center', children }) => {
    const alignClasses = {
        'top-left': 'top-0 left-0',
        'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
        'top-right': 'top-0 right-0',
        'middle-left': 'top-1/2 left-0 transform -translate-y-1/2',
        'middle-center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        'middle-right': 'top-1/2 right-0 transform -translate-y-1/2',
        'bottom-left': 'bottom-0 left-0',
        'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2',
        'bottom-right': 'bottom-0 right-0',
    };

    return (
        <div className={`absolute ${alignClasses[align]}`}>
            {children}
        </div>
    );
};

export default Align;