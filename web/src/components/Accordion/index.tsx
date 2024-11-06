import type { Props } from "@blockmapper";
import Text from "@components/Text";
import "./styles.css";
import Icon from "@components/Icon";
import List from "@components/List";

import type { IconNames } from "@components/Icon";
import { useState, type ReactNode } from "react";
import type { Typography } from "@components/Text";

type AccordionProps = {
	label: string;
	children?: ReactNode;
	openIcon?: IconNames;
	closeIcon?: IconNames;
	iconPos?: "left" | "right";
	font?: Typography | null;
};

const component = (props: AccordionProps) => {
	const {
		children,
		label,
		font,
		openIcon = "chevron-down",
		iconPos = "right",
		closeIcon = "chevron-up",
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
		setIsOpen(event.currentTarget.open);
	};

	return (
		<details onToggle={handleToggle}>
			<summary>
				<List el="column xsm center">
					{iconPos == "left" && (
						<Icon name={isOpen ? closeIcon : openIcon} />
					)}
					<Text
						font={font || "sub2"}
						content={label}
						color="currentColor"
					/>
				</List>
				{iconPos == "right" && (
					<Icon name={isOpen ? closeIcon : openIcon} />
				)}
			</summary>
			<div>{children}</div>
		</details>
	);
};

export default component;
