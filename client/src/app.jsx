import React, { useState, useEffect, useRef } from 'react'
import io from "socket.io-client"

import './app.css'

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
        <div className="container">
            <div id="message-thread">
                {
                    messages.map((message, indx) => {
                        if(message.id === yourID) {
                            return (
                                <div key={indx}>
                                    {message.body}
                                </div>
                            )
                        }
                        else {
                            return (
                                <div key={indx}>
                                    {message.body}
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div id="message-field">
                <form className="field is-grouped" onSubmit={sendMessage}>
                    <p className="control is-expanded">
                        <input className="input" type="text" placeholder="Type your message"/>
                    </p>
                    <p className="control">
                        <button className="button is-info" type="submit">Send</button>
                    </p>
                </form>
            </div>
        </div>
    )
}