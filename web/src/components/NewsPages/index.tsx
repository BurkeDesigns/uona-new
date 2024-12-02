import List from "@components/List";
import "./styles.css";
import Icon from "@components/Icon";

type Props = {
	data?: any;
};

const component = (props: Props) => {
	const { data } = props;
	
	return <>
		<table class="newsPages">
			<thead>
				<th>Date</th>
				<th>Title</th>
				<th>Author</th>
				<th>Actions</th>
			</thead>
			<tbody>
				{data.map(item=> (<tr key={item._id}>
					{item.created_at && <td>{item.created_at}</td>}
					{item.title && <td>
						<List el="column xsm center">
							{item.title}
							<div class="status-badge status-active">{item.status}</div>
						</List>
					</td>}
					{item.author && <td>{item.author}</td>}
					<td>
						<List el="column center xsm">
							<Icon name="file" />
						</List>
					</td>
				</tr>))}
			</tbody>
		</table>
	</>
};

export default component;
