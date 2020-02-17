import React from 'react';

export default function Mflag() {
    return (
        <div className="my-3">
            <div>
                <span className="px-3 mr-2 bg-success" /> = Launch was a success
            </div>
            <div>
                <span className="px-3 mr-2 bg-danger" /> = Launch Failed or is in the future
            </div>
        </div>
    );
}
