import "./styles.css";
import type { ReactNode } from "react";
import Icon from "@components/Icon";
import List from "@components/List";
import { to } from "@util/navigation";
import { Avatar } from "@components/BlockMapper/_BlockList";
// import { Avatar } from "@components/BlockMapper/_BlockList";
// import { useEffect } from "react";
// import { useState } from "react";
import API from "@util/api";
import {deleteRequest, get, patch, post} from '@util/fetch'


type Props = {
	children?: ReactNode;
	currentPage?: string;
	session?: any;
};

const component = (props: Props) => {
	const { children, currentPage, session } = props;
	// let [logOut, setLogOut]: any = useState(null);
	console.log("SESSION", session);

	// let api = new API('http://localhost:3008');

	(async ()=> {
		let base = 'http://localhost:3006';
		let test = await post(`${base}/api/protected`, {
			test: 'hello world!',
		});

		console.log('TEST', test);
	})();


	return (
		<>
			{children && (
				<aside el="aside">
					<List el="between center">{children}</List>
				</aside>
			)}
			{!children && (
				<aside el="aside">
					<List el="between center">
						<List el="lg center">
							{/* <Icon
								name="brandmark"
								size={65}
								onClick={() => to("/theme")}
							/> */}
							<Avatar shape="circle" url="/login/dashboard" src={session?.user?.image} name={session?.user?.name} />
							{/* <Icon name="home" onClick={() => to("/")} /> */}
							<List el="md">
							<Icon
								name="server"
								onClick={() => to("/login/dashboard/website")}
								variant="white-hover"
								title="Sitemap"
							/>
							<Icon
								name="newspaper"
								onClick={() => to("/login/dashboard/pages")}
								variant="white-hover"
								title="Website Pages"
							/>
							{/* <Icon
								name="folder"
								onClick={() => to("/login/dashboard/files")}
								variant="white-hover"
							/> */}
							<Icon
								name="trending-up"
								onClick={() => to("/login/dashboard/analytics")}
								variant="white-hover"
								title="Analytics"
							/>
							<Icon
								name="badge"
								onClick={() => to("/login/dashboard/cards")}
								variant="white-hover"
								title="Business Cards"
							/>
							<Icon
								name="person"
								onClick={() => to("/login/dashboard/users")}
								variant="white-hover"
								title="User Management"
							/>
							<Icon
								name="edit-note"
								onClick={() => to("/login/dashboard/forms")}
								variant="white-hover"
								title="Forms"
							/>
							</List>
						</List>
						<List el="md center">
							<Icon
								name="settings"
								onClick={() => to("/login/dashboard/settings")}
								title="Settings"
							/>
							<Icon
								name="logout"
								title="Logout"
								onClick={() => {
									window.signOut();
									// window.location.href = "/login";
								}}
							/>
						</List>
					</List>
				</aside>
			)}
		</>
	);
};

export default component;
