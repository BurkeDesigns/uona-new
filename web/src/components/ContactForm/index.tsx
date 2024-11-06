import React, { useState, useEffect } from "react";
import Input from "@components/Input";
import { List, Text } from "@blocks";

interface FormData {
	company_name: string;
	first_name: string;
	last_name: string;
	email_address: string;
	phone_number: string;
	state: string;
	purchase_type: string;
	government_type: string;
	fleet_type: string;
	marketing_lead: string;
	age_verification: boolean;
	comments: string;
	product: string;
	units_number: string;
}

const states = [
	"Alabama",
	"Alaska",
	"Arizona",
	"Arkansas",
	"California",
	"Colorado",
	"Connecticut",
	"Delaware",
	"Florida",
	"Georgia",
	"Hawaii",
	"Idaho",
	"Illinois",
	"Indiana",
	"Iowa",
	"Kansas",
	"Kentucky",
	"Louisiana",
	"Maine",
	"Maryland",
	"Massachusetts",
	"Michigan",
	"Minnesota",
	"Mississippi",
	"Missouri",
	"Montana",
	"Nebraska",
	"Nevada",
	"New Hampshire",
	"New Jersey",
	"New Mexico",
	"New York",
	"North Carolina",
	"North Dakota",
	"Ohio",
	"Oklahoma",
	"Oregon",
	"Pennsylvania",
	"Rhode Island",
	"South Carolina",
	"South Dakota",
	"Tennessee",
	"Texas",
	"Utah",
	"Vermont",
	"Virginia",
	"Washington",
	"West Virginia",
	"Wisconsin",
	"Wyoming",
	"American Samoa",
	"Guam",
	"Northern Mariana Islands",
	"Puerto Rico",
	"U.S. Virgin Islands",
];

const ContactForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		company_name: "",
		first_name: "",
		last_name: "",
		email_address: "",
		phone_number: "",
		state: "",
		purchase_type: "",
		government_type: "",
		fleet_type: "",
		marketing_lead: "",
		age_verification: false,
		comments: "",
		product: "",
		units_number: "",
	});

	const [errors, setErrors] = useState<Partial<FormData>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (isSubmitting) {
			const newErrors: Partial<FormData> = {};
			if (!formData.company_name) newErrors.company_name = "Required";
			if (!formData.first_name) newErrors.first_name = "Required";
			if (!formData.last_name) newErrors.last_name = "Required";
			if (!formData.email_address) newErrors.email_address = "Required";
			else if (!/\S+@\S+\.\S+/.test(formData.email_address))
				newErrors.email_address = "Invalid email format";
			if (!formData.phone_number) newErrors.phone_number = "Required";
			else if (!/^\d{10}$/.test(formData.phone_number))
				newErrors.phone_number = "Invalid phone number format";
			if (!formData.state) newErrors.state = "Required";
			if (!formData.purchase_type) newErrors.purchase_type = "Required";
			if (
				formData.purchase_type === "Government" &&
				!formData.government_type
			)
				newErrors.government_type = "Required";
			if (formData.purchase_type === "Fleet" && !formData.fleet_type)
				newErrors.fleet_type = "Required";
			if (!formData.marketing_lead) newErrors.marketing_lead = "Required";
			if (!formData.age_verification)
				newErrors.age_verification = "Required";
			if (!formData.product) newErrors.product = "Required";
			if (!formData.units_number) newErrors.units_number = "Required";

			setErrors(newErrors);
			setIsSubmitting(Object.keys(newErrors).length === 0);
		}
	}, [isSubmitting, formData]);

	const handleInputChange = (name: string) => (value: string | boolean) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		if (Object.keys(errors).length === 0) {
			// Here you would typically send the form data to your backend
			console.log("Form submitted:", formData);
			// Reset form after submission
			setFormData({
				company_name: "",
				first_name: "",
				last_name: "",
				email_address: "",
				phone_number: "",
				state: "",
				purchase_type: "",
				government_type: "",
				fleet_type: "",
				marketing_lead: "",
				age_verification: false,
				comments: "",
				product: "",
				units_number: "",
			});
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			<List el="xsm">
				<Input
					label="Government Agency or Company Name"
					name="company_name"
					value={formData.company_name}
					onChange={() => handleInputChange("company_name")}
					error={errors.company_name}
					required
				/>

				<Input
					label="First Name"
					name="first_name"
					value={formData.first_name}
					onChange={() => handleInputChange("first_name")}
					error={errors.first_name}
					required
				/>

				<Input
					label="Last Name"
					name="last_name"
					value={formData.last_name}
					onChange={() => handleInputChange("last_name")}
					error={errors.last_name}
					required
				/>

				<Input
					label="Email Address"
					name="email_address"
					value={formData.email_address}
					onChange={() => handleInputChange("email_address")}
					error={errors.email_address}
					required
				/>

				<Input
					label="Phone Number"
					name="phone_number"
					value={formData.phone_number}
					onChange={() => handleInputChange("phone_number")}
					error={errors.phone_number}
					required
				/>

				<Input
					as="select"
					label="State"
					name="state"
					value={formData.state}
					onChange={() => handleInputChange("state")}
					error="Please select a valid state"
					required
				>
					<option value="">Select a state</option>
					{states.map((state) => (
						<option key={state} value={state}>
							{state}
						</option>
					))}
				</Input>

				<Input
					as="select"
					label="Purchase Type"
					name="purchase_type"
					value={formData.purchase_type}
					onChange={() => handleInputChange("purchase_type")}
					error="Please select a valid type"
					required
				>
					<option value="">Select one</option>
					<option value="Government">Government</option>
					<option value="Fleet">Fleet</option>
					<option value="Other">Other</option>
				</Input>

				{formData.purchase_type === "Government" && (
					<Input
						as="select"
						label="Government Type"
						name="government_type"
						value={formData.government_type}
						onChange={() => handleInputChange("government_type")}
						error={errors.government_type}
						required
					>
						<option value="">Select one</option>
						<option value="Federal">Federal</option>
						<option value="State">State</option>
						<option value="City">City</option>
						<option value="County">County</option>
						<option value="Education">Education</option>
					</Input>
				)}

				{formData.purchase_type === "Fleet" && (
					<Input
						as="select"
						label="Fleet Type"
						name="fleet_type"
						value={formData.fleet_type}
						onChange={() => handleInputChange("fleet_type")}
						error={errors.fleet_type}
						required
					>
						<option value="">Select one</option>
						<option value="Agriculture">Agriculture</option>
						<option value="Construction">Construction</option>
						<option value="Industrial">Industrial</option>
						<option value="Ground maintenance">
							Ground maintenance
						</option>
						<option value="Rental">Rental</option>
					</Input>
				)}

				<Input
					as="select"
					label="How did you hear about Kawasaki Vehicles?"
					name="marketing_lead"
					value={formData.marketing_lead}
					onChange={() => handleInputChange("marketing_lead")}
					error="Please select a valid option"
					required
				>
					<option value="">Select one</option>
					<option value="Kawasaki.com">Kawasaki.com</option>
					<option value="Current customer">Current customer</option>
					<option value="Industry trade show">
						Industry trade show
					</option>
					<option value="Internet search">Internet search</option>
					<option value="Kawasaki marketing">
						Kawasaki marketing
					</option>
					<option value="Other">Other</option>
				</Input>

				<Input
					label="I verify that I am 13 years or over, a United States resident, and agree to Kawasaki's privacy policy and terms and conditions of use."
					as="checkbox"
					checked={true}
					// checked={formData.age_verification}
					// error={errors.age_verification}
					onChange={(val) =>
						handleInputChange("age_verification")(val)
					}
				/>

				<Input
					as="textarea"
					label="Additional Comments"
					name="comments"
					value={formData.comments}
					onChange={() => handleInputChange("comments")}
				/>

				<Input
					as="select"
					label="Product"
					name="product"
					value={formData.product}
					onChange={() => handleInputChange("product")}
					error="Please select a valid product"
					required
				>
					<option value="">Select one</option>
					<option value="KT400 4x4">KT400 4x4</option>
					<option value="KT620 4x4">KT620 4x4</option>
					<option value="KT620 TRANS4x4">KT620 TRANS4x4</option>
					<option value="KT1000 Diesel TRANS4x4">
						KT1000 Diesel TRANS4x4
					</option>
				</Input>

				<Input
					as="select"
					label="Number of Units"
					name="units_number"
					value={formData.units_number}
					onChange={() => handleInputChange("units_number")}
					error="Please select a valid number of units"
					required
				>
					<option value="">Select one</option>
					<option value="1-5 units">1-5 units</option>
					<option value="6-10 units">6-10 units</option>
					<option value="11-20 units">11-20 units</option>
					<option value="21+ units">21+ units</option>
				</Input>

				{/* <Input label="CAPTCHA" name="captcha" required /> */}

				<div>
					<button type="submit">Submit</button>
				</div>
			</List>
		</form>
	);
};

export default ContactForm;
