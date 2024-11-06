import "./styles.css";
import Link from "@components/Link";
import { PortableText } from "@blocks";
import Mobile from "./Mobile";
import { siteData } from "@data/layout";
import { mapLink } from "@util/mapping";
import SocialLink from "./SocialLinks";

const component = (props) => {
	const { children } = props;

	const data: any = siteData; //fix typecheck errors from changing data

	// map the nav links
	const mapFooterLinks = (links) => {
		if (!links) return;
		return links.map((link) => {
			let linkUrl = mapLink(link.url);

			return {
				href: linkUrl,
				title: link.title,
			};
		});
	};

	const footerLegalLinks = mapFooterLinks(
		data?.bottomFooterConfig?.bottomCol1
	);

	// this util will create and filter only the arrays
	const footerConfigArrays = Object.fromEntries(
		Object.entries(data?.footerConfig).filter(([key, value]) =>
			Array.isArray(value)
		)
	);

	// Or use a custom order:
	const customOrder = ["col1", "col2", "col3", "col4", "col5"];
	const sortedKeys = customOrder.filter((key) =>
		footerConfigArrays.hasOwnProperty(key)
	);

	//Footer logo
	const logoUrl =
		data?.footerConfig?.imageLink?.url || "/assets/logo/logo-header.svg";

	return (
		<>
			<footer className={`layout--base footer`}>
				<div className="footerTop">
					<div className="footerLogoAddressSocial">
						<a className={"logo-wrapper"} href="/">
							<svg
								id="kawasaki-commercial-logo-footer"
								className="logo-footer"
								xmlns="http://www.w3.org/2000/svg"
								width="205px"
								height="54px"
								version="1.1"
								viewBox="0 0 180 48"
							>
								<use xlinkHref="#commercial-with-lines" />
								<use xlinkHref="#kawasaki-name" />
							</svg>
						</a>
					</div>
					<SocialLink footerData={data?.footerConfig.socialIcons} />
				</div>
				<Mobile
					sortedArr={sortedKeys}
					footerConfigArrays={footerConfigArrays}
				/>
				<div className="footerContainer">
					{sortedKeys.map((colKey, colIndex) => {
						if (colKey === "col3") {
							return (
								<>
									<div className="footerRow" key={colIndex}>
										<ul className="footerPages">
											{footerConfigArrays["col3"].map(
												(item, index) => (
													<li
														key={index}
														className={
															index === 0
																? "title"
																: ""
														}
													>
														<Link
															style={{
																color:
																	index ===
																		0 &&
																	"white",
															}}
															href={item.href}
														>
															{item.title}
														</Link>
													</li>
												)
											)}
										</ul>
										<ul className="footerPages">
											{footerConfigArrays["col4"].map(
												(item, index) => (
													<li
														key={index}
														className={
															index === 0
																? "title"
																: ""
														}
													>
														<Link
															style={{
																color:
																	index ===
																		0 &&
																	"white",
															}}
															href={item.href}
														>
															{item.title}
														</Link>
													</li>
												)
											)}
										</ul>
									</div>
								</>
							);
						}

						if (colKey === "col4") {
							return null;
						}
						if (colKey === "col5") {
							return (
								<div className="footerRow" key={colIndex}>
									<ul className="footerPages">
										{footerConfigArrays["col5"].map(
											(item, index) => (
												<li key={index}>
													<Link href={item.href}>
														{item.title}
													</Link>
												</li>
											)
										)}
									</ul>
								</div>
							);
						}

						return (
							<ul className="footerPages" key={colIndex}>
								{footerConfigArrays[colKey].map(
									(item, index) => (
										<li
											key={index}
											className={
												index === 0 ? "title" : ""
											}
										>
											<Link
												style={{
													color:
														index === 0 && "white",
												}}
												href={item.href}
											>
												{item.title}
											</Link>
										</li>
									)
								)}
							</ul>
						);
					})}
				</div>
				<div className="footerLegal">
					<hr />
					{data?.bottomFooterConfig?.copyright && (
						<PortableText
							body={data?.bottomFooterConfig?.copyright}
						/>
					)}
					<div className="test">
						{footerLegalLinks && (
							<ul className="legalLinks">
								{footerLegalLinks.map((link, index) => (
									<li key={index}>
										<Link href={link.href}>
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</footer>
		</>
	);
};

export default component;
