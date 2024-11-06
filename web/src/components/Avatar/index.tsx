import type { IconNames } from "@components/Icon";
import "./styles.css";
import Link from "@components/Link";
import Text from "@components/Text";
import Icon from "@components/Icon";

type Props = {
	url?: string;
	src?: string;
	shape?: "circle" | "square";
	size?: string | number;
	radius?: string | number;
	name?: string;
	tooltipIcon?: IconNames;
};

const component = (props: Props) => {
	const { url, src, shape, size, radius, name, tooltipIcon } = props;

	return (
		<div className="avatarContainer">
			<Link href={url}>
				<div
					className={`avatar ${shape}`}
					style={{
						width: typeof size === "number" ? `${size}px` : size,
						height: typeof size === "number" ? `${size}px` : size,
						borderRadius:
							typeof radius === "number" ? `${radius}px` : radius,
					}}
				>
					{src && <img src={src} alt={"avatar"} loading="lazy" />}
					{!src && (
						<img
							src="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
							loading="lazy"
						/>
					)}
				</div>
			</Link>
			{name && (
				<div className="tooltip">
					{tooltipIcon && <Icon name={tooltipIcon} size={15} />}
					<Text font="bodyXS" content={name} />
				</div>
			)}
		</div>
	);
};

export default component;
