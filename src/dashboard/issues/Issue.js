import React from 'react';
import './Issue.css';

const Issue = ({title, count, isLeft, isRight}) => {
    let attr;
    if (isLeft) {
        attr = 'left';
    }
    else if (isRight) {
        attr = 'right';
    }
    return (
        <div className={`Issue-content ${attr ? `Issue-content-${attr}` : ''}`}>
            <div>
                <h2>{title}</h2>
                <div>{count}</div>
            </div>
        </div>
    );
};

export default Issue;