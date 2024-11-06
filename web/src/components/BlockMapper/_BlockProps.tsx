import type { ReactNode } from "react";

export type Props = {
	_id?: string;
	_type?: string;
	_rev?: string;
	_createdAt?: string;
	_updatedAt?: string;
	name?: string;
	title?: string;
	fields?: any;
	value?: any;
	placeholder?: any;
	onChange?: any;
	ctaButtons?: any;
	imageLink?: any;
	imageLinks?: any;
	desktopImage?: any;
	image?: any;
	images?: any[];
	reverse?: any;
	swatch?: any;
	embed?: string;
	className?: string;
	class?: string;
	disabled?: boolean;
	customclass?: string;
	alt_text?: string;
	testimonialCarousel?: any;
	bookingCta?: string;
	articles?: any;
	btnText?: any;
	btnUrl?: any;
	description?: any;
	error?: any;
	required?: any;
	pattern?: any;
	type?: any;
	fit?: string;
	ref?: any;
	id?: string;
	ctaText?: string;
	imageAltText?: string;
	altText?: string;
	videoDescription?: string;
	videoSource?: string;
	hideOnMobile?: boolean;
	videoSourceCode?: string;
	gridCards?: any;
	cards?: any;
	// other
	body?: any;
	bodyCopy?: string;
	headline?: any;
	eyebrow?: any;
	header?: any;
	ctaCopy?: string;
	ctaUrl?: any;
	interiorVideoSource?: string;
	styleVariant?: string;
	caption?: string;
	// ----- CUSTOM UNIQUE PROP TYPES BELOW -----
	as?: string;
	label?: string;
	url?: string;
	href?: string;
	variant?: string;
	onClick?: any;
	children?: ReactNode;
};

export const MapProps = (block: Props) => {
	if (block == null) return null;
	let BlockMap = {
		...block,
		// ----- CUSTOM UNIQUE PROPS HERE -----
	};
	// adds props that do not exist in BlockMap that are equal to itself
	for (const prop in block.fields) {
		if (!BlockMap[prop]) {
			BlockMap[prop] = block.fields[prop];
		}
	}
	return BlockMap;
};
