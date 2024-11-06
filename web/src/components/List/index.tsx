import React, { forwardRef } from "react";
import "./styles.css";
import type { ReactNode } from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
	el?: string;
	children?: ReactNode;
};

const List = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const { children, el, ...attrs } = props;
	let val = "list";
	if (el != null) {
		if (el?.startsWith("c")) {
			val += `-${el}`;
		} else {
			val += ` ${el}`;
		}
	}

	return (
		<div el={val} {...attrs} ref={ref}>
			{children}
		</div>
	);
});

export default List;
