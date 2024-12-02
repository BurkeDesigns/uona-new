import List from "@components/List";
import "./styles.css";
import Icon from "@components/Icon";
import { useState, useEffect } from "react";
import Input from "@components/Input";


type FormData = {
	slug?: string;
	status?: string;
	type?: string;
	group?: string;
	author?: string;
	title?: string;
	description?: string;
	content?: string;
	expires?: string;
};

const component = (props: FormData) => {
	// const { data } = props;

	const [formData, setFormData] = useState<FormData>(props);

	const [errors, setErrors] = useState<Partial<FormData>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (isSubmitting) {
			const newErrors: Partial<FormData> = {};
			// if (!formData.company_name) newErrors.company_name = "Required";

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
			// setFormData({});
			setIsSubmitting(false);
		}
	};

	
	return <>
	<form onSubmit={handleSubmit} noValidate>
		<List el="xsm" style={{color: 'white'}}>
				<Input
					label="Slug"
					value={formData.slug}
					onChange={() => handleInputChange("slug")}
					error={errors.slug}
					required
				/>
				<Input
					as="select"
					label="Status"
					value={formData.status}
					onChange={() => handleInputChange("status")}
					error="Please select a valid status"
					required
				>
					<option value="">Select one</option>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
				</Input>

				<Input
					label="Author"
					value={formData.author}
					onChange={() => handleInputChange("author")}
					error={errors.author}
					required
				/>

				<Input
					label="Page Title"
					value={formData.title}
					onChange={() => handleInputChange("title")}
					error={errors.title}
					required
				/>

				<Input
					label="Page Description"
					value={formData.description}
					onChange={() => handleInputChange("description")}
					error={errors.description}
					required
				/>
				<Input
					as="textarea"
					label="Content"
					value={formData.content}
					onChange={() => handleInputChange("content")}
					error={errors.content}
					required
				/>

				

				{/* <Input
					label="First Name"
					name="first_name"
					value={formData.first_name}
					onChange={() => handleInputChange("first_name")}
					error={errors.first_name}
					required
				/> */}
				<div>
					<button type="submit">Submit</button>
				</div>
		</List>
	</form>
		
	</>
};

export default component;
