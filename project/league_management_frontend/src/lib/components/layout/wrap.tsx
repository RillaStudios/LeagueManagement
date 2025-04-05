import React from 'react';

interface WrapProps {
    gap?: string;
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    children: React.ReactNode;
}

/* 
A flexbox wrapper component that allows for flexible layout of child components.

@Author: IFD
@Date: 2025-02-20
*/
const Wrap: React.FC<WrapProps> = ({
    gap = '4',
    justifyContent = 'flex-start',
    alignItems = 'stretch',
    children,
}) => {
    return (
        <div
            className={`flex flex-wrap ${justifyContent && `justify-${justifyContent}`} ${alignItems && `items-${alignItems}`} gap-${gap}`}
        >
            {children}
        </div>
    );
};

export default Wrap;
