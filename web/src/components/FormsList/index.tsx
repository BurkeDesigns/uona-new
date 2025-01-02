import List from "@components/List";
import "./styles.css";
import Icon from "@components/Icon";
import { to } from "@util/navigation";
import { formatTimeAgo } from "@util/dates";
import Text from "@components/Text";

type Props = {
	data?: any;
};

const component = (props: Props) => {
	const { data } = props;

	console.log('Data:', data);
	
	return <>
		{data.length > 0 && <table class="newsPages">
			<thead>
				<th>Date</th>
				<th>Form</th>
				<th>Student ID</th>
				<th>Name</th>
				<th>Birthday</th>
				<th>Reason For Waiver</th>
				{/* <th>Files</th> */}
				{/* <th>Actions</th> */}
			</thead>
			<tbody>
				{data.map(item=> (<tr key={item.id} onClick={()=> to(`/login/dashboard/forms/edit/${item.id}`)}>
				{/* {data.map(item=> (<tr key={item.id}> */}
					{item.created_at && <td>{formatTimeAgo(item.created_at)}</td>}
					{/* {item.title && <td>{item.title}</td>} */}
					{item.status && <td>
						<List el="column xsm center">
							{item.title}
							{/* {item.status == 'submitted' && <div class="status-badge status-inactive">{item.status}</div>} */}
							{['approved'].includes(item.status) && <div class="status-badge status-active">{item.status}</div>}
							{['denied'].includes(item.status) && <div class="status-badge status-error">{item.status}</div>}
							{['reviewing'].includes(item.status) && <div class="status-badge status-archived">{item.status}</div>}
							{!['reviewing', 'denied', 'approved'].includes(item.status) && <div class="status-badge status-inactive">{item.status}</div>}
						</List>
					</td>}
					{item.data.student_id && <td>{item.data.student_id}</td>}
					{item.data.name && <td>{item.data.name}</td>}
					{item.data.birthday && <td>{item.data.birthday}</td>}
					{item.data.reason_for_waiver && <td>{item.data.reason_for_waiver}</td>}
					{/* {item.data.uploaded_files && <td>{item.data.uploaded_files.join(', ')}</td>} */}
					{/* <td>
						<List el="column center xsm">
							<Icon name="file" />
						</List>
					</td> */}
				</tr>))}
			</tbody>
		</table>}
		{data.length == 0 && <>
			<br />
			<Text content="No form responses found." color="white" />
		</>}
	</>
};

export default component;
