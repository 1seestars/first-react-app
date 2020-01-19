import React from "react";

const RemoveButton = ({id, remove}) => {
  return (
    <button onClick={remove(id)} className="deleteButton optionButton"></button>
  );
};

export default RemoveButton;