import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "./firebase";
import "./App.css";
import sendImg from "./send.png";
import {
  collection,
  onSnapshot,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Signin from "./components/Signin";
import SignOUT from "./components/Signout";

function App() {
  const scrollableDiv = useRef();
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);
  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      await addDoc(collection(db, "messages"), {
        text: input,
        timestamp: new Date(),
        uid: user.uid,
        displayName: user.displayName,
      });

      setInput("");
    }
    scrollableDiv.current.scrollTo({
      top: scrollableDiv.current.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className="App">
      <div className="contact_section">
        <h1>React Firebase Chat</h1>
        {user ? <SignOUT /> : <Signin />}
      </div>
      <div ref={scrollableDiv} className="message_section">
        {user ? (
          <>
            {messages.map(({ id, data }) => (
              <div
                key={id}
                className={`message ${
                  data.uid === user.uid ? "sent" : "received"
                }`}
              >
                <span className="displayName">{data.displayName}: </span>
                <span className="messageText">{data.text}</span>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
        {user && (
          <form className="send_message" onSubmit={sendMessage}>
            <input
              className="msginp"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message"
            />
            <button className="msgsnd" type="submit">
              <img
                style={{ width: 30, aspectRatio: 1 }}
                alt="send"
                src={sendImg}
              ></img>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
