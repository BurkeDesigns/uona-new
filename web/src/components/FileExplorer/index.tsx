import "./styles.css";
// import { Link, Text } from "@blocks";
import Link from "@components/Link";
import Text from "@components/Text";
import Icon from "@components/Icon";
import List from "@components/List";



const component = (props: any) => {
	// const {
	// 	variant,
	// 	label,
	// 	url,
	// 	onClick,
	// 	customclass,
	// 	disabled,
	// 	children,
	// 	rightIcon,
	// 	leftIcon,
	// } = props;
	// const style = variant || "primary";

	return (
		<>
			<div id="fileExplorer">
      <div className="folders">
        <List el="column xxsm" className="folder" title="Logos">
          <Icon name="folder" />
          <Text color="currentColor" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'}}>Logos</Text>
        </List>
        <List el="column xxsm" className="folder" title="Documents">
          <Icon name="folder" />
          <Text color="currentColor" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'}}>Documents</Text>
        </List>
      </div>
      <div className="files">
        <div className="file">
          <img src="/images/esports@400.jpg" alt="esports@400.jpg" title="esports@400.jpg" />
        </div>
      </div>
    </div>
		</>
	);
};

export default component;

