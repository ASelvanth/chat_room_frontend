import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("https://chat-room-backend-rokm.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
       <h1 className="text-center p-2 border-light text-light rounded">Chat Application</h1>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join the Chat room</h3>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Room ID" onChange={(e) => setRoom(e.target.value)} />
            <button onClick={joinRoom}>Join room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;