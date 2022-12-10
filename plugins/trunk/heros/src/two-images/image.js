import { MediaPlaceholder } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

export default function imageControls(props) {
    const { className, src, alt, id, propNames, setAttributes, title, instructions } = props;
    const { buttonState, setButtonState } = useState();
    const handleImageClick = () => {
        setButtonState(!buttonState);
    }
    const clearImage = (propUrl, propAlt, propId) => {
        var args = {}
        args[propUrl] = undefined;
        args[propAlt] = "";
        args[propId] = undefined;
        setAttributes(args)
    }
    const handleSelect = (img, propUrl, propAlt, propId) => {
        var args = {}
        args[propUrl] = img.url;
        args[propAlt] = img.alt;
        args[propId] = img.id;
        setAttributes(args)
    }
    return (
        <>
            {id ?
                <div>
                    <img src={src} alt={alt} className={className}
                        onClick={() => {
                            handleImageClick();
                        }}
                    />
                    {showEditButtonFirstImage && <button onClick={() => {
                        clearImage(...propNames);
                        handleImageClick();
                    }} >Clear Image</button>}
                </div>
                :
                <MediaPlaceholder
                    className={className}
                    accept="image/"
                    labels={{ title: title, instructions: instructions }}
                    onError={() => handleError()}
                    onSelect={(arg) => {
                        handleSelect(arg, ...propNames)
                    }}
                    value={id}
                    mediaPreview={id && <img src={url} alt={alt} />}
                />
            }
        </>
    );
}