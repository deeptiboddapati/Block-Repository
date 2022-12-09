/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl
} from '@wordpress/components';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls
} from '@wordpress/block-editor';
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
function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const { headline, supportingcopy, heroimage, heroimagealt, heroimageid, marketplaceimageone, marketplaceimagetwo } = attributes;
	const [blobURL, setBlobURL] = useState();
	const onSelectHeroImage = (image) => {
		if (!image || !image.url) {
			setAttributes({ heroimage: undefined, heroimageid: undefined, heroimagealt: '' })
			return;
		}
		noticeOperations.removeAllNotices();
		setAttributes({ heroimage: image.url, heroimageid: image.id, heroimagealt: image.alt })
	}
	const onUploadError = (err) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(err);
	}
	useEffect(() => {
		if (!heroimageid && isBlobURL(heroimage)) {
			setAttributes({
				heroimage: undefined,
				heroimagealt: undefined
			})
		}
	})
	useEffect(() => {
		if (isBlobURL(heroimage)) {
			setBlobURL(heroimage)
		} else {
			revokeBlobURL(blobURL);
			setBlobURL();
		}
	}, [heroimage])
	const removeHeroImage = () => {
		setAttributes({
			heroimage: undefined,
			heroimagealt: undefined,
			heroimageid: undefined
		})
	}
	const onChangeAlt = (newAltText) => {
		setAttributes({ heroimagealt: newAltText })
	}
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image Settings', 'textdomain')}>
					<TextareaControl
						label={__('Alt Text', 'textdomain')}
						value={heroimagealt}
						onChange={onChangeAlt}
						help={__('alt text is helpful for...', 'textdomain')}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				{heroimage &&
					<>
						<MediaReplaceFlow
							icon="admin-page"
							onSelect={(val) => onSelectHeroImage(val)}
							onError={(err) => onUploadError(err)}
							accept="image/*"
							allowedTypes={['image']}
							name='Replace Hero Image'
							mediaId={heroimageid}
							mediaUrl={heroimage}
						/>
						<ToolbarButton onClick={removeHeroImage}>
							Remove Hero Image
						</ToolbarButton>
					</>
				}
			</BlockControls>
			<div {...useBlockProps()} className='toms-hero-b'>
				<RichText
					className="toms-hero-b-headline"
					tagName="h1" // The tag here is the element output and editable in the admin
					value={headline} // Any existing content, either from the database or an attribute default
					allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange={(content) => setAttributes({ headline: content })} // Store updated content as a block attribute
					placeholder={__('Headline...')} // Display this text before any content has been added by the user
				/>
				<>
					{heroimage ?
						(
							isBlobURL(heroimage) ?
								<div className="isBlobURL" ><img className={'toms-hero-b-heroimage'} src={heroimage} alt={heroimagealt} /> {console.log('hi')}<Spinner /></div> :
								<img className={'toms-hero-b-heroimage'} src={heroimage} alt={heroimagealt} />
						)
						:
						<MediaPlaceholder
							icon="admin-page"
							onSelect={(val) => onSelectHeroImage(val)}
							onError={(err) => onUploadError(err)}
							accept="image/*"
							allowedTypes={['image']}
							notices={noticeUI}
						/>
					}
				</>
				<RichText
					className="toms-hero-b-supportingcopy"
					tagName="p" // The tag here is the element output and editable in the admin
					value={supportingcopy} // Any existing content, either from the database or an attribute default
					allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange={(content) => setAttributes({ supportingcopy: content })} // Store updated content as a block attribute
					placeholder={__('Supporting Copy...')} // Display this text before any content has been added by the user
				/>
				<button className='toms-hero-b-ctabutton'>Start Now</button>
			</div>
		</>
	);
}

export default withNotices(Edit)
