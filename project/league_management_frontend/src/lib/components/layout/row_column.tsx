import Column from "./column";
import Row from "./row";

interface RowColumnProps {
    gap?: string;
    mainRowAxisAlign?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    crossRowAxisAlign?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    mainColAxisAlign?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    crossColAxisAlign?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    rowHeight?: string;
    wrap?: boolean;
    expanded?: boolean;
    hideOverflow?: boolean;
    children: React.ReactNode;
}

const RowColumn: React.FC<RowColumnProps> = ({ children, gap, mainRowAxisAlign, crossRowAxisAlign, mainColAxisAlign, crossColAxisAlign, wrap, expanded, rowHeight, hideOverflow, }) => {
    return (
        <div className={`flex flex-wrap ${expanded ? 'w-full' : 'w-auto'} ${rowHeight ? rowHeight : 'h-auto'}`}>
            {/* Row layout for large screens, Column layout for smaller screens */}
            <div className={`hidden md:flex ${expanded ? 'w-full' : 'w-auto'}`}>
                <Row
                    crossAxisAlign={crossRowAxisAlign}
                    mainAxisAlign={mainRowAxisAlign}
                    gap={gap}
                    wrap={wrap}
                    expanded={expanded}
                    hideOverflow={hideOverflow}
                >{children}</Row> {/* For screens md and above (desktop) */}
            </div>
            <div className={`flex md:hidden ${expanded ? 'w-full' : 'w-auto'}`}>
                <Column
                    crossAxisAlign={crossColAxisAlign}
                    mainAxisAlign={mainColAxisAlign}
                    gap={gap}
                    wrap={wrap}
                    expanded={expanded}
                    hideOverflow={hideOverflow}
                >{children}</Column> {/* For screens smaller than md (mobile/tablet) */}
            </div>
        </div>
    );
}

export default RowColumn;