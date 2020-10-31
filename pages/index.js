import { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="d-flex flex-column">
      <Button onClick={() => socket.emit("addMaxPooling")} variant="danger">
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
      </Button>
    </div>
  );
};
