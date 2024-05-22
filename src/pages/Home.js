import React, { useState, useCallback, useEffect } from "react";
import { useSocket } from "../context/Socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-red-50  px-8 py-12 rounded-lg">
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="p-2 rounded-md block "
          />
          <label htmlFor="channel">Channel Name</label>
          <input
            type="text"
            id="channel"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter Channel Name"
            className="p-2 rounded-md block"
          />
          <button
            type="submit"
            className="bg-green-400 px-6 py-1 rounded-md w-full"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
