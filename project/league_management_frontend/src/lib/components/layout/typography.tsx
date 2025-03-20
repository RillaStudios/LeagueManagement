interface TextProps {
    text: string;
    align?: "left" | "center" | "right" | "justify";
    color?: string;
    weight?: "normal" | "medium" | "semibold" | "bold";
    italic?: boolean;
    className?: string;
}

const DisplayLarge: React.FC<TextProps> = ({ text, align = "left", color, weight = "normal", italic = false, className = "" }) => (
    <h1 className={`text-2xl md:text-3xl lg:text-4xl text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </h1>
);

const DisplayMedium: React.FC<TextProps> = ({ text, align = "left", color, weight = "normal", italic = false, className = "" }) => (
    <h2 className={`text-xl md:text-2xl lg:text-3xl text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </h2>
);

const DisplaySmall: React.FC<TextProps> = ({ text, align = "left", color, weight = "normal", italic = false, className = "" }) => (
    <h3 className={`text-lg md:text-xl lg:text-2xl text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </h3>
);

const HeadlineLarge: React.FC<TextProps> = ({ text, align = "left", color, weight = "normal", italic = false, className = "" }) => (
    <h4 className={`text-lg md:text-xl text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </h4>
);

const HeadlineMedium: React.FC<TextProps> = ({ text, align = "left", color, weight = "normal", italic = false, className = "" }) => (
    <h5 className={`text-base md:text-lg text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </h5>
);

const HeadlineSmall: React.FC<TextProps> = ({ text, align = "left", color, weight = "normal", italic = false, className = "" }) => (
    <h6 className={`text-sm md:text-base text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </h6>
);

const TitleLarge: React.FC<TextProps> = ({ text, align = "left", color, weight = "medium", italic = false, className = "" }) => (
    <p className={`text-base md:text-lg text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </p>
);

const TitleMedium: React.FC<TextProps> = ({ text, align = "left", color, weight = "medium", italic = false, className = "" }) => (
    <p className={`text-sm md:text-base text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </p>
);

const TitleSmall: React.FC<TextProps> = ({ text, align = "left", color, weight = "medium", italic = false, className = "" }) => (
    <p className={`text-xs md:text-sm text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </p>
);

const BodyLarge: React.FC<TextProps> = ({ text, align = "left", color, weight = "normal", italic = false, className = "" }) => (
    <p className={`text-base md:text-lg text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </p>
);

const BodyMedium: React.FC<TextProps> = ({ text, align = "left", color, weight = "normal", italic = false, className = "" }) => (
    <p className={`text-sm md:text-base text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </p>
);

const BodySmall: React.FC<TextProps> = ({ text, align = "left", color, weight = "normal", italic = false, className = "" }) => (
    <p className={`text-xs md:text-sm text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </p>
);

const LabelLarge: React.FC<TextProps> = ({ text, align = "left", color, weight = "semibold", italic = false, className = "" }) => (
    <span className={`text-sm md:text-base text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </span>
);

const LabelMedium: React.FC<TextProps> = ({ text, align = "left", color, weight = "semibold", italic = false, className = "" }) => (
    <span className={`text-xs md:text-sm text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </span>
);

const LabelSmall: React.FC<TextProps> = ({ text, align = "left", color, weight = "semibold", italic = false, className = "" }) => (
    <span className={`text-xs text-${align} ${color ? `text-${color}` : ""} font-${weight} ${italic ? "italic" : ""} ${className}`.trim()}>
        {text}
    </span>
);

export {
    DisplayLarge, DisplayMedium, DisplaySmall,
    HeadlineLarge, HeadlineMedium, HeadlineSmall,
    TitleLarge, TitleMedium, TitleSmall,
    BodyLarge, BodyMedium, BodySmall,
    LabelLarge, LabelMedium, LabelSmall,
};
