import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Photo from "./photo.component";
import "../styles/photoGallery.css";
import { FetchPhotosAsync } from "../actions/photos.actions";
function PhotosList() {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state);

  useEffect(() => {
    dispatch(FetchPhotosAsync());
  }, []);

  //Creating all images gallery
  let createPhotosGrid = photos.map((photo) => {
    return <Photo key={photo.id} photoDetails={photo} />;
  });
  return (
    <div>
      <ul className="list-group">
        {photos.length === 0 ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          createPhotosGrid
        )}
      </ul>
    </div>
  );
}

export default PhotosList;
