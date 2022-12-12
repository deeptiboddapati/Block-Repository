import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { ImageControls } from './image';
export default function Edit({ attributes, setAttributes }) {
	const {
		firstImageUrl,
		firstImageAlt,
		firstImageId,
		secondImageUrl,
		secondImageAlt,
		secondImageId
	} = attributes;
	return (
		<div {...useBlockProps()}>
			<ImageControls
				className='firstImage'
				src={firstImageUrl}
				alt={firstImageAlt}
				id={firstImageId}
				propNames={['firstImageUrl', 'firstImageAlt', 'firstImageId']}
				setAttributes={setAttributes}
				title='First Image'
				instructions='This is the main image of the section'
			/>
			<ImageControls
				className='secondImage'
				src={secondImageUrl}
				alt={secondImageAlt}
				id={secondImageId}
				propNames={['secondImageUrl', 'secondImageAlt', 'secondImageId']}
				setAttributes={setAttributes}
				title='Second Image'
				instructions='This is a secondary image shown less prominently in the hero'
			/>
		</div>
	);
}