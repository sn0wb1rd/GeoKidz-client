import React from "react";
import unicorn from "../images/unicorn-34.png";

const ErrorPage = () => {
  return (
    <div className="neutral-background">
      <div className="centered-text">
        <h2>404</h2>
        <h4>This page doesn't exist my friend...</h4>
        <img src={unicorn} alt="unicorn" className="avatar" />
      </div>
    </div>
  );
};

export default ErrorPage;
