import { useState, useEffect } from "react";
import { Conv, Dropout, Flatten, Pooling, Compile, Dense } from "../components";

import io from "socket.io-client";

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;
  }, []);

  return socket;
};

export default () => {
  const socket = useSocket("http://localhost:8001", {
    reconnectionDelay: 300,
    reconnectionDelayMax: 300,
  });

  useEffect(() => {
    if (socket) {
      socket.on("model", (summary) => {
        console.log(summary);
      });
    }
  }, [socket]);

  return (
    <div className="container">
      <h1 className="text-center m-4">Tensorflow.js Demo</h1>

      <div className="row m-5" style={{ gap: "10px" }}>
        <Conv />
        <Dropout />
      </div>
      <div className="row m-5" style={{ gap: "10px" }}>
        <Pooling />
        <Flatten />
      </div>
      <div className="row m-5">
        <Dense />
      </div>
      <div className="row m-5">
        <Compile />
      </div>
      {/* <Button onClick={() => socket.emit("addMaxPooling")} variant="danger">
        Max Pooling
      </Button>
      <Button onClick={() => socket.emit("addConv")} variant="danger">
        Conv 2D
      </Button>
      <Button onClick={() => socket.emit("addFlatten")} variant="danger">
        Flatten
      </Button>
      <Button onClick={() => socket.emit("addDense")} variant="danger">
        Dense
      </Button>
      <Button onClick={() => socket.emit("compileModel")} variant="danger">
        Compile
      </Button> */}
    </div>
  );
};
