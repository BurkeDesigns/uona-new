import "./styles.css";
import type { ReactNode } from "react";
import Icon from "@components/Icon";
import List from "@components/List";
import { to } from "@util/navigation";
import { Avatar } from "@components/BlockMapper/_BlockList";
// import { Avatar } from "@components/BlockMapper/_BlockList";
// import { useEffect } from "react";
// import { useState } from "react";

type Props = {
	children?: ReactNode;
	currentPage?: string;
};

const component = (props: Props) => {
	const { children, currentPage } = props;
	// let [logOut, setLogOut]: any = useState(null);
	// console.log("SESSION", session.user);

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
							<Avatar shape="circle" url="/login/dashboard" />
							{/* <Icon name="home" onClick={() => to("/")} /> */}
							<List el="md">
							<Icon
								name="server"
								onClick={() => to("/login/dashboard/website")}
								variant="white-hover"
							/>
							<Icon
								name="folder"
								onClick={() => to("/login/dashboard/files")}
								variant="white-hover"
							/>
							<Icon
								name="trending-up"
								onClick={() => to("/login/dashboard/analytics")}
								variant="white-hover"
							/>
							<Icon
								name="person"
								onClick={() => to("/login/dashboard/users")}
								variant="white-hover"
							/>
							<Icon
								name="badge"
								onClick={() => to("/login/dashboard/cards")}
								variant="white-hover"
							/>
							<Icon
								name="newspaper"
								onClick={() => to("/login/dashboard/news")}
								variant="white-hover"
							/>
							</List>
						</List>
						<List el="md center">
							<Icon
								name="settings"
								onClick={() => to("/login/dashboard/settings")}
							/>
							<Icon
								name="logout"
								onClick={() => {
									window.location.href = "/login";
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
