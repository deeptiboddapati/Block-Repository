/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
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
	const {
		headline,
		heroimage,
		heroimagealt,
		supportingcopy,
		marketplaceimageone,
		marketplaceimageonealt,
		marketplaceimagetwo,
		marketplaceimagetwoalt
	} = attributes;
	return (
		<div {...useBlockProps.save()} className='toms-hero-a'>
			<h1 className="toms-hero-a-headline" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(headline) }} />
			{heroimage && <img className='toms-hero-a-heroimage' src={heroimage} alt={heroimagealt} />}
			<p className="toms-hero-a-supportingcopy" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(supportingcopy) }} />
			<button className='toms-hero-a-ctabutton'>Start Now</button>
			{marketplaceimageone && <img className='toms-hero-a-marketplaceimageone' src={marketplaceimageone} alt={marketplaceimageonealt} />}
			{marketplaceimagetwo && <img className='toms-hero-a-marketplaceimagetwo' src={marketplaceimagetwo} alt={marketplaceimagetwoalt} />}
		</div>
	);
}
