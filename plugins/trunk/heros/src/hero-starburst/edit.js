import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';
import { ImageControls } from './image';
export default function Edit({ attributes, setAttributes }) {
	const { h1, p, button, imgAlt, imgUrl, imgId } = attributes;
	return (
		<div {...useBlockProps()} className="toms-hero-starburst">
			<RichText
				tagName="h1"
				value={h1}
				onChange={(newH1) => setAttributes({ h1: newH1 })}
				className="toms-hero-starburst-headline"
				placeholder='This is the main argument of the page'

			/>
			<RichText
				tagName="p"
				value={p}
				onChange={(newP) => setAttributes({ p: newP })}
				className="toms-hero-starburst-supportingcopy"
				placeholder='This is the main supporting argument of the page'
			/>
			<RichText
				tagName="div"
				value={button}
				onChange={(newButton) => setAttributes({ button: newButton })}
				className='toms-hero-starburst-main-button'
				placeholder='16 characters'
			/>
			<ImageControls
				className='toms-hero-starburst-heroimage'
				src={imgUrl}
				alt={imgAlt}
				id={imgId}
				propNames={['imgUrl', 'imgAlt', 'imgId']}
				setAttributes={setAttributes}
				title='Hero Image'
				instructions='This is a main image shown in the page'
			/>
		</div>
	);
}
