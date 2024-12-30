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
				<th>Slug</th>
				<th>Title</th>
				<th>Author</th>
				{/* <th>Actions</th> */}
			</thead>
			<tbody>
				{data.map(item=> (<tr key={item.id} onClick={()=> to(`/login/dashboard/pages/edit/${item.id}`)}>
					{item.created_at && <td>{formatTimeAgo(item.created_at)}</td>}
					{item.slug && <td>{item.slug}</td>}
					{item.title && <td>
						<List el="column xsm center">
							{item.title}
							{item.status == 'draft' && <div class="status-badge status-inactive">{item.status}</div>}
							{item.status == 'published' && <div class="status-badge status-active">{item.status}</div>}
							{item.status == 'archived' && <div class="status-badge status-archived">{item.status}</div>}
						</List>
					</td>}
					{item.author && <td>{item.author}</td>}
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
			<Text content="No pages found. Create a new page to get started!" color="white" />
		</>}
	</>
};

export default component;
