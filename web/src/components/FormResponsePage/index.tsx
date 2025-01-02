import List from "@components/List";
import Btn from "@components/Button";
import Text from "@components/Text";
import "./styles.css";
import "./pageEditor.css";
import Icon from "@components/Icon";
import { useState, useEffect } from "react";
import Input from "@components/Input";
import { useRef } from "react";
import API from "@util/api";
import Link from "@components/Link";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type FormData = {
	id?: string | number;
	uid?: string | number;
	name?: string;
	status?: string;
	type?: string;
	group?: string;
	uploaded_files?: any;
	expires?: string;
};

const component = (props: FormData) => {
	// const { data } = props;

	const [formData, setFormData]:any = useState(props);
	// const [iframeSlug, setIframeSlug] = useState(props.slug? `/${props.slug}?preview=true` : '/');

	const errors:any = useRef({});
	const [errorState, setErrorState]:any = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const inputRef = useRef(null);

	let api = new API();

	// useEffect(() => {
	// 	// errors.current = {};
	// 	// check if slug exists in api
	// 	setFormData((prev) => {
	// 		if (prev.slug == '') errors.current.slug = "Slug is required";
	// 		return prev;
	// 	});
	// }, [isSubmitting]);

	const handleInputChange = (name: string, value: string | boolean) => {
		setFormData((prev) => {
			let newData = {
				...prev,
				[name]: value,
			};
			delete errors.current[name];
			// switch (name) {
			// 	case 'slug': 
			// 		if (value == '') errors.current.slug = "Slug is required";
			// 		break;
			// }
			console.log('Errors:', errors.current);
			return newData;
		});
	};

	const handleDataChange = (name: string, value: string | boolean) => {
		setFormData((prev) => {
			let newData = structuredClone(prev);
			newData.data[name] = value;
			delete errors.current[name];
			// switch (name) {
			// 	case 'slug': 
			// 		if (value == '') errors.current.slug = "Slug is required";
			// 		break;
			// }
			console.log('Errors:', errors.current);
			return newData;
		});
	};

	const handleSubmit = async () => {
		if ([undefined, null, ''].includes(formData.data.name)) errors.current.name = "Name is required";
		if ([undefined, null, ''].includes(formData.data.student_id)) errors.current.student_id = "Student ID is required";
		if ([undefined, null, ''].includes(formData.status)) errors.current.status = "Status is required";
		if ([undefined, null, ''].includes(formData.data.birthday)) errors.current.birthday = "Student ID is required";
		// if (formData.author == null || formData.author == '') errors.current.author = "author is required";
		// if (formData.title == null || formData.title == '') errors.current.title = "title is required";
		// if (formData.description == null || formData.description == '') errors.current.description = "description is required";
		// if (formData.blocks == null || formData.blocks == '') errors.current.blocks = "content is required";

		console.log("Errors:", errors.current);
	};


	const update = async () => {
		handleSubmit();

		if (Object.keys(errors.current).length === 0) {
			setIsSubmitting(true);
			// Here you would typically send the form data to your backend
			let data:any = structuredClone(formData);
			if(Object.keys(data).includes('children')) delete data.children;
			console.log("Form submitted:", data);
			data.updated_at = (new Date()).toISOString();
			const toastId = toast.loading("Updating page...");
			let result = await api.formResponse.update(data);
			if(result.success == true && result?.data?.length > 0) toast.update(toastId, { render: "Updated form response!", type: "success", isLoading: false, autoClose: 1500 });
			else toast.update(toastId, { render: "Failed to update page", type: "error", isLoading: false, autoClose: 3000 });
			console.log('Result:', result);
			setIsSubmitting(false);
		}
	};

	const deleteFormResponse = async () => {
		// let test = new API('http://localhost:3008');
		const confirmed = confirm("Are you sure you want to delete this form response?");
  		if (!confirmed) return;
		let result = await api.formResponse.delete(Number(formData.id));
		console.log('Result:', result);
		// window.location.href = '/login/dashboard/forms';
	};

	console.log('Form Data:', formData);

	
	return <>
	<div className="pageEditor">
			<div>
			<List el="xsm" style={{color: 'white'}} >
					<Input
						label="Name"
						value={formData.data.name}
						onChange={(val) => handleDataChange("name", val)}
						error={errors.current.name}
						required
					/>
					<Input
						label="Student ID"
						value={formData.data.student_id}
						onChange={(val) => handleDataChange("student_id", val)}
						error={errors.current.student_id}
						required
					/>
					<List el="column-stretch xsm">
						<Input
							as="select"
							label="Status"
							value={formData.status}
							onChange={(val) => handleInputChange("status", val)}
							error={errors.current.status}
							required
						>
							<option value="">Select one</option>
							<option value="submitted">Submitted</option>
							<option value="reviewing">Reviewing</option>
							<option value="approved">Approved</option>
							<option value="denied">Denied</option>
							{/* <option value="published">Published</option>
							<option value="archived">Archived</option> */}
						</Input>
					</List>

					<Input
						label="Date of Birth"
						type="date"
						value={formData.data.birthday}
						onChange={(val) => handleDataChange("birthday", val)}
						error={errors.current.birthday}
						required
					/>
					<Input
							as="select"
							label="Reason For Waiver"
							value={formData.data.reason_for_waiver}
							onChange={(val) => handleDataChange("reason_for_waiver", val)}
							error={errors.current.reason_for_waiver}
							required
						>
							<option value="I have insurance">I have insurance</option>
							<option value="I want to stay uninsured">I want to stay uninsured</option>
							{/* <option value="published">Published</option>
							<option value="archived">Archived</option> */}
						</Input>


					{/* <Text color="currentColor" font="bodyLBold">Page Content</Text> */}

					{props.id != null && <List el="column xxsm">
						<Btn onClick={deleteFormResponse} variant="secondaryWhite">Delete</Btn>
						{isSubmitting != true && <Btn onClick={update}>Update</Btn>}
						{isSubmitting == true && <Btn disabled>Updating...</Btn>}
					</List>}
					{/* <Link href="https://www.markdownguide.org/basic-syntax/" style={{color:'#2facee'}}>Markdown Guide HERE</Link>
					<Link href={`https://uona.swaggear.life/${formData.slug}`} style={{color:'#2facee'}}>Open Public Page</Link> */}
			</List>
			</div>
			<List el="xsm">
				<Text color="currentColor" font="bodyLBold">Attachments</Text>
				{formData.uploaded_files.length == 0 && <Text color="currentColor">No attachments were provided.</Text>}
				{formData.uploaded_files.map((item, index)=><>
					{!item.type.startsWith('image') && <Link href={`https://uona-api.swaggear.life/form-response/files/${item.id}/original`} style={{color:'#2facee'}}>Attachment {index+1}</Link>}
					{item.type.startsWith('image') && <img src={`https://uona-api.swaggear.life/form-response/files/${item.id}/720`} style={{width:500}} alt="image" />}
				</>)}
			</List>
	</div>
	<ToastContainer
		position="bottom-right"
		autoClose={4000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		theme="dark"
		/>
	</>
};

export default component;
