// import type { Props } from "@blockmapper";
import Text from "@components/Text";
import "./styles.css";
import Icon from "@components/Icon";

import type { IconNames } from "@components/Icon";
import { useState, type ReactNode } from "react";
import type { Typography } from "@components/Text";
import type { Colors } from "@theme/default";
import Link from "@components/Link";

type Props = {
	url?: string;
	body: string;
	children?: ReactNode;
	icon?: IconNames;
	iconPos?: "left" | "right";
	color?: Colors;
	font?: Typography
};

const component = (props: Props) => {
	const { body, children, icon, iconPos = "left", url, color, font = "bodyMBold" } = props;

	return (
		<>
			<Link href={url} customclass="fullWidth">
				<div
					className="announcementBar"
					style={{ background: color ? `var(--${color})` : "black" }}
				>
					{icon && iconPos == "left" && <Icon name={icon} />}
					<Text content={body} font={font} color="currentColor" />
					{icon && iconPos == "right" && <Icon name={icon} />}
				</div>
			</Link>
		</>
	);
};

export default component;
