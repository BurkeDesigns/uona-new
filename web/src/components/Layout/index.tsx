import "./styles.css";
import type { ReactNode } from "react";

type Props = {
	el?: string;
	children?: ReactNode;
};

const component = (props: Props) => {
	const { children, el } = props;
	let val = "layout";
	if (el != null) val += `-${el}`;
	return <div el={val}>{children}</div>;
};

export default component;
