import { Button } from "@/lib/components/shadcn/button";
import { Menu } from "lucide-react";

interface HamMenuButtonProps {
    onClick: () => void;
}

const HamMenuButton: React.FC<HamMenuButtonProps> = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            className="flex items-center justify-center lg:hidden [&_svg]:size-8"
            variant={'ghost'}
            size={'icon'}
        >
            <Menu className="rotate-0 scale-100 transition-all" />
        </Button>
    );
}

export default HamMenuButton;