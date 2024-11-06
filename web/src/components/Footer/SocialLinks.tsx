import "./styles.css";
import Icon from "@components/Icon";

const component = ({ footerData }) => {
	if (!footerData || footerData.length === 0) {
		return null;
	}

	return (
		<>
			<ul className="footerSocials">
				{footerData.map((link) => (
					<li className="socialLink">
						<a
							href={link.socialLinkURL}
							target="_blank"
							rel="noreferrer"
						>
							<Icon name={link.socialLinkType} />
						</a>
					</li>
				))}
			</ul>
		</>
	);
};

export default component;
