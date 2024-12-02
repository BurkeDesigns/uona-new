import React, { useEffect, useState } from "react";
import "./styles.css";
import { Icon, Text } from "@blocks";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

import { useSignal } from "@preact/signals-react";

type Props = InputProps &
	TextareaProps &
	SelectProps & {
		label?: string;
		ref?: any;
		as?: "textarea" | "select" | "checkbox";
		name?: string;
		placeholder?: string;
		state?: "error";
		error?: string;
		onChange?: (value: any) => void;
		value?: string;
		checked?: boolean;
		required?: boolean;
	};

const Input = (props: Props) => {
	let {
		children,
		onChange,
		as,
		label,
		error,
		ref,
		value,
		checked,
		required,
		state,
		placeholder,
		...restProps
	} = props;

	// const inputError = useSignal<any>(null);
	const [isChecked, setIsChecked] = useState(checked || false);
	const [inputError, setInputError] = useState<any>(null);

	if (required && as != "checkbox") label = `${label} *`;

	useEffect(() => {
		if (state == "error") setInputError(error);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<any>) => {
		let val =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;
		if (typeof onChange === "function") onChange(val);

		console.log(e.target.type);

		switch (e.target.type) {
			case "select-one":
				if (e.target.value == "")
					setInputError(error || "Please select one option");
				break;
			default:
				if (e.target.value == "")
					setInputError(error || "Please provide a value");
				break;
		}
		if (e.target.value != "") setInputError(null);
	};
	const toggleCheckbox = (e: React.ChangeEvent<any>) => {
		setIsChecked(!isChecked);
		console.log(isChecked);
	};

	switch (as) {
		case "textarea":
			return (
				<label>
					<Text
						style={{ margin: 0, marginBottom: "4px" }}
						font="bodyMBold"
						content={label}
						color="currentColor"
					/>
					<textarea
						onChange={handleInputChange}
						className={`textarea bodyM ${inputError ? "error" : ""}`}
						placeholder={placeholder}
						{...restProps}
					/>
					<Text
						style={{ margin: 0, color: "darkred" }}
						content={inputError}
					/>
				</label>
			);
		case "select":
			return (
				<label>
					<Text
						style={{ margin: 0, marginBottom: "4px" }}
						font="bodyMBold"
						content={label}
						color="currentColor"
					/>
					<select
						onChange={handleInputChange}
						className={`select bodyM ${inputError ? "error" : ""}`}
						value={value || ""}
						{...restProps}
					>
						{children}
					</select>
					<Text
						style={{ margin: 0, color: "darkred" }}
						content={inputError}
					/>
				</label>
			);
		case "checkbox":
			return (
				<label>
					<div className="listColumn">
						<input
							type="checkbox"
							onChange={handleInputChange}
							onClick={toggleCheckbox}
							className={`checkbox bodyM ${inputError ? "error" : ""}`}
							checked={isChecked}
							{...restProps}
						/>
						<Text
							style={{
								margin: 0,
								marginBottom: "10px",
								userSelect: "none",
								WebkitUserSelect: "none",
								cursor: "pointer",
							}}
							font="bodyM"
							content={label}
							color="currentColor"
						/>
					</div>
					<Text
						style={{ margin: 0, color: "darkred" }}
						content={inputError}
					/>
				</label>
			);
		default:
			return (
				<label>
					<Text
						style={{ margin: 0, marginBottom: "10px" }}
						font="bodyMBold"
						content={label}
						color="currentColor"
					/>
					<input
						onChange={handleInputChange}
						className={`input bodyM ${inputError ? "error" : ""}`}
						placeholder={placeholder}
						{...restProps}
					/>
					<Text
						style={{ margin: 0, color: "darkred" }}
						content={inputError}
					/>
				</label>
			);
	}
};

export default Input;
