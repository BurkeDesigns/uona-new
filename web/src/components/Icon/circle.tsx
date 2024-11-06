import React, { useState, useEffect } from "react";
import "./styles.css";
import type { IconNames } from "./index";
import Icon from "./index";

type Props = {
	icon?: IconNames;
	disabled?: any;
	variant?: "outline-black" | "outline-white" | "black";
};

const component = (props: Props) => {
	const { icon, variant } = props;
	return (
		<div className={`circleIcon ${variant}`}>
			<Icon name={icon || "chevron-left"} />
		</div>
	);
};

export default component;
