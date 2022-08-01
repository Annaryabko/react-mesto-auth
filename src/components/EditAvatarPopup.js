import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState("");
  const avatarRef = React.useRef();

  React.useEffect(() => {
    if (currentUser && currentUser.avatar) {
      setAvatar(currentUser.avatar);
    }
  }, [currentUser.avatar]);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="popup_avatar"
      title="Обновить аватар?"
      buttonValue="Сохранить"
    >
      <input
        ref={avatarRef}
        onChange={handleAvatarChange}
        value={avatar}
        className="popup__input popup__input_type_link"
        type="url"
        id="avatar-input"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;