import UnknownBlock from "../Unknown";
import MapBlock from "./_BlockMap";

export const MapComponents = ({ blocks }: { blocks: any[] | undefined }) => {
	try {
		if (!blocks) return;
		const components = blocks.map((block, index) => {
			try {
				if (!block) return;
				const name = block._type || "unknown";
				const Component = MapBlock[name] || UnknownBlock;
				return <Component key={block._id || index} {...block} />;
			} catch (error) {
				console.error(
					`--- BlockMapper Error for "${block._type || "unknown"}": `,
					error
				);
				return (
					<UnknownBlock
						key={block._id || index}
						{...block}
						error={error}
					/>
				);
			}
		});
		return <>{components}</>;
	} catch (error) {
		console.error(`--- BlockMapper Unknown Error: `, error);
		return <UnknownBlock {...blocks} />;
	}
};

export default MapComponents;
