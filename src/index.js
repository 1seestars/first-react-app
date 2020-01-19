import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./components/TodoApp"
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);