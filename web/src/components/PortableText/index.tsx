import Text from "@components/Text";
import Link from "@components/Link";
import { PortableText } from "@portabletext/react";
import { mapLink } from "@util/mapping";

const component = (body: any): JSX.Element => {
	const content = body.body;
	if (body == null || content == null) return <></>;

	const portableTextComponents: any = {
		types: {
			image: ({ value }) => <img src={value.imageUrl} />,
			callToAction: ({ value, isInline }) =>
				isInline ? (
					<a href={value.url}>{value.text}</a>
				) : (
					<div className="callToAction">{value.text}</div>
				),
		},
		marks: {
			em: ({ children }) => <em>{children}</em>,
			strong: ({ children }) => <b>{children}</b>,
			underline: ({ children }) => <u>{children}</u>,
			link: ({ children, value }) => {
				const url = mapLink(value.link);
				return <Link href={url}>{children}</Link>;
			},
		},
		block: {
			// customizing common block types
			h1: ({ children }) => <Text as="h1">{children}</Text>,
			h2: ({ children }) => <Text as="h2">{children}</Text>,
			h3: ({ children }) => <Text as="h3">{children}</Text>,
			h4: ({ children }) => <Text as="h4">{children}</Text>,
			h5: ({ children }) => <Text as="h5">{children}</Text>,
			h6: ({ children }) => <Text as="h6">{children}</Text>,
			normal: ({ children }) => <Text>{children}</Text>,
			body_m: ({ children }) => <Text>{children}</Text>,
			body_l: ({ children }) => <Text font="bodyL">{children}</Text>,
			body_s: ({ children }) => <Text font="bodyS">{children}</Text>,
			eyebrow: ({ children }) => <Text font="eyebrow">{children}</Text>,
		},
	};

	return <PortableText value={content} components={portableTextComponents} />;
};

export default component;
