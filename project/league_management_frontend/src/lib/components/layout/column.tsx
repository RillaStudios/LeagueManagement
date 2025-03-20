import React from 'react';

interface ColumnProps {
    gap?: string;
    mainAxisAlign?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    crossAxisAlign?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    wrap?: boolean;
    expanded?: boolean;
    hideOverflow?: boolean;
    width?: string;
    children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({
    gap = 0,
    mainAxisAlign = 'start',
    crossAxisAlign = 'start',
    wrap = false,
    expanded = false,
    hideOverflow = false,
    width,
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
            className={`flex flex-col ${wrap ? 'flex-wrap' : 'flex-nowrap'} 
                  ${mainAxisClasses[mainAxisAlign]} 
                  ${crossAxisClasses[crossAxisAlign]} 
                  gap-${gap} 
                  ${width ? `w-${width}` : ''}
                  ${hideOverflow ? 'overflow-hidden' : ''}
                  ${expanded ? 'flex-grow h-full min-h-0' : ''}`}
        >
            {children}
        </div>
    );
};

export default Column;