import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onSubmit}) => {
    return(
        <div>
            <p className="f4">
                {'This magic brain will detect the face from your image. Give it a try'}
            </p>
            <div>
                <div className="form pa4 br3 shadow-5 center">
                    <input className="f5 pa1 w-70 center" type="text" onChange={onInputChange}/>
                    <button className="w-30 f5 pa1 grow link dib ph3 bg-light-purple b--light-purple white pointer" onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;