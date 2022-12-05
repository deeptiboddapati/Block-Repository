/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {
	return (
		<div {...useBlockProps.save()} className='toms-hero-a'>
			<h1 className='toms-hero-a-headline'>Welcome to the total management of your economy.</h1>
			<img className='toms-hero-a-heroimage' src='https://via.placeholder.com/344X665' />
			<p className='toms-hero-a-supportingcopy'>Meet the new online banking. Access to your personalized digital card and pay for your day-to-day purchases with total flexibility.</p>
			<button className='toms-hero-a-ctabutton'>Start Now</button>
			<img className='toms-hero-a-marketplaceimageone' src='https://via.placeholder.com/116X32' />
			<img className='toms-hero-a-marketplaceimagetwo' src='https://via.placeholder.com/116X32' />
		</div>
	);
}
