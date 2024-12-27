import List from "@components/List";
import Btn from "@components/Button";
import Text from "@components/Text";
// import "./styles.css";
// import "./pageEditor.css";
import Icon from "@components/Icon";
import { useState, useEffect } from "react";
import Input from "@components/Input";
import { useRef } from "react";
import API from "@util/api";
import Link from "@components/Link";
import { nanoid } from "nanoid";
import type { NewUser } from "../../../../api/db/types";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type FormData = {
	user?: any;
	access?: any;
};

const component = (props: FormData) => {
	const { user, access } = props;

	console.log('User Data:', user, access);

	const [formData, setFormData] = useState(props);

	const errors:any = useRef({});
	const [errorState, setErrorState]:any = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

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
			switch (name) {
				case 'slug': 
					if (value == '') errors.current.slug = "Slug is required";
					break;
			}
			console.log('Errors:', errors.current);
			return newData;
		});
	};

	const handleChange = (key: string, value: string | boolean) => {
		setFormData((prev) => {
			let data = structuredClone(prev);
			if (data.user == null) data.user = {
				name: '',
				email: '',
			};
			data.user[key] = value;
			// console.log('Data:', data);
			return data;
		});
	};

	// const addBlock = (data) => {
	// 	setFormData((prev) => {
	// 		let blocks = prev.blocks || [];
	// 		let newData = {
	// 			...prev,
	// 			blocks: [...blocks, data],
	// 		};
	// 		return newData;
	// 	});
	// };

	// const addMarkdown = () => {
	// 	addBlock({
	// 		id: nanoid(),
	// 		type: 'markdown',
	// 		content: '',
	// 	});
	// };

	const handleSubmit = () => {
		errors.current = {};
		if ([undefined, null, ''].includes(formData.user?.name)) errors.current.name = "Name is required";
		if ([undefined, null, ''].includes(formData.user?.email)) errors.current.email = "Email is required";
		if ([undefined, null, ''].includes(formData.user?.type)) errors.current.type = "Type is required";
		if ([undefined, null, ''].includes(formData.user?.group)) errors.current.group = "Group is required";
		if ([undefined, null, ''].includes(formData.user?.job_title)) errors.current.job_title = "Job title is required";
		if ([undefined, null, ''].includes(formData.user?.phone)) errors.current.phone = "Phone number is required";
		
	};

	const createUser = async () => {
		handleSubmit();

		const toastId = toast.loading("Creating user...");

		if (Object.keys(errors.current).length === 0) {
			// setIsSubmitting(true);
			// // Here you would typically send the form data to your backend
			let data:any = structuredClone(formData.user);
			if(Object.keys(data).includes('children')) delete data.children;
			console.log("Form submitted:", data);
			// // Reset form after submission
			// // setFormData({});
			// // let result = await api.pages.list();
			let result = await api.users.create(data);
			console.log('Result:', result);
			if(result.success == true && result.user[0].id != null){
				toast.update(toastId, { render: "Created user!", type: "success", isLoading: false, autoClose: 1500 });
				window.location.href = '/login/dashboard/users/edit/' + result.user[0].id;
			}else{
				toast.update(toastId, { render: "Create user failed", type: "error", isLoading: false, autoClose: 3000 });
			}
			// setIsSubmitting(false);
			
		}else{
			toast.update(toastId, { render: "Create user failed", type: "error", isLoading: false, autoClose: 3000 });
		}
	};

	const updateUser = async () => {
		// handleSubmit();

		if (Object.keys(errors.current).length === 0) {
			setIsSubmitting(true);
			// // Here you would typically send the form data to your backend
			let data:any = structuredClone(formData.user);
			if(Object.keys(data).includes('children')) delete data.children;
			console.log("Form submitted:", data);
			data.updated_at = (new Date()).toISOString();
			// // Reset form after submission
			// // setFormData({});
			const toastId = toast.loading("Updating user...");
			let result = await api.users.update(data);
			// let result = await api.pages.update(data);
			console.log('Updated user result:', result);
			
			// setIframeSlug(`/${data.slug}?v=${new Date().getTime()}&preview=true`);
			// window.location.href = '/login/dashboard/users';
			setIsSubmitting(false);

			if(result.success == true && result.user[0].id!= null) toast.update(toastId, { render: "Updated User!", type: "success", isLoading: false, autoClose: 1500 });
			else toast.update(toastId, { render: "Update user failed", type: "error", isLoading: false, autoClose: 3000 });
		}
	};

	const deleteUser = async () => {
		const confirmed = confirm("Are you sure you want to delete this user?");
  		if (!confirmed) return;
		let result = await api.users.delete(Number(formData.user?.id));
		console.log('Result:', result);
		window.location.href = '/login/dashboard/users';
	};

	const checkAccess = (type: string) => {
		return access?.list?.some(obj => obj.type == type) || false;
	};

	const toggleAccess = async (type: string, enable: boolean) => {
		if(user?.id == null) return;
		// check if exists
		console.log(type, enable);
		let existingAccess = await api.access.get({
			uid: user?.id,
			type,
		});
		console.log('existingAccess', existingAccess);
		const toastId = toast.loading("Updating access...");
		if(existingAccess.success == true && (existingAccess.access == null || existingAccess.access.length == 0)){
			// create new access if not found
			let newAccess = await api.access.create({
				uid: user?.id,
				type,
				access_level: 'admin'
			});
			console.log('New Access', newAccess);
			if(newAccess.success == true) toast.update(toastId, { render: "Access Updated!", type: "success", isLoading: false, autoClose: 1500 });
			else toast.update(toastId, { render: "Access update failed", type: "error", isLoading: false, autoClose: 3000 });
		} else {
			// delete access
			let removed = await api.access.delete({
				uid: user?.id,
				type,
			});
			console.log('Deleted Access', removed);
			if(removed.success == true) toast.update(toastId, { render: "Access Updated!", type: "success", isLoading: false, autoClose: 1500 });
			else toast.update(toastId, { render: "Access update failed", type: "error", isLoading: false, autoClose: 3000 });
		}
		// let exists = await ap
		// const confirmed = confirm("Are you sure you want to delete this page?");
  		// if (!confirmed) return;
		// let result = await api.pages.delete(Number(formData.id));
		// console.log('Result:', result);
		// window.location.href = '/login/dashboard/pages';
	};

	console.log('Form Data:', formData);

	
	return <>
	<div className="createUsers">
			<List el="xsm" style={{color: 'white', margin:'auto', maxWidth: 600}}>
					<Input
						label="Full Name"
						value={formData.user?.name || ''}
						onChange={(val) => handleChange("name", val)}
						error={errors.current.name}
						required
					/>
					{/* <Input
						label="UoNA Email"
						value={formData.user?.email || ''}
						onChange={(val) => handleChange("email", val)}
						error={errors.current.email}
						required
					/> */}
					<Input
						label="Student ID"
						value={formData.user?.student_id || ''}
						onChange={(val) => handleChange("student_id", val)}
						error={errors.current.student_id}
						required
					/>
					{/* <Input
						label="Phone Number"
						value={formData.user?.phone || ''}
						onChange={(val) => handleChange("phone", val)}
						error={errors.current.phone}
						required
					/> */}
					<Input
						label="Date of Birth"
						value={formData.user?.phone || ''}
						onChange={(val) => handleChange("phone", val)}
						error={errors.current.phone}
						required
					/>
						<Input
							as="select"
							label="Confirm Waiver"
							value={formData.user?.type || ''}
							onChange={(val) => handleChange("type", val)}
							error={errors.current.type}
							required
						>
							<option value="">Select one</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</Input>
						<label>
							<Text color="white" font="bodyMBold">Upload proof of insurance *</Text>
							<input type="file" />
						</label>
						<div>
						<Btn>Submit Waiver</Btn>
						</div>
						{/* <Input
							as="checkbox"
							label="Accept Insurance"
							onChange={(val) => toggleAccess("accept", val)}
							defaultChecked={checkAccess('accept')}
						/> */}
						{/* <Input
							as="checkbox"
							label="Create Pages"
							onChange={(val) => toggleAccess("pages", val)}
							defaultChecked={checkAccess('pages')}
						/> */}
					{/* <List el="column-stretch xsm">
						<Input
							as="select"
							label="Status"
							value={formData.status}
							onChange={(val) => handleInputChange("status", val)}
							error={errors.current.status}
							required
						>
							<option value="">Select one</option>
							<option value="draft">Draft</option>
							<option value="published">Published</option>
						</Input>

						<Input
							label="Author"
							value={formData.author}
							onChange={(val) => handleInputChange("author", val)}
							error={errors.current.author}
							required
						/>
					</List> */}

					{/* <Input
						label="Page Title"
						value={formData.title}
						onChange={(val) => handleInputChange("title", val)}
						error={errors.current.title}
						required
					/>

					<Input
						label="Page Description"
						value={formData.description}
						onChange={(val) => handleInputChange("description", val)}
						error={errors.current.description}
						required
					/>
					<Text color="currentColor" font="bodyLBold">Page Content</Text>
					{formData.blocks == null && <div>
					<Btn variant="tertiaryWhite" leftIcon="plus" onClick={addMarkdown}>Add Markdown</Btn>
					</div>}
					{formData.blocks && formData.blocks.map((block:any, index:number) => <>
						{block.type == 'markdown' && <Input
							as="textarea"
							label="Markdown Content"
							value={block.content}
							onChange={(val) => handleBlockChange(index, "content", val)}
							error={errors.current.blocks}
							style={{height: '300px'}}
							required
						/>}
					</>
					)} */}

					

					{/* <Input
						label="First Name"
						name="first_name"
						value={formData.first_name}
						onChange={() => handleInputChange("first_name")}
						error={errors.first_name}
						required
					/> */}
					{/* {props.id == null && <div>
						{isSubmitting != true && <Btn onClick={createPage}>Create Page</Btn>}
						{isSubmitting == true && <Btn disabled>Creating Page...</Btn>}
					</div>} */}
					{/* {props.id != null && <List el="column xxsm">
						<Btn onClick={deletePage} variant="secondaryWhite">Delete</Btn>
						{isSubmitting != true && <Btn onClick={updatePage}>Update Page</Btn>}
						{isSubmitting == true && <Btn disabled>Updating...</Btn>}
					</List>}
					<Link href="https://www.markdownguide.org/basic-syntax/" style={{color:'#2facee'}}>Markdown Guide HERE</Link> */}
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
