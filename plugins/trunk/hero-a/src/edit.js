/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {

	console.log(useBlockProps())
	return (
		<div {...useBlockProps()} className='toms-hero-a'>
			<h1 className='toms-hero-a-headline'>Welcome to the total management of your economy.</h1>
			<img className='toms-hero-a-heroimage' src='https://via.placeholder.com/344X665' />
			<p className='toms-hero-a-supportingcopy'>Meet the new online banking. Access to your personalized digital card and pay for your day-to-day purchases with total flexibility.</p>
			<button className='toms-hero-a-ctabutton'>Start Now</button>
			<img className='toms-hero-a-marketplaceimageone' src='https://via.placeholder.com/116X32' />
			<img className='toms-hero-a-marketplaceimagetwo' src='https://via.placeholder.com/116X32' />
		</div>
	);
}
