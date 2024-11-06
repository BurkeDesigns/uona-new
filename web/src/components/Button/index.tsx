// import type { Props } from "@blockmapper";
import "./btn.css";
// import { Link, Text } from "@blocks";
import Link from "@components/Link";
import Text from "@components/Text";

import type { ReactNode } from "react";
import type { IconNames } from "@components/Icon";
import Icon from "@components/Icon";

type BtnProps = React.HTMLAttributes<HTMLElement> & {
	variant?:
		| "primary"
		| "primaryBlack"
		| "secondary"
		| "secondaryWhite"
		| "tertiary"
		| "tertiaryWhite";
	label?: string;
	url?: string;
	onClick?: any;
	customclass?: string;
	disabled?: any;
	children?: ReactNode;
	rightIcon?: IconNames;
	leftIcon?: IconNames;
};

const component = (props: BtnProps) => {
	const {
		variant,
		label,
		url,
		onClick,
		customclass,
		disabled,
		children,
		rightIcon,
		leftIcon,
	} = props;
	const style = variant || "primary";

	// let showNote = false;
	// if (variant?.startsWith("tertiary")) showNote = true;

	return (
		<>
			{url ? (
				<Link
					href={disabled ? undefined : url}
					className={`${style} ${customclass ? customclass : ""}`}
					onClick={disabled ? (e) => e.preventDefault() : onClick}
					aria-disabled={disabled}
					{...props}
				>
					<button className={style} {...props}>
						{leftIcon && <Icon name={leftIcon} />}
						<Text font="button">{label || children}</Text>
						{rightIcon && <Icon name={rightIcon} />}
					</button>
				</Link>
			) : (
				<button className={style} {...props}>
					{leftIcon && <Icon name={leftIcon} />}
					<Text font="button">{label || children}</Text>
					{rightIcon && <Icon name={rightIcon} />}
				</button>
			)}
		</>
	);
};

export default component;
