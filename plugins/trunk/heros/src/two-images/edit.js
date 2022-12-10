import { useBlockProps, MediaPlaceholder } from '@wordpress/block-editor';
import './editor.scss';
import { ImageControls } from './image';
import { useState } from '@wordpress/element';
export default function Edit({ attributes, setAttributes }) {
	const [showEditButtonFirstImage, setShowEditButtonFirstImage] = useState();
	const [showEditButtonSecondImage, setShowEditButtonSecondImage] = useState();
	const {
		firstImageUrl,
		firstImageAlt,
		firstImageId,
		secondImageUrl,
		secondImageAlt,
		secondImageId
	} = attributes;
	const handleSelect = (arg, propUrl, propAlt, propId) => {
		var args = {}
		args[propUrl] = arg.url;
		args[propAlt] = arg.alt;
		args[propId] = arg.id;
		setAttributes(args)
	}
	const clearImage = (propUrl, propAlt, propId) => {
		var args = {}
		args[propUrl] = undefined;
		args[propAlt] = "";
		args[propId] = undefined;
		setAttributes(args)
	}
	const handleImageClick = (imageVar, imageSetState) => {
		imageSetState(!imageVar);
	}
	console.log(
		<ImageControls
			className='firstImage'
			src={firstImageUrl}
			alt={firstImageAlt}
			id={firstImageId}
			propNames={['firstImageUrl', 'firstImageAlt', 'firstImageId']}
			setAttributes={setAttributes}
			title='First Image'
			instructions='This is the main image of the section'
		/>)
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
