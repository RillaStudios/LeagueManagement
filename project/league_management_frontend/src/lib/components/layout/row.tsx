import React from 'react';

interface RowProps {
    gap?: string;
    mainAxisAlign?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    crossAxisAlign?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    wrap?: boolean;
    expanded?: boolean;
    hideOverflow?: boolean;
    children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({
    gap = '0',
    mainAxisAlign = 'start',
    crossAxisAlign = 'start',
    wrap = false,
    expanded = false,
    hideOverflow = false,
    children,
}) => {

    const mainAxisClasses = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
    };

    const crossAxisClasses = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
    };

    return (
        <div
            className={`flex ${wrap ? 'flex-wrap' : 'flex-nowrap'} 
                  ${mainAxisClasses[mainAxisAlign]} 
                  ${crossAxisClasses[crossAxisAlign]} 
                  gap-${gap} 
                  ${hideOverflow ? 'overflow-hidden' : ''}
                  ${expanded ? 'w-full' : 'w-auto'}`}
        >
            {children}
        </div>
    );
};

export default Row;