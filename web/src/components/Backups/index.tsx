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
		<div className="backupList">
			{data.length > 0 && <table class="userList">
				<thead>
					<tr>
						<th>Backup Name</th>
						<th>Size</th>
						<th>Created At</th>
						{/* <th>Actions</th> */}
					</tr>
				</thead>
				<tbody>
					{data.map(item=> (<tr key={item.name}>
						<td>{item.name || ''}</td>
						<td>{item.size || ''}</td>
						<td>{formatTimeAgo(item.timestamp) || ''}</td>
						{/* <td>RESTORE</td> */}
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
				<Text content="No backups found. Create a new backup to get started!" color="white" />
			</>}
		</div>
	</>
};

export default component;
