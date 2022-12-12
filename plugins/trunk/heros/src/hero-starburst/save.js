import { useBlockProps } from '@wordpress/block-editor';
import DOMPurify from 'dompurify';
export default function save({ attributes }) {
	const { h1, p, button, imgAlt, imgUrl } = attributes;
	return (
		<div {...useBlockProps.save()} className="toms-hero-starburst">
			<h1 className="toms-hero-starburst-headline" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(h1) }} />
			{imgUrl && <img className='toms-hero-starburst-heroimage' src={imgUrl} alt={imgAlt} />}
			<p className="toms-hero-starburst-supportingcopy" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p) }} />
			<button className='toms-hero-starburst-main-button' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(button) }} />
		</div>
	);
}
