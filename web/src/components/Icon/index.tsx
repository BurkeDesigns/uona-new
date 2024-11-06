import React, { useState, useEffect } from "react";
type SvgProps = React.SVGProps<SVGSVGElement>;
import "./styles.css";

export type IconNames =
	| "logo"
	| "home"
	| "settings"
	| "play-circle"
	| "upload"
	| "logout"
	| "image"
	| "file"
	| "chevron-left"
	| "chevron-right"
	| "chevron-up"
	| "chevron-down"
	| "close"
	| "fax"
	| "menu"
	| "minus"
	| "phone"
	| "plus"
	| "search"
	| "facebook"
	| "instagram"
	| "linkedin"
	| "twitter"
	| "vimeo"
	| "yelp"
	| "youtube";

interface InlineSVGProps {
	name: IconNames;
	size?: "sm" | "md" | number;
	disabled?: any;
	onClick?: any;
	className?: string;
}

const InlineSVG: React.FC<InlineSVGProps> = ({
	name,
	size,
	disabled,
	className,
	onClick,
}) => {
	const [svgContent, setSvgContent] = useState<unknown | null>(null);

	useEffect(() => {
		const loadSvg = async () => {
			try {
				const svg = await import(`./svg/${name}.svg?raw`);
				setSvgContent(svg.default);
			} catch (error) {
				console.error(`Error loading SVG ${name}:`, error);
				setSvgContent(null);
			}
		};

		loadSvg();
	}, [name]);

	// Create a style object for custom size
	const style =
		size && typeof size === "number" ? { "--size": `${size}px` } : {};

	let classValue = "icon";
	if (className) classValue += ` ${className}`;
	if (size != null && typeof size === "string") classValue += ` ${size}`;
	if (disabled) classValue += ` disabled`;

	return (
		<div
			className={classValue}
			style={style as React.CSSProperties}
			dangerouslySetInnerHTML={{ __html: svgContent || `${name}` }}
			onClick={onClick}
		/>
	);
};

export default InlineSVG;
