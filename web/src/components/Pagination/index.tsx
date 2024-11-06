import Text from "@components/Text";
import Box from "@components/Box";
import { useSignal } from "@preact/signals-react";
import type { Signal } from "@preact/signals-react";
import "./styles.css";
import { useEffect } from "react";

type Pagination = {
	total: number;
	page?: Signal;
	onClick?: (page: number) => void;
	align?: "left" | "right" | "center";
};

export const scrollObserver = (
	className: string,
	idPrefix: string,
	page: Signal
) => {
	const items = document.querySelectorAll(className);

	const observerOptions = {
		root: null, // observing intersections relative to the viewport
		threshold: 0.5, // trigger when at least 50% of the element's area is visible
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				let slideNum = Number(entry.target.id.split(idPrefix)[1]);
				page.value = slideNum;
			}
		});
	}, observerOptions);

	// Observe each item in the list
	items.forEach((item) => {
		observer.observe(item);
	});

	return observer;
};

const component = (props: Pagination) => {
	let { total, onClick, page, align } = props;

	const pageArr: any = useSignal([]);
	if (!page) page = useSignal(0);

	// useEffect(() => {
	// 	if (onClick) onClick(page?.value);
	// }, [page.value]);
	useEffect(() => {
		pageArr.value = Array(total).fill(true);
	}, []);

	const next = () => {
		if (!page) return;
		if (page.value == total - 1) return;
		if (page) page.value = (page.value + 1) % total;
		if (onClick) onClick(page?.value);
	};
	const to = (num) => {
		if (page) page.value = num;
		if (onClick) onClick(page?.value);
	};
	const prev = () => {
		if (!page) return;
		if (page.value == 0) return;
		if (page.value - 1 < 0) {
			page.value = total - 1;
		} else {
			page.value = (page.value - 1) % total;
		}
		if (onClick) onClick(page?.value);
	};

	return (
		<Box customclass={`${align} noPadding`}>
			<div className="pagination hideOnMobile">
				<div className="prev" onMouseDown={prev}>
					<svg
						width="27"
						height="25"
						viewBox="0 0 27 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7 7.49316L2 12.4932L7 17.4932"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="square"
						/>
						<path
							d="M27 12.4932L2 12.4932"
							stroke="currentColor"
							strokeWidth="2"
						/>
					</svg>
				</div>
				<Text>
					{page.value + 1} of {total}
				</Text>
				<div className="next" onMouseDown={next}>
					<svg
						width="27"
						height="13"
						viewBox="0 0 27 13"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="Component 1">
							<path
								id="Vector 46"
								d="M20 1.49316L25 6.49316L20 11.4932"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="square"
							/>
							<path
								id="Vector 49"
								d="M0 6.49316L25 6.49316"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</g>
					</svg>
				</div>
			</div>
			<div className="pagination hideOnDesktop">
				{pageArr.value.map((item, i) => (
					<div
						className={`circle ${page?.value == i ? "active" : ""}`}
						onMouseDown={() => to(i)}
					></div>
				))}
			</div>
		</Box>
	);
};

export default component;
