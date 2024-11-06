import "./styles.css";

type Props = React.HTMLAttributes<HTMLElement> & {
	src?: string;
	alt?: string;
};

const component = (props: Props) => {
	const { src, alt } = props;
	return <img className="imgBlock" src={src} alt={alt || "Image Block"} />;
};

export default component;
