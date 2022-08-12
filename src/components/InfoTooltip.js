import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function InfoTooltip(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={props.name}
      title={props.title}
    >
      <img src={props.image} className="infoTooltip__image"></img>

    </PopupWithForm>
  );
}

export default InfoTooltip;