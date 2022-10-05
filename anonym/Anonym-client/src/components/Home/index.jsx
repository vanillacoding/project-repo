import React from "react";
import { Link } from "react-router-dom";
import useFetchStreamings from "../../hooks/useFetchStreamings";

function Home() {
  const streamings = useFetchStreamings();

  return (
    <div className="content-wrapper">
      <div className="streaming-list">
        {
          streamings.map((streaming) => (
            <Link
              to={`/streaming/${streaming.streamer._id}`}
              key={streaming._id}
              className="streaming"
            >
              <div className="streaming__top">
                <img
                  src={streaming.thumnail}
                  alt="streaming thumnail"
                  className="streaming__thumnail"
                />
              </div>
              <div className="streaming__bottom">
                <img
                  src={streaming.streamer.thumnail}
                  alt="streamer thumnail"
                  className="streaming__streamer-thumnail"
                />
                <div className="streaming__description">
                  <div className="streaming__title">{streaming.title}</div>
                  <div className="streaming__streamer-name">{streaming.streamer.userName}</div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
