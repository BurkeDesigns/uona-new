import React, { useState, useEffect } from "react";
type SvgProps = React.SVGProps<SVGSVGElement>;
import "./styles.css";
// useful icons resource: https://ionic.io/ionicons

export type IconNames =
	| "logo"
	| "bug"
	| "badge"
	| "server"
	| "person"
	| "trending-up"
	| "folder"
	| "brandmark"
	| "home"
	| "settings"
	| "play-circle"
	| "play"
	| "upload"
	| "logout"
	| "image"
	| "file"
	| "archive-outline"
	| "archive"
	| "chevron-left"
	| "chevron-right"
	| "chevron-up"
	| "chevron-down"
	| "close"
	| "fax"
	| "filter"
	| "menu"
	| "minus"
	| "phone"
	| "plus"
	| "search"
	| "google"
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
	variant?: "white" | "white-hover" | "primary-hover";
	disabled?: any;
	onClick?: any;
	className?: string;
	customStyle?: React.CSSProperties;
}

const InlineSVG: React.FC<InlineSVGProps> = ({
	name,
	size,
	disabled,
	className,
	onClick,
	variant,
	customStyle
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
		size && typeof size === "number" ? { "--size": `${size}px`, ...customStyle } : {customStyle};

	let classValue = "icon";
	if (className) classValue += ` ${className}`;
	if (variant) classValue += ` ${variant}`;
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
