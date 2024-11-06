import "./styles.css";
import { Fragment } from "react";

const component = ({ footerData }) => {
	const addressInLines = footerData.address
		? footerData.address.split("\n")
		: [];
	const phone = footerData.phoneNumber ? footerData.phoneNumber : "";
	const phoneForLink = footerData.phoneNumber
		? footerData.phoneNumber.replace(/-/g, "")
		: "";
	const email = footerData.email ? footerData.email : "";

	return (
		<>
			<p>
				{addressInLines &&
					addressInLines.map((line, index) => (
						<Fragment key={index}>
							{line}
							<br />
						</Fragment>
					))}
				{phone && (
					<>
						<a href={`tel:${phoneForLink}`}>{phone}</a>
						<br />
					</>
				)}
				{email && (
					<>
						<a href={`mailto:${email}`}>{email}</a>
						<br />
					</>
				)}
			</p>
		</>
	);
};

export default component;
