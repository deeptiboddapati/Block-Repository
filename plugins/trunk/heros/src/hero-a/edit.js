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
	const {
		headline,
		supportingcopy,
		heroimage,
		heroimagealt,
		heroimageid,
		marketplaceimageone,
		marketplaceimageoneid,
		marketplaceimageonealt,
		marketplaceimagetwo,
		marketplaceimagetwoid,
		marketplaceimagetwoalt
	} = attributes;
	const [heroBlobURL, setHeroBlobURL] = useState();
	const [mktoneBlobURL, setMktoneBlobURL] = useState();
	const [mkttwoBlobURL, setMkttwoBlobURL] = useState();

	const onSelectImage = (image, attrsToUpdate) => {
		var imgAttrObj = {}
		if (!image || !image.url) {
			imgAttrObj[attrsToUpdate.url] = undefined;
			imgAttrObj[attrsToUpdate.id] = undefined;
			imgAttrObj[attrsToUpdate.alt] = '';

			setAttributes(imgAttrObj)
			return;
		}
		imgAttrObj[attrsToUpdate.url] = image.url;
		imgAttrObj[attrsToUpdate.id] = image.id;
		imgAttrObj[attrsToUpdate.alt] = image.alt;
		noticeOperations.removeAllNotices();
		setAttributes({ heroimage: image.url, heroimageid: image.id, heroimagealt: image.alt })
	}
	const onUploadError = (err) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(err);
	}
	useEffect(() => {
		if (!marketplaceimageoneid && isBlobURL(marketplaceimageone)) {
			setAttributes({
				marketplaceimageone: undefined,
				marketplaceimageonealt: undefined
			})
		}
	})
	useEffect(() => {
		if (isBlobURL(marketplaceimageone)) {
			setMktoneBlobURL(marketplaceimageone)
		} else {
			revokeBlobURL(mktoneBlobURL);
			setMktoneBlobURL();
		}
	}, [marketplaceimageone])
	useEffect(() => {
		if (!marketplaceimagetwoid && isBlobURL(marketplaceimagetwo)) {
			setAttributes({
				marketplaceimagetwo: undefined,
				marketplaceimagetwoalt: undefined
			})
		}
	})
	useEffect(() => {
		if (isBlobURL(marketplaceimagetwo)) {
			setMkttwoBlobURL(marketplaceimagetwo)
		} else {
			revokeBlobURL(mkttwoBlobURL);
			setMkttwoBlobURL();
		}
	}, [marketplaceimagetwo])
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
			setHeroBlobURL(heroimage)
		} else {
			revokeBlobURL(heroBlobURL);
			setHeroBlobURL();
		}
	}, [heroimage])
	const removeImage = (attrNames) => {
		var attrs = {}
		attrs[attrNames.id] = undefined;
		attrs[attrNames.url] = undefined;
		attrs[attrNames.alt] = '';
		setAttributes(attrs)
	}
	const onChangeAlt = (newAltText, altAttrName) => {
		var alt = {};
		alt[altAttrName] = newAltText;
		setAttributes(alt)
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image Settings', 'textdomain')}>
					<TextareaControl
						label={__('Hero Alt Text', 'textdomain')}
						value={heroimagealt}
						onChange={(event) => { onChangeAlt(event, 'heroimagealt') }}
						help={__('alt text is helpful for...', 'textdomain')}
					/>
					<TextareaControl
						label={__('Market Place Image One Alt Text', 'textdomain')}
						value={marketplaceimageonealt}
						onChange={(event) => { onChangeAlt(event, 'marketplaceimageonealt') }}
						help={__('alt text is helpful for...', 'textdomain')}
					/>
					<TextareaControl
						label={__('Market Place Image Two Alt Text', 'textdomain')}
						value={marketplaceimagetwoalt}
						onChange={(event) => { onChangeAlt(event, 'marketplaceimagetwoalt') }}
						help={__('alt text is helpful for...', 'textdomain')}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				{heroimage &&
					<>
						<MediaReplaceFlow
							icon="admin-page"
							onSelect={(val) => onSelectImage(val, {
								url: 'heroimage',
								id: 'heroimageid',
								alt: 'heroimagealt'
							})}
							onError={(err) => onUploadError(err)}
							accept="image/*"
							allowedTypes={['image']}
							name='Replace Hero Image'
							mediaId={heroimageid}
							mediaUrl={heroimage}
						/>
						<ToolbarButton onClick={removeImage(
							{
								url: 'heroimage',
								id: 'heroimageid',
								alt: 'heroimagealt'
							}
						)}>
							Remove Hero Image
						</ToolbarButton>
					</>
				}
				{marketplaceimageone &&
					<>
						<MediaReplaceFlow
							icon="admin-page"
							onSelect={(val) => onSelectImage(val, {
								url: 'marketplaceimageone',
								id: 'marketplaceimageoneid',
								alt: 'marketplaceimageonealt'
							})}
							onError={(err) => onUploadError(err)}
							accept="image/*"
							allowedTypes={['image']}
							name='Replace Marketplace Image One'
							mediaId={marketplaceimageoneid}
							mediaUrl={marketplaceimageone}
						/>
						<ToolbarButton onClick={removeImage(
							{
								url: 'marketplaceimageone',
								id: 'marketplaceimageoneid',
								alt: 'marketplaceimageonealt'
							}
						)}>
							Remove Marketplace Image One
						</ToolbarButton>
					</>
				}
				{marketplaceimagetwo &&
					<>
						<MediaReplaceFlow
							icon="admin-page"
							onSelect={(val) => onSelectImage(val, {
								url: 'marketplaceimagetwo',
								id: 'marketplaceimagetwoid',
								alt: 'marketplaceimagetwoalt'
							})}
							onError={(err) => onUploadError(err)}
							accept="image/*"
							allowedTypes={['image']}
							name='Replace Marketplace Image Two'
							mediaId={marketplaceimagetwoid}
							mediaUrl={marketplaceimagetwo}
						/>
						<ToolbarButton onClick={removeImage(
							{
								url: 'marketplaceimagetwo',
								id: 'marketplaceimagetwoid',
								alt: 'marketplaceimagetwoalt'
							}
						)}>
							Remove Marketplace Image Two
						</ToolbarButton>
					</>
				}
			</BlockControls>
			<div {...useBlockProps()} className='toms-hero-a'>
				<RichText
					className="toms-hero-a-headline"
					tagName="h1" // The tag here is the element output and editable in the admin
					value={headline} // Any existing content, either from the database or an attribute default
					allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange={(content) => setAttributes({ headline: content })} // Store updated content as a block attribute
					placeholder={__('Headline...')} // Display this text before any content has been added by the user
				/>
				{heroimage ?
					(
						isBlobURL(heroimage) ?
							<div className="isBlobURL" ><img className={'toms-hero-a-heroimage'} src={heroimage} alt={heroimagealt} /><Spinner /></div> :
							<img className={'toms-hero-a-heroimage'} src={heroimage} alt={heroimagealt} />
					)
					:
					<MediaPlaceholder
						icon="admin-page"
						onSelect={(val) => onSelectImage(val,
							{
								url: 'heroimage',
								id: 'heroimageid',
								alt: 'heroimagealt'
							}
						)}
						onError={(err) => onUploadError(err)}
						accept="image/*"
						allowedTypes={['image']}
						notices={noticeUI}
						className='heroImage'
					/>
				}
				<RichText
					className="toms-hero-a-supportingcopy"
					tagName="p" // The tag here is the element output and editable in the admin
					value={supportingcopy} // Any existing content, either from the database or an attribute default
					allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange={(content) => setAttributes({ supportingcopy: content })} // Store updated content as a block attribute
					placeholder={__('Supporting Copy...')} // Display this text before any content has been added by the user
				/>
				<button className='toms-hero-a-ctabutton'>Start Now</button>
				{marketplaceimageone ?
					(
						isBlobURL(marketplaceimageone) ?
							<div className="isBlobURL" >
								<img
									className={'toms-hero-a-marketplaceimageone'}
									src={marketplaceimageone}
									alt={marketplaceimageonealt} />
								<Spinner />
							</div> :
							<img
								className={'toms-hero-a-marketplaceimageone'}
								src={marketplaceimageone}
								alt={marketplaceimageonealt}
							/>
					)
					:
					<MediaPlaceholder
						icon="admin-page"
						onSelect={(val) => onSelectImage(val,
							{
								url: 'marketplaceimageone',
								id: 'marketplaceimageoneid',
								alt: 'marketplaceimageonealt'
							}
						)}
						onError={(err) => onUploadError(err)}
						accept="image/*"
						allowedTypes={['image']}
						notices={noticeUI}
					/>
				}
				{marketplaceimagetwo ?
					(
						isBlobURL(marketplaceimagetwo) ?
							<div className="isBlobURL" >
								<img
									className={'toms-hero-a-marketplaceimagetwo'}
									src={marketplaceimagetwo}
									alt={marketplaceimagetwoalt} />
								<Spinner />
							</div> :
							<img
								className={'toms-hero-a-marketplaceimagetwo'}
								src={marketplaceimagetwo}
								alt={marketplaceimagetwoalt}
							/>
					)
					:
					<MediaPlaceholder
						icon="admin-page"
						onSelect={(val) => onSelectImage(val,
							{
								url: 'marketplaceimagetwo',
								id: 'marketplaceimagetwoid',
								alt: 'marketplaceimagetwoalt'
							}
						)}
						onError={(err) => onUploadError(err)}
						accept="image/*"
						allowedTypes={['image']}
						notices={noticeUI}
					/>
				}
			</div>
		</>
	);
}

export default withNotices(Edit)
