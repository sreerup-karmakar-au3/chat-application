import React, { useState, useEffect, useRef } from 'react'
import io from "socket.io-client"

import MyMessage from './container/mymessage'
import PartnerMessage from './container/partnermessage'

import './styles/app.css'

export default function App() {
    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [ownMessage, setOwnMessage] = useState();
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('/');

        socketRef.current.on("Your ID", id => {
            setYourID(id);
          })
      
        socketRef.current.on("Message", msg => {
            receivedMessage(msg);
        })
    }, []);

    function receivedMessage(msgs) {
        setMessages(oldMsgs => [...oldMsgs, msgs]);
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageObj = {
            body: ownMessage,
            id: yourID,
        };
        setOwnMessage("");
        socketRef.current.emit("Send message", messageObj);
    }

    return (
        <div className="container is-fluid">
            <div id="message-thread">
                {
                    messages.map((message, indx) => {
                        if(message.id === yourID) {
                            return <MyMessage key={indx} content={message.body}/>
                        }
                        else {
                            return <PartnerMessage key={indx} content={message.body}/>
                        }
                    })
                }
            </div>
            <div id="message-field">
                <form className="field is-grouped" onSubmit={sendMessage}>
                    <p className="control is-expanded">
                        <input className="input is-rounded" type="text" value={ownMessage} onChange={e => setOwnMessage(e.target.value)}  placeholder="Type your message"/>
                    </p>
                    <p className="control">
                        <button className="button is-primary is-rounded is-outlined is-inverted" type="submit">SEND</button>
                    </p>
                </form>
            </div>
        </div>
    )
}