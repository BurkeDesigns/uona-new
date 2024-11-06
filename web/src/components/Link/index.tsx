import type { Props } from "@blockmapper";
import "./styles.css";

const component = (props: Props) => {
	const { children, href, customclass } = props;

	return (
		<a
			href={href}
			className={`link ${customclass}`}
			target={`${href}`.startsWith("http") ? "_blank" : ""}
			{...props}
		>
			{children}
		</a>
	);
};

export default component;
