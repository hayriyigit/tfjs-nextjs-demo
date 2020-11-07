import { useEffect } from "react";
import { useSocket } from "../hooks";

import {
  Conv,
  Dropout,
  Flatten,
  Pooling,
  Compile,
  Dense,
  Train,
} from "../components";

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
        <Conv socket={socket} />
        <Pooling socket={socket} />
      </div>
      <div className="row m-5" style={{ gap: "10px" }}>
        <Flatten socket={socket} />
        <Dropout socket={socket} />
      </div>
      <div className="row m-5">
        <Dense socket={socket} />
      </div>
      <div className="row m-5">
        <Compile socket={socket} />
      </div>
      <div className="row m-5">
        <Train socket={socket} />
      </div>
    </div>
  );
};
