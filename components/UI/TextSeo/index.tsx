import { FC } from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface Props {
	description: string;
}

const TextSeo: FC<Props> = ({ description })=> {
	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString);
		return (
			<div
				className='mt-20 mb-24 px-2'
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return <HtmlContent htmlString={ description } />
}

export default TextSeo;
