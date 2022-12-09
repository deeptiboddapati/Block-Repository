/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import DOMPurify from 'dompurify';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const { headline, heroimage, heroimagealt, supportingcopy } = attributes;
	return (
		<div {...useBlockProps.save()} className='toms-hero-b'>
			<h1 className="toms-hero-b-headline"></h1>
			{heroimage && <img className='toms-hero-b-heroimage' src={heroimage} alt={heroimagealt} />}
			<p className="toms-hero-b-supportingcopy">{supportingcopy}</p>
			<button className='toms-hero-b-ctabutton'>Start Now</button>
		</div>
	);
}
