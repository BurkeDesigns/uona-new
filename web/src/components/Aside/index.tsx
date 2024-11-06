import "./styles.css";
import type { ReactNode } from "react";
import Icon from "@components/Icon";
import List from "@components/List";
import { to } from "@util/navigation";

type Props = {
	children?: ReactNode;
};

const component = (props: Props) => {
	const { children } = props;

	return (
		<>
			{children && <aside el="aside">{children}</aside>}
			{!children && (
				<aside el="aside">
					<List el="between center">
						<List el="lg center">
							<Icon
								name="logo"
								size={65}
								onClick={() => to("/theme")}
							/>
							<List el="md center">
								{/* <Icon name="home" onClick={() => to("/")} /> */}
								<Icon
									name="image"
									onClick={() => to("/photos")}
								/>
							</List>
						</List>
						<List el="md center">
							<Icon
								name="settings"
								onClick={() => to("/settings")}
							/>
							<Icon name="logout" onClick={() => to("/logout")} />
						</List>
					</List>
				</aside>
			)}
		</>
	);
};

export default component;
