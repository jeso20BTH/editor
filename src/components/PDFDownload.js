import React from 'react';

export default function PDFDownload(props) {
    return (
        <div className='pdf-download-container'>
            <div className='pdf-download-div'>
                <span className='downloadText'>
                    Do you wanna download the document <br/> {props.title}.pdf?
                </span>
                <div className="download-pdf-buttons">
                    <a
                        className="downloadButton"
                        href={props.href}
                        download={`${props.title}.pdf`}
                        onClick={props.removeLink}
                    >
                        YES
                    </a>
                    <button
                        className="downloadButton"
                        onClick={props.removeLink}
                    >
                        NO
                    </button>
                </div>
            </div>
        </div>
    );
}
