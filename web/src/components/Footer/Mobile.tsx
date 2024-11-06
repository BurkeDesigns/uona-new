import { Fragment, useState } from "react";
import "./styles.css";
import Link from "@components/Link";
import Accordion from "@components/Accordion";

const component = ({ sortedArr, footerConfigArrays }) => {
	// Initialize an array of false values based on the number of items in sortedArr
	const [modals, setModals] = useState(Array(sortedArr.length).fill(false));

	const handleClick = (index) => {
		// Create a new array with the clicked index toggled
		const updatedModals = modals.map((modal, i) =>
			i === index ? !modal : modal
		);
		setModals(updatedModals);
	};

	return (
		<div className="mobileVersion">
			{sortedArr.map((colKey, colIndex) => (
				<Fragment key={colIndex}>
					{colIndex === sortedArr.length - 1 ? (
						// If it's the last item, show everything
						<div className="ulContainer">
							{footerConfigArrays[colKey].map((item, index) => (
								<ul className="footerPages" key={index}>
									<li>
										<Link href={item.href}>
											{item.title}
										</Link>
									</li>
								</ul>
							))}
						</div>
					) : (
						// Otherwise, show only the first item
						<div>
							{footerConfigArrays[colKey]
								.slice(0, 1)
								.map((item, index) => (
									<Accordion
										label={item.title}
										font="sub3"
										rightIcon="chevron-down"
									>
										{footerConfigArrays[colKey].map(
											(item, index) => (
												<Link href={item.href}>
													<div
														key={index}
														className="modalItem"
													>
														{item.title}{" "}
													</div>
												</Link>
											)
										)}
									</Accordion>
								))}
						</div>
					)}
				</Fragment>
			))}
		</div>
	);
};

export default component;
