import List from "@components/List";
import Btn from "@components/Button";
import Text from "@components/Text";
// import "./styles.css";
// import "./pageEditor.css";
import Icon from "@components/Icon";
import { useState, useEffect } from "react";
import Input from "@components/Input";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'

type FormData = {
	user?: any;
	access?: any;
};

const component = (props: FormData) => {
	// const { user, access } = props;

	const [formData, setFormData]:any = useState({});


	const handleChange = (key: string, value: string | boolean) => {
		setFormData((prev) => {
			let data = structuredClone(prev);
			data[key] = value;
			return data;
		});
	};

	return <>
	<div className="studentForm">
			<List el="xsm" style={{color: 'black'}}>
					<Input
						name="student_id"
						label="Student ID"
						value={formData.student_id || ''}
						onChange={(val) => handleChange("student_id", val)}
						// error={errorState.student_id}
						required
					/>
			</List>
			
	</div>
	<div className="flex">
		{![null, undefined, ''].includes(formData.student_id) && <>
			<Btn url={`https://buy.stripe.com/aEU29S0cbfaqgwM289?client_reference_id=${formData.student_id}`}>Pay Now</Btn>
		</>}
		{[null, undefined, ''].includes(formData.student_id) && <>
			<Btn disabled>Pay Now</Btn>
		</>}
	</div>
	</>
};

export default component;
