import React, { useEffect, useState } from "react";
import "./styles.css";
import { Icon, List, Text } from "@blocks";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

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
    required,
    state,
    placeholder,
    // Removed `value` and `checked` from destructured props
    ...restProps
  } = props;

  const [inputError, setInputError] = useState<any>(null);

  if (required && as !== "checkbox") label = `${label} *`;

  useEffect(() => {
    if (state === "error") setInputError(error);
    if(state == null && error != null) setInputError(error);
  }, [state, error]);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    if (e.target == null) return;

    
    let value = e.target.value;
    // Validation logic
    switch (e.target.type) {
      case "select-one":
        if (e.target.value === "")
          setInputError(error || "Please select one option");
        else setInputError(null);
        break;
        case "checkbox":
          value = e.target.checked;
          break;
      default:
        if (e.target.value === "")
          setInputError(error || "Please provide a value");
        else setInputError(null);
        break;
    }

    // Call the parent's onChange function with the event
    if (typeof onChange === "function") onChange(value);
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
            ref={ref}
            {...restProps} // Includes `value`
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
            {...restProps} // Includes `value`
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
          <List el="column xsm">
            <input
              type="checkbox"
              onChange={handleInputChange}
              className={`checkbox bodyM ${inputError ? "error" : ""}`}
              {...restProps} // Includes `checked`
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
          </List>
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
            style={{ margin: 0, marginBottom: "4px" }}
            font="bodyMBold"
            content={label}
            color="currentColor"
          />
          <input
            onChange={handleInputChange}
            className={`input bodyM ${inputError ? "error" : ""}`}
            placeholder={placeholder}
            {...restProps} // Includes `value`
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
