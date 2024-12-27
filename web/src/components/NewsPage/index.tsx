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
	slug?: string;
	status?: string;
	type?: string;
	group?: string;
	author?: string;
	title?: string;
	description?: string;
	blocks?: any;
	expires?: string;
};

const component = (props: FormData) => {
	// const { data } = props;

	const [formData, setFormData] = useState(props);
	const [iframeSlug, setIframeSlug] = useState(props.slug? `/${props.slug}?preview=true` : '/');

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
			switch (name) {
				case 'slug': 
					if (value == '') errors.current.slug = "Slug is required";
					break;
			}
			console.log('Errors:', errors.current);
			return newData;
		});
	};

	const handleBlockChange = (blockIndex: string | number, key: string, value: string | boolean) => {
		setFormData((prev) => {
			let newData = structuredClone(prev);
			newData.blocks[blockIndex][key] = value;
			return newData;
		});
	};

	const addBlock = (data) => {
		setFormData((prev) => {
			let blocks = prev.blocks || [];
			let newData = {
				...prev,
				blocks: [...blocks, data],
			};
			return newData;
		});
	};

	const addMarkdown = () => {
		addBlock({
			id: nanoid(),
			type: 'markdown',
			content: '',
		});
	};

	const handleSubmit = async () => {
		if (formData.slug == null || formData.slug == '') errors.current.slug = "Slug is required";
		if (formData.status == null || formData.status == '') errors.current.status = "Status is required";
		if (formData.author == null || formData.author == '') errors.current.author = "author is required";
		if (formData.title == null || formData.title == '') errors.current.title = "title is required";
		if (formData.description == null || formData.description == '') errors.current.description = "description is required";
		if (formData.blocks == null || formData.blocks == '') errors.current.blocks = "content is required";

		console.log("Errors:", errors.current);
	};

	const createPage = async () => {
		handleSubmit();

		if (Object.keys(errors.current).length === 0) {
			setIsSubmitting(true);
			// Here you would typically send the form data to your backend
			let data:any = structuredClone(formData);
			if(Object.keys(data).includes('children')) delete data.children;
			console.log("Form submitted:", data);
			// Reset form after submission
			// setFormData({});
			// let result = await api.pages.list();
			let result = await api.pages.create(data);
			console.log('Result:', result);
			window.location.href = '/login/dashboard/pages/edit/' + result.page[0].id;
			setIsSubmitting(false);
		}
	};


	const updatePage = async () => {
		handleSubmit();

		if (Object.keys(errors.current).length === 0) {
			setIsSubmitting(true);
			// Here you would typically send the form data to your backend
			let data:any = structuredClone(formData);
			if(Object.keys(data).includes('children')) delete data.children;
			console.log("Form submitted:", data);
			data.updated_at = (new Date()).toISOString();
			// Reset form after submission
			// setFormData({});
			// let result = await api.pages.list();
			// toast("Updating page...");
			const toastId = toast.loading("Updating page...");
			let result = await api.pages.update(data);
			if(result.success == true && result?.page?.length > 0) toast.update(toastId, { render: "Updated page", type: "success", isLoading: false, autoClose: 1500 });
			else toast.update(toastId, { render: "Failed to update page", type: "error", isLoading: false, autoClose: 3000 });
			
			console.log('Result:', result);
			setIframeSlug(`/${data.slug}?v=${new Date().getTime()}&preview=true`);
			// window.location.href = '/login/dashboard/pages';
			setIsSubmitting(false);
		}
	};

	const deletePage = async () => {
		const confirmed = confirm("Are you sure you want to delete this page?");
  		if (!confirmed) return;
		let result = await api.pages.delete(Number(formData.id));
		console.log('Result:', result);
		window.location.href = '/login/dashboard/pages';
	};

	const aiPrompt = async (e: any, blockIndex: string | number, key: string) => {
		e.preventDefault();
    	e.stopPropagation();

		const inputElement:any = document.querySelector('#input0');
		// if (!inputElement) return;
		const selectedText = inputElement.value.substring(
			inputElement.selectionStart,
			inputElement.selectionEnd
		);

		const beforeText = inputElement.value.substring(0, inputElement.selectionStart);
      	const afterText = inputElement.value.substring(inputElement.selectionEnd);

		if (!selectedText) return alert("No text selected.");

		// console.log(inputElement.selectionStart, inputElement.selectionEnd, selectedText);

		const instructions = prompt("Send text selection to ChatGPT for rewrite. What additional instructions do you want to give ChatGPT?");
		// if (!instructions) return;

		const p = `Use the instructions to rewrite this website markdown content. Only output the new markdown content. If no instructions are provided, then rewrite it to be concise, easy to understand, and exciting.
			<instructions>${instructions}</instructions>
			<content>${selectedText}</content>
		`;

		const toastId = toast.loading("AI writing content...");

		let result = await api.ai.chat({prompt: p})
		console.log(result);

		if(result.success == true && result?.msg != '') toast.update(toastId, { render: "AI added content!", type: "success", isLoading: false, autoClose: 1500 });
		else toast.update(toastId, { render: "AI content failed", type: "error", isLoading: false, autoClose: 3000 });

		let modifiedText = result.msg;

      inputElement.value = `${beforeText}${modifiedText}${afterText}`;

	  setFormData((prev) => {
		let newData = structuredClone(prev);
		newData.blocks[blockIndex][key] = `${beforeText}${modifiedText}${afterText}`;
		return newData;
	});

	};

	console.log('Form Data:', formData);

	
	return <>
	<div className="pageEditor">
			<div>
			<List el="xsm" style={{color: 'white'}} >
					<Input
						label="Slug"
						value={formData.slug}
						onChange={(val) => handleInputChange("slug", val)}
						error={errors.current.slug}
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
					</List>

					<Input
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
						{block.type == 'markdown' && <>
							{/* <Input
								as="select"
								label="variant"
								value={block.variant}
								onChange={(val) => handleBlockChange(index, "variant", val)}
								error={errors.current.blocks}
								required
							>
								<option value="">Select one</option>
								<option value="blue">Blue Background</option>
								<option value="yellow">Yellow Background</option>
							</Input> */}
							<Input
								as="textarea"
								label="Markdown Content"
								value={block.content}
								onChange={(val) => handleBlockChange(index, "content", val)}
								error={errors.current.blocks}
								style={{height: '300px'}}
								id={`input${index}`}
								required
							/>
							<Icon name="draw" onClick={(e)=>aiPrompt(e, index, "content")} />
						</>}
					</>
					)}

					

					{/* <Input
						label="First Name"
						name="first_name"
						value={formData.first_name}
						onChange={() => handleInputChange("first_name")}
						error={errors.first_name}
						required
					/> */}
					{props.id == null && <div>
						{isSubmitting != true && <Btn onClick={createPage}>Create Page</Btn>}
						{isSubmitting == true && <Btn disabled>Creating Page...</Btn>}
					</div>}
					{props.id != null && <List el="column xxsm">
						<Btn onClick={deletePage} variant="secondaryWhite">Delete</Btn>
						{isSubmitting != true && <Btn onClick={updatePage}>Update Page</Btn>}
						{isSubmitting == true && <Btn disabled>Updating...</Btn>}
					</List>}
					<Link href="https://www.markdownguide.org/basic-syntax/" style={{color:'#2facee'}}>Markdown Guide HERE</Link>
					<Link href={`https://uona.swaggear.life/${formData.slug}`} style={{color:'#2facee'}}>Open Public Page</Link>
			</List>
			</div>
		<iframe src={iframeSlug} frameBorder="0"></iframe>
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
