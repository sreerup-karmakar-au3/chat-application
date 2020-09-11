import React from 'react'

import '../styles/partnermessage.css'

export default function PartnerMessage({ key, content }) {
    return (
        <div className="partmsg" key={key}>
            <div className="partmsg-body">
                {content}
            </div>
        </div>
    )
}