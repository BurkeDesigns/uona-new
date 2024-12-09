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
		{data.length > 0 && <table class="userList">
			<thead>
				<th>Name</th>
				<th>Type</th>
				<th>Group</th>
				<th>Email</th>
				<th>Created At</th>
				{/* <th>Actions</th> */}
			</thead>
			<tbody>
				{data.map(item=> (<tr key={item.id} onClick={()=> to(`/login/dashboard/users/edit/${item.id}`)}>
					<td>{item.name || ''}</td>
					<td>{item.type || ''}</td>
					<td>{item.group || ''}</td>
					<td>{item.email || ''}</td>
					<td>{formatTimeAgo(item.created_at) || ''}</td>
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
			<Text content="No users found. Create a new user to get started!" color="white" />
		</>}
	</>
};

export default component;
