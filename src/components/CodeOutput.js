import React from 'react';
import CodeRow from './CodeRow';

export default function CodeOutput(props) {
    let codeRows = props.code.trim().split('\n');

    return (
        <div className='code-output-div'>
            <div className='code-text-div'>
                <div className='code-header-div'>
                    <span className='code-header'>Output:</span>
                </div>
                {codeRows.map((codeRow, index) => {
                    return CodeRow({codeRow: codeRow}, index);
                })}
            </div>
            <button onClick={props.clear}>Clear</button>
        </div>
    );
}
