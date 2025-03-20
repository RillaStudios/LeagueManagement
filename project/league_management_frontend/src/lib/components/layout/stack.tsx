import React from 'react';

interface StackProps {
    gap?: string;
    mainAxisAlign?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    crossAxisAlign?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    children: React.ReactNode;
}

const Stack: React.FC<StackProps> = ({
    gap = '0',
    mainAxisAlign = 'start',
    crossAxisAlign = 'start',
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
        <div className={`relative w-full h-full ${mainAxisClasses[mainAxisAlign]} ${crossAxisClasses[crossAxisAlign]} gap-${gap}`}>
            {React.Children.map(children, (child, index) => (
                <div className="absolute inset-0" style={{ zIndex: index }}>
                    {child}
                </div>
            ))}
        </div>
    );
};

export default Stack;