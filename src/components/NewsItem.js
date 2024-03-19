import React from "react";

const NewsItem = (props) => {
  let myStyle = {
    color: props.mode === "dark" ? "white" : "black",
    backgroundColor: props.mode === "light" ? "white" : "#212529",
  };
  return (
    <div
      className="my-3"
      style={{
        border: props.mode === "dark" ? "solid white 1px" : "none",
        borderRadius: "8px",
      }}
    >
      <div className="card" style={myStyle}>
        <img src={props.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title" style={myStyle}>
            <strong>{props.title}</strong>
          </h5>
          <p className="card-text my-2" style={myStyle}>
            {props.description}
          </p>
          <p className="card-text" >
            <small className="text-body-secondary" >
                By {!props.author ? "Unknown" : props.author} on{" "}
              {new Date(props.date).toGMTString().substring(0, 17)}
            </small>
          </p>
          <div className="d-flex justify-content-between">
            <a
              href={props.newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
