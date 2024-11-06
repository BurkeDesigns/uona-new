import type { Props } from "@blockmapper";
import "./styles.css";

const component = (props: Props) => {
	const { children, customclass } = props;

	return (
		<div className={`container ${customclass}`} {...props}>
			{children}
		</div>
	);
};

export default component;
