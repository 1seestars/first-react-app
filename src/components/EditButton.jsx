import React from "react";

const EditButton = ({id, edit}) => {
  return (
    <button onClick={edit(id)} className="editButton optionButton"></button>
  );
};

export default EditButton;