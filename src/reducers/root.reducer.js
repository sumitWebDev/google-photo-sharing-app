import { combineReducers } from "redux";
import { photos, selectedPhotosList } from "./photos.reducer";
var rootReducer = combineReducers({
  photos,
  selectedPhotosList,
});
export default rootReducer;
