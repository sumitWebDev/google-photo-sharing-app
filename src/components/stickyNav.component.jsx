import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PhotosApproved,
  clearSelectedPhotos,
  PostPhotosAsync,
} from "../actions/photos.actions";
import { w3cwebsocket } from "websocket";
import "../styles/stickyNav.css";

export default function StickyNav() {
  const client = new w3cwebsocket("ws://localhost:3001/ws");
  const dispatch = useDispatch();
  const { selectedPhotosList } = useSelector((state) => state);
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    client.onmessage = (message) => {
      let messageReceived = JSON.parse(message.data);
      if (messageReceived.photo.website === "WEBSITE_APPROVED") {
        dispatch(PhotosApproved(messageReceived.photo.id));
      }
    };
  }, []);

  // Closing footer modal
  const hideModal = () => {
    setModalState(false);
  };

  return (
    <div>
      <div className="sticky-nav">
        <div
          className={`photo-selected ${
            selectedPhotosList.length === 0 ? "hide" : ""
          }`}
        >
          <button
            type="button"
            className="clear-selection  btn-close"
            aria-label="Close"
            onClick={() => {
              dispatch(clearSelectedPhotos());
              hideModal();
            }}
          ></button>
          <span>
            <span className="items">{selectedPhotosList.length}</span>
            Selected
          </span>
        </div>
        <div
          className={`share-icon ${
            selectedPhotosList.length === 0 ? "hide" : ""
          }`}
          onClick={() => setModalState(!modalState)}
        >
          <i className="bi bi-share-fill"></i>
        </div>

        <div className={`send-data ${modalState ? "show" : "hide"}`}>
          <p>Send {selectedPhotosList.length} photos to website ?</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              hideModal();
              dispatch(PostPhotosAsync(selectedPhotosList));
            }}
          >
            Send Data
          </button>
          <button type="button" className="btn btn-light" onClick={hideModal}>
            Cancel
          </button>
          <i className="modal-arrow bi bi-caret-down-fill" />
        </div>
        <div className="people-avatar">
          <i className="bi bi-person-circle" />
        </div>
      </div>
    </div>
  );
}
