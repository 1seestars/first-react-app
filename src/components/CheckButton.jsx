import React from "react";

const CheckButton = ({id, check}) => {
  return (
    <button onClick={check(id)} className="checkButton optionButton"></button>
  );
};

export default CheckButton;