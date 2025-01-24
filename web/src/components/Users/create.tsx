import List from "@components/List";
import Btn from "@components/Button";
import Text from "@components/Text";
import "./styles.css";
import "./pageEditor.css";
import { useState } from "react";
import Input from "@components/Input";
import { useRef } from "react";
import API from "@util/api";
import type { NewUser } from "../../../../api/db/types";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
	<Text color="white">Paragraph</Text>
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
			</List>
			</div>
		<div>
			<List el="sm">
				{user!= null && <Text color="white" font="bodyLBold">User Permissions</Text>}
				{user != null && <List el="xsm">
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
					<Input
						as="checkbox"
						label="Manage Forms"
						onChange={(val) => toggleAccess("forms", val)}
						defaultChecked={checkAccess('forms')}
						// checked={formData.user?.type == 'admin'}
					/>
				</List>}
				{props.user?.id != null && <List el="column xsm">
					<Btn variant="secondaryWhite" onClick={deleteUser}>Delete</Btn>
					<Btn onClick={updateUser}>Update</Btn>
				</List>}
				{props.user?.id == null && <List el="column xsm">
					<Btn onClick={createUser}>Create User</Btn>
				</List>}
			</List>
		</div>
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
