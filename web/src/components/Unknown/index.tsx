import "./unknown.css";
// import Button from "@components/Button";
// import file from "bun";
// import * as MapBlock from "@components/BlockMapper/_BlockList";
// import { useSignal } from "@preact/signals-react";

function UnknownBlock(props: any) {
	const { _type, error } = props;

	return (
		<>
			<div className={`unknown ${error ? "error" : ""}`}>
				{!error && (
					<>
						<span>
							<b>UNKNOWN BLOCK TYPE:</b>
							{` "${
								_type || "unknown"
							}", run the syncBlocks script to add missing block types to the BlockMapper`}
						</span>
						<pre>
							<code>{JSON.stringify(props, null, 4)}</code>
						</pre>
					</>
				)}
				{error && (
					<>
						<span>
							<b>BLOCK ERROR:</b>
							{` "${
								_type || "unknown"
							}" encountered the following error:`}
						</span>
						<pre>
							<code>{`${error}`}</code>
						</pre>
						<span>
							<b>PROPS:</b>
							{` All component props:`}
						</span>
						<pre>
							<code>{JSON.stringify(props, null, 4)}</code>
						</pre>
					</>
				)}
			</div>
		</>
	);
}

export default UnknownBlock;
