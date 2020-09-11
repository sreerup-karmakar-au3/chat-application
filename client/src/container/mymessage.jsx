import React from 'react'

import '../styles/mymessage.css'

export default function MyMessage({ key, content }) {
    return (
        <div className="mymsg" key={key}>
            <div className="mymsg-body">
                {content}
            </div>
        </div>
    )
}