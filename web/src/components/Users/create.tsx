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
import type { NewUser } from "../../../../api/db/types";

type FormData = {
	user?: NewUser;
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

	const handleUserChange = (key: string, value: string | boolean) => {
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

	const handleSubmit = async () => {
		// if (formData.slug == null || formData.slug == '') errors.current.slug = "Slug is required";
		// if (formData.status == null || formData.status == '') errors.current.status = "Status is required";
		// if (formData.author == null || formData.author == '') errors.current.author = "author is required";
		// if (formData.title == null || formData.title == '') errors.current.title = "title is required";
		// if (formData.description == null || formData.description == '') errors.current.description = "description is required";
		// if (formData.blocks == null || formData.blocks == '') errors.current.blocks = "content is required";

		console.log("Errors:", errors.current);
	};

	const createUser = async () => {
		handleSubmit();

		if (Object.keys(errors.current).length === 0) {
			// setIsSubmitting(true);
			// // Here you would typically send the form data to your backend
			// let data:any = structuredClone(formData);
			// if(Object.keys(data).includes('children')) delete data.children;
			// console.log("Form submitted:", data);
			// // Reset form after submission
			// // setFormData({});
			// // let result = await api.pages.list();
			// let result = await api.pages.create(data);
			// console.log('Result:', result);
			// window.location.href = '/login/dashboard/pages/edit/' + result.page[0].id;
			// setIsSubmitting(false);
		}
	};

	const updateUser = async () => {
		handleSubmit();

		if (Object.keys(errors.current).length === 0) {
			setIsSubmitting(true);
			// // Here you would typically send the form data to your backend
			let data:any = structuredClone(formData.user);
			if(Object.keys(data).includes('children')) delete data.children;
			console.log("Form submitted:", data);
			data.updated_at = (new Date()).toISOString();
			// // Reset form after submission
			// // setFormData({});
			let result = await api.users.update(data);
			// let result = await api.pages.update(data);
			console.log('Updated user result:', result);
			// setIframeSlug(`/${data.slug}?v=${new Date().getTime()}&preview=true`);
			// window.location.href = '/login/dashboard/users';
			setIsSubmitting(false);
			if(result.success == true && result.user[0].id!= null) alert('User has been updated!');
			else alert('Unable to update user account.')
		}
	};

	const deleteUser = async () => {
		// const confirmed = confirm("Are you sure you want to delete this page?");
  		// if (!confirmed) return;
		// let result = await api.pages.delete(Number(formData.id));
		// console.log('Result:', result);
		// window.location.href = '/login/dashboard/pages';
	};

	const checkAccess = (type: string) => {
		return access.list.some(obj => obj.type == type);
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
		if(existingAccess.success == true && (existingAccess.access == null || existingAccess.access.length == 0)){
			// create new access if not found
			let newAccess = await api.access.create({
				uid: user?.id,
				type,
				access_level: 'admin'
			});
			console.log('New Access', newAccess);
		} else {
			// delete access
			let removed = await api.access.delete({
				uid: user?.id,
				type,
			});
			console.log('Deleted Access', removed);
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
			<div>
			<List el="xsm" style={{color: 'white'}} >
					<Input
						label="Full Name"
						value={formData.user?.name || ''}
						onChange={(val) => handleUserChange("name", val)}
						error={errors.current.name}
						required
					/>
					<Input
						label="Gmail Account"
						value={formData.user?.email || ''}
						onChange={(val) => handleUserChange("email", val)}
						error={errors.current.email}
						required
					/>
					<Input
							as="select"
							label="Account Type"
							value={formData.user?.type || ''}
							onChange={(val) => handleUserChange("type", val)}
							error={errors.current.type}
							required
						>
							<option value="">Select one</option>
							<option value="admin">admin</option>
							<option value="staff">staff</option>
							<option value="student">student</option>
						</Input>
					<Input
							as="select"
							label="Group / Department"
							value={formData.user?.group || ''}
							onChange={(val) => handleUserChange("group", val)}
							error={errors.current.group}
							required
						>
							<option value="">Select one</option>
							<option value="accounting">Accounting</option>
							<option value="admission">Admission</option>
							<option value="board of directors">Board of Directors</option>
							<option value="campus">Campus</option>
							<option value="ceo">CEO</option>
							<option value="esol">ESOL</option>
							<option value="faculty">Faculty</option>
							<option value="leadership">Leadership</option>
							<option value="library">Library</option>
							<option value="outreach">Outreach</option>
							<option value="other">Other</option>
							<option value="IT">IT</option>
							<option value="staff">Staff</option>
							<option value="student">Student</option>
						</Input>
					<Input
						label="Job Title"
						value={formData.user?.job_title || ''}
						onChange={(val) => handleUserChange("job_title", val)}
						error={errors.current.job_title}
						required
					/>
					<Input
						label="Phone Number"
						value={formData.user?.phone || ''}
						onChange={(val) => handleUserChange("phone", val)}
						error={errors.current.phone}
						required
					/>
					<Input
							as="textarea"
							label="Notes"
							value={formData.user?.notes || ''}
							onChange={(val) => handleUserChange("notes", val)}
							error={errors.current.blocks}
							// style={{height: '300px'}}
						/>
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
		<div>
			<List el="sm">
				<Text color="white" font="bodyLBold">User Permissions</Text>
				<List el="xsm">
					<Input
						as="checkbox"
						label="View Sitemap"
						onChange={(val) => toggleAccess("sitemap", val)}
						defaultChecked={checkAccess('sitemap')}
					/>
					<Input
						as="checkbox"
						label="Create Pages"
						onChange={(val) => toggleAccess("pages", val)}
						defaultChecked={checkAccess('pages')}
					/>
					<Input
						as="checkbox"
						label="View Analytics"
						onChange={(val) => toggleAccess("analytics", val)}
						defaultChecked={checkAccess('analytics')}
						// checked={formData.user?.type == 'admin'}
					/>
					<Input
						as="checkbox"
						label="Create Business Cards"
						onChange={(val) => toggleAccess("business cards", val)}
						defaultChecked={checkAccess('business cards')}
						// checked={formData.user?.type == 'admin'}
					/>
					<Input
						as="checkbox"
						label="Manage Users"
						onChange={(val) => toggleAccess("users", val)}
						defaultChecked={checkAccess('users')}
						// checked={formData.user?.type == 'admin'}
					/>
				</List>
				{props.user?.id != null && <List el="column xsm">
					<Btn variant="secondaryWhite">Delete</Btn>
					<Btn onClick={updateUser}>Update</Btn>
				</List>}
				{props.user?.id == null && <List el="column xsm">
					<Btn>Create User</Btn>
				</List>}
			</List>
		</div>
	</div>
		
	</>
};

export default component;
