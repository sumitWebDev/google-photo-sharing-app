const initialState = {
  photos: [],
  selectedPhotosList: [],
};

//Reducer used for fetching photos from server
export function photos(state = initialState.photos, action) {
  switch (action.type) {
    case "FETCH_PHOTOS":
      return [...state, ...action.payload];
    case "SELECTED_PHOTOS":
      return state.map((photo) => {
        if (photo.id === action.payload) {
          photo.isSelected = photo.isSelected ? false : true;
        }
        return photo;
      });
    case "SEND_PHOTOS_TO_SERVER":
      return state.map((photo) => {
        if (photo.id === action.payload) {
          photo.isSelected = false;
          photo.website = "PENDING_APPROVAL";
        }
        return photo;
      });
    case "APPROVED_PHOTOS_LIST":
      return state.map((photo) => {
        if (photo.id === action.payload) {
          photo.website = "WEBSITE_APPROVED";
        }
        return photo;
      });
    case "CLEAR_SELECTED_PHOTOS":
      return state.map((photo) => {
        delete photo["isSelected"];
        return photo;
      });
    default:
      return state;
  }
}

// Reducer for selected photos list
export function selectedPhotosList(
  state = initialState.selectedPhotosList,
  action
) {
  switch (action.type) {
    case "SELECTED_PHOTOS": {
      const pos = state.indexOf(action.payload);
      pos === -1 ? state.push(action.payload) : state.splice(pos, 1);
      return state;
    }
    case "SEND_PHOTOS_TO_SERVER": {
      const pos = state.indexOf(action.payload);
      state.splice(pos, 1);
      return state;
    }
    case "CLEAR_SELECTED_PHOTOS":
      return [];
    default:
      return state;
  }
}
