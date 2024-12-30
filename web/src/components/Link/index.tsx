import type { Props } from "@blockmapper";
import "./styles.css";

const component = (props: any) => {
	const { children, href, customclass, ...attrs } = props;

	return (
		<a
			href={href}
			className={`link ${customclass}`}
			target={`${href}`.startsWith("http") ? "_blank" : ""}
			{...attrs}
			{...props}
		>
			{children}
		</a>
	);
};

export default component;
