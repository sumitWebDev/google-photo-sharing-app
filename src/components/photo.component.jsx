import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedPhotos } from "../actions/photos.actions";
export default function Photo(props) {
  const { photoDetails } = props;
  const { selectedPhotosList } = useSelector((store) => store);
  const dispatch = useDispatch();
  return (
    <li
      className={`list-group-photo ${
        photoDetails.website === "WEBSITE_APPROVED" ? "approved" : ""
      }`}
      key={photoDetails.id}
      onClick={() => dispatch(selectedPhotos(photoDetails.id))}
    >
      {photoDetails.isSelected ? (
        <i className="bi bi-check-circle-fill selected" />
      ) : photoDetails.website === "PENDING_APPROVAL" ? (
        <i className="bi bi-hourglass-top sent" />
      ) : photoDetails.website === "WEBSITE_APPROVED" ? (
        <i className="bi bi-share-fill approved" />
      ) : selectedPhotosList.length > 0 ? (
        <i className="bi bi-circle image-select-mode" />
      ) : (
        <i className="hover-select bi bi-check-circle-fill" />
      )}
      <img src={photoDetails.url} />
    </li>
  );
}
