import axios from "axios";

//Action to fetch photos across the application
export function FetchPhotos(photos) {
  return { type: "FETCH_PHOTOS", payload: photos };
}

//Action to fetch photos selected across the application
export function selectedPhotos(photo) {
  return { type: "SELECTED_PHOTOS", payload: photo };
}

//Action to clear photos selected across the application
export function clearSelectedPhotos() {
  return { type: "CLEAR_SELECTED_PHOTOS" };
}

//Action to receive approved photos list across the application
export function PhotosApproved(photo) {
  return { type: "APPROVED_PHOTOS_LIST", payload: photo };
}

//Action to send selected photos list to the server
export function PhotosSentToServer(photoId) {
  return { type: "SEND_PHOTOS_TO_SERVER", payload: photoId };
}
//Action to fetch photos using Redux Thunk
export function FetchPhotosAsync() {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/photos")
      .then((response) => dispatch(FetchPhotos(response.data.photos)));
  };
}

//Action to fetch responses for selected photos sent to server
export function PostPhotosAsync(photo) {
  let endpointUrls = [];
  photo.forEach((photo) => {
    if (photo.status !== "approved") {
      endpointUrls = [
        ...endpointUrls,
        "http://localhost:3001/website/photos/" + photo,
      ];
    }
  });
  return (dispatch) => {
    axios
      .all(endpointUrls.map((endpointUrl) => axios.post(endpointUrl)))
      .then((response) => {
        response.forEach((response) => {
          return dispatch(PhotosSentToServer(response.data.photo.id));
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
        }
      });
  };
}
