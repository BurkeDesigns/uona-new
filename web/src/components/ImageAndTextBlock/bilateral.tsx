// import type { Props } from "@blockmapper";
import "./styles.css";
import * as layoutStyles from "@components/Layout/styles.css";
import Text from "@components/Text";
import { Button, List, PortableText } from "@blocks";
import type { ReactNode } from "react";
// import type {Props} from './index'

type Props = {
	variant: "bilateral";
	imgPos?: "left" | "right";
	src?: string;
	header?: string;
	body?: string;
	children?: ReactNode;
};

const component = (props: Props) => {
	const { header, body, children, src, imgPos = "right" } = props;

	// console.log("bilaterial text image", props);

	return (
		<div className={`bilateralTextImageBlock`}>
			{imgPos == "left" && <img src={src} />}
			<List el="md" className={`content`}>
				<Text as="h3" content={header} />
				{header && (
					<List el="column">
						<hr />
					</List>
				)}
				{children}
				{/* <PortableText body={body} /> */}
				{/* {ctaButtons &&
							ctaButtons.map((item) => {
								return (
									<Button url={item.buttonLink?.url}>
										{item.buttonText}
									</Button>
								);
							})} */}
			</List>
			{imgPos == "right" && <img src={src} />}
		</div>
	);
};

export default component;
