import type { ReactNode } from "react";
import BilateralImageAndTextBlock from "./bilateral";
// import StaggeredImageAndTextBlock from "./staggered";
// import FullWidthImageAndTextBlock from "./fillwidth";

export type Props = {
	variant?: "bilateral";
	src?: string;
	header?: string;
	body?: string;
	children?: ReactNode;
};

const component = (props: Props) => {
	const { variant } = props;
	// if (props._type == "imageWithCallout") variant = props.calloutStyleVariant;
	switch (variant) {
		// case "staggeredLayout":
		// 	return <StaggeredImageAndTextBlock {...props} />;
		// case "fullWidthImage":
		// 	return <FullWidthImageAndTextBlock {...props} />;
		default:
			return <BilateralImageAndTextBlock {...props} />;
	}
};

export default component;
