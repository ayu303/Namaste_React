// import React from 'react';
// import {createRoot} from 'react-dom/client';

// const heading = [React.createElement("h1", {id:"h1", style:{color:"green"}}, "hi my name is ayush" ),
//                     React.createElement("h2", {id:"h2", style:{color:"red"}}, "hi my name is ayush" )]
//     const root =createRoot(document.getElementById("root"));
//     root.render(heading);
import React from "react";
import ReactDOM from "react-dom/client";

const heading = [
  React.createElement(
    "h1",
    { key: "title", id: "h1", style: { color: "green" } },
    "hi my name is ayush"
  ),
  React.createElement(
    "h2",
    { key: "subtitle", id: "h2", style: { color: "red" } },
    "hi my name is ayush"
  )
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
