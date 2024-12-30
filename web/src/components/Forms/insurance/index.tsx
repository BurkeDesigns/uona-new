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
import type { NewUser } from "../../../../../api/db/types";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'
import reCAPTCHA from "@components/Recapacha";
import { postForm } from "@util/fetch";

type FormData = {
	user?: any;
	access?: any;
};

const component = (props: FormData) => {
	// const { user, access } = props;

	const [formData, setFormData]:any = useState({});
	const [formStatus, setFormStatus]:any = useState('');

	const fileInput: any = useRef(null);

	const errors:any = useRef({});
	const [errorState, setErrorState]:any = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	let api = new API();

	let recapacha = {
		siteKey: '6LeDe6cqAAAAAPk9JEI0RyumaEmaO4Efd_zQm2cP',
	};

	

	// const handleInputChange = (name: string, value: string | boolean) => {
	// 	setFormData((prev) => {
	// 		let newData = {
	// 			...prev,
	// 			[name]: value,
	// 		};
	// 		delete errors.current[name];
	// 		switch (name) {
	// 			case 'slug': 
	// 				if (value == '') errors.current.slug = "Slug is required";
	// 				break;
	// 		}
	// 		console.log('Errors:', errors.current);
	// 		return newData;
	// 	});
	// };

	const handleChange = (key: string, value: string | boolean) => {
		setFormData((prev) => {
			let data = structuredClone(prev);
			data[key] = value;
			return data;
		});
	};

	const validateFields = (data) => {
		errors.current = {};
		setErrorState(errors.current);

		let files = fileInput.current.files;
		let uploadCount = Array.from(files).length;

		if ([undefined, null, ''].includes(data.name)) errors.current.name = "Name is required";
		if ([undefined, null, ''].includes(data.student_id)) errors.current.student_id = "Student ID is required";
		if ([undefined, null, ''].includes(data.birthday)) errors.current.birthday = "Birthday is required";
		if ([undefined, null, ''].includes(data.confirm_waiver)) errors.current.confirm_waiver = "Confirm Waiver is required";
		if (data.confirm_waiver == 'yes' && uploadCount == 0) {
			errors.current.uploaded_files = "Uploading proof of insurance is required";
			toast("Error: Uploading proof of insurance is required", {type:'error'});
		}

		setErrorState(errors.current);
		console.log('errors', errors.current);

		if(Object.keys(errors.current).length > 0) return false;
		return true;
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		setFormStatus('submitting');
		const toastId = toast.loading("Validating form...");
		try {
			event.preventDefault(); // Explicitly prevent page reload
		
			const formData = new FormData(event.currentTarget);
			// const query = formData.get("query");

			let obj:any = {};
			for (const pair of formData.entries()) {
				const [key, val] = pair;
				obj[key] = val;
				console.log(key, val);
			}
			console.log(obj);
			let isValid = validateFields(obj);

			if(isValid == false) {
				setFormStatus('');
				return toast.update(toastId, { render: "Form errors found", type: "error", isLoading: false, autoClose: 3000 });
			}

			toast.update(toastId, { render: "Checking for bots...", type: "info", isLoading: true, autoClose: 1500 });
			const recaptchaTest = new reCAPTCHA(recapacha.siteKey, "submit");
			let token: string = await recaptchaTest.getToken();
			let test = await api.verifyRecapacha({token, action: 'submit'});
			if(test.isValid == false) return toast.update(toastId, { render: "ERROR: Bot detected", type: "error", isLoading: false, autoClose: 3000 });

			toast.update(toastId, { render: "Submitting form...", type: "info", isLoading: true, autoClose: 1500 });
			// send data to backend
			// upload files
			let fileList;
			if(obj.uploaded_files != null){
				fileList = await uploadSelectedFiles();
				fileList = fileList.map(item =>{
					return item.file[0].id;
				});
				if(fileList.some(item=> item == null)) return toast.update(toastId, { render: "ERROR: File upload failed. Please try again.", type: "error", isLoading: false, autoClose: 3000 });


				console.log('fileList', fileList);
				obj.uploaded_files = fileList;
			}


			let result = await api.formResponse.create({
				form: 1,
				data: obj,
			});

			if(result.success == false || result.data[0].id == null) {
				setFormStatus('');
				return toast.update(toastId, { render: "An error occured: please notify the staff", type: "error", isLoading: false, autoClose: 3000 });
			} else{
				// reset form or show thank you
				setFormData({});
				errors.current = {};
				setErrorState(errors.current);
			}
			// console.log('RESULT', result);
			// console.log('TOKEN',token, test);
		} catch (error) {
			setFormStatus('');
			return toast.update(toastId, { render: "An error occured: please notify the staff", type: "error", isLoading: false, autoClose: 3000 });
		}

		setFormStatus('');
		return toast.update(toastId, { render: "Submitted form!", type: "success", isLoading: false, autoClose: 1500 });
	};

	const uploadSelectedFiles = async () => {
		let files = fileInput.current.files;
		// console.log(fileInput.current.files);

		let uploadCount = Array.from(files).length;

		// setUploadStatus(`Uploading ${uploadCount} Photos`);

		// Create an array of promises to upload each file
		const uploadPromises = Array.from(files).map(async (file: any) => {
			const formData: any = new FormData();
			// formData.append("uid", session.user.id);
			formData.append("group", 'test');
			formData.append("file", file);
			formData.append("name", file.name);
			formData.append("size", file.size);
			formData.append("type", file.type);
			formData.append("lastModified", file.lastModified);

			const toastId = toast.loading(`Uploading ${file.name}...`);

			// Upload the file
			let res = await api.formResponse.uploadFile(formData);
			console.log("Uploaded file", res);

			if(res.success == false) toast.update(toastId, { render: res.msg, type: "error", isLoading: false, autoClose: 3000 });

			uploadCount--;

			// setUploadStatus(`Uploading ${uploadCount} Photos...`);
			if(res.success == true) toast.update(toastId, { render: `Uploaded ${file.name}`, type: "success", isLoading: false, autoClose: 1500 });

			// // Update the photos state after each file upload
			// setPhotos((val) => {
			// 	let set = new Set([file.name, ...val]);
			// 	return Array.from(set); // Add the uploaded file name to the photos array
			// });

			return res; // Return the response to include in the promise array
		});

		try {
			// Wait for all the upload promises to complete
			let result = await Promise.all(uploadPromises);
			console.log("All uploads completed");
			toast({ render: "All file uploads completed", type: "success", isLoading: false, autoClose: 1500 });
			// setUploadStatus("");
			fileInput.current.value = "";

			return result;

			// Once all uploads are done, call listPhotos
			// listPhotos();
		} catch (error) {
			toast({ render: "Error: Unable to upload files", type: "error", isLoading: false, autoClose: 3000 });
			console.error("Error during file upload:", error);
			return {
				success: false,
				error,
			}
		}
	};
	
	return <>
	<form onSubmit={handleSubmit} className="studentForm">
			<List el="xsm" style={{color: 'white'}}>
					<Input
						name="name"
						label="Full Name"
						value={formData.name || ''}
						onChange={(val) => handleChange("name", val)}
						error={errorState.name}
						required
					/>
					<Input
						name="student_id"
						label="Student ID"
						value={formData.student_id || ''}
						onChange={(val) => handleChange("student_id", val)}
						error={errorState.student_id}
						required
					/>
					<Input
						name="birthday"
						label="Date of Birth"
						type="date"
						value={formData.birthday || ''}
						onChange={(val) => handleChange("birthday", val)}
						error={errorState.birthday}
						required
					/>
						<Input
							as="select"
							name="confirm_waiver"
							label="Confirm Waiver"
							value={formData.confirm_waiver || ''}
							onChange={(val) => handleChange("confirm_waiver", val)}
							error={errorState.confirm_waiver}
							required
						>
							<option value="">Select one</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</Input>
						<label>
							<Text color="white" font="bodyMBold">Upload proof of insurance *</Text>
							{/* <input type="file" name="uploaded_files" /> */}
							<input
								id="files"
								type="file"
								name="uploaded_files"
								ref={fileInput}
								// onChange={uploadSelectedFiles}
								accept=".jpg,.jpeg,.svg,.png,.webp,.avif,.gif,.webp,.pdf,.docx"
								multiple
							/>
						</label>
						<div>
						{formStatus == '' && <Btn type="submit">Submit Waiver</Btn>}
						{formStatus == 'submitting' && <Btn disabled>Submitting form...</Btn>}
						</div>
			</List>
	</form>
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
