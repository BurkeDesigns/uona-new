import type { ReactNode, CSSProperties } from "react";
import type { Colors } from "@theme/default";

export type Typography =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "sub1"
	| "sub2"
	| "sub3"
	| "sub4"
	| "eyebrow"
	| "button"
	| "bodyLBold"
	| "bodyL"
	| "bodyMBold"
	| "bodyM"
	| "bodySBold"
	| "bodyS"
	| "bodyXSBold"
	| "bodyXS";

type DynamicTagProps = React.HTMLAttributes<HTMLElement> & {
	as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	font?: Typography | null;
	content?: string | null | undefined;
	children?: ReactNode;
	style?: CSSProperties;
	color?: Colors;
};

const DynamicTag = ({
	as, // Default to 'p' if no 'as' prop is provided
	children,
	font,
	content,
	color,
	style,
	...props
}: DynamicTagProps) => {
	let fontClass;
	let Tag = (as || "p") as keyof JSX.IntrinsicElements;
	switch (Tag) {
		case "p":
			fontClass = "bodyM";
			break;
		default:
			fontClass = Tag.toLowerCase();
	}
	if (font != null) fontClass = font;
	let colorValue: any = color;
	// if(colorValue?.startsWith('--')) colorValue = `var(--${color})`;
	switch (color) {
		case "uona-blue":
		case "kc-red":
		case "kc-white":
		case "kc-black":
		case "kc-gray":
		case "gray-1":
		case "gray-2":
		case "gray-3":
			colorValue = `var(--${color})`;
			break;
	}

	// Combine the color style with other styles
	const combinedStyle: CSSProperties = {
		...style,
		color: colorValue || style?.color, // Apply color if it's defined, otherwise use existing color style
	};

	// Render the component using the Tag determined by the `as` prop
	return (
		<>
			{children && (
				<Tag className={fontClass} style={combinedStyle} {...props}>
					{children}
				</Tag>
			)}
			{content && !children && (
				<Tag className={fontClass} style={combinedStyle} {...props}>
					{content}
				</Tag>
			)}
		</>
	);
};

export const H1 = ({ ...props }) => <DynamicTag as="h1" {...props} />;
export const H2 = ({ ...props }) => <DynamicTag as="h2" {...props} />;
export const H3 = ({ ...props }) => <DynamicTag as="h3" {...props} />;
export const H4 = ({ ...props }) => <DynamicTag as="h4" {...props} />;
export const H5 = ({ ...props }) => <DynamicTag as="h5" {...props} />;
export const H6 = ({ ...props }) => <DynamicTag as="h6" {...props} />;
export const P = ({ ...props }) => <DynamicTag as="p" {...props} />;

export default DynamicTag;
