import { useEffect, useState } from "react";
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

  const [compailStatus, setCompailStatus] = useState({
    status: false,
    message: "Model hasn't compailed yet",
  });

  const [trainLogs, setTrainLogs] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("compailed", ({ status, message }) => {
        setCompailStatus({ status, message });
      });

      socket.on("onEpochEnd", (data) => {
        console.log(trainLogs);
        setTrainLogs([...trainLogs, data]);
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
        <Train socket={socket} active={compailStatus.status ? true : false} />
      </div>
      <div className="row m-5">
        <p>
          {compailStatus.status}
          {compailStatus.message}
        </p>
      </div>
      <div className="row m-5">
        <p>
          {trainLogs.length > 0
            ? trainLogs.map((item) => (
                <p>
                  <span>{item.epochs}</span>
                  <span>{JSON.stringify(item.logs)}</span>
                </p>
              ))
            : null}
        </p>
      </div>
    </div>
  );
};
