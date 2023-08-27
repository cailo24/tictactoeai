import React from "react";
import "./Divider.scss";

const Divider = ({ alignment }) => {
  return <div className={`Divider__${alignment}`} />;
};

export default Divider;
