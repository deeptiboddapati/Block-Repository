import { useBlockProps } from '@wordpress/block-editor';
export default function save({ attributes }) {
	const {
		firstImageUrl,
		firstImageAlt,
		secondImageUrl,
		secondImageAlt,
	} = attributes;
	return (
		<div {...useBlockProps.save()}>
			<img src={firstImageUrl} alt={firstImageAlt} className='firstImage' />
			<img src={secondImageUrl} alt={secondImageAlt} className='secondImage' />
		</div>
	);
}