import axios from "axios";
import { SET_ADMIN_USER_LIST, GET_ADMIN_USER, CREATE_ADMIN_USER, DELETE_ADMIN_USER, UPDATE_ADMIN_USER, LOGOUT_USER } from "../constants/action-type";

import { setUserEssentials } from "../../utils/storage";

const { REACT_APP_API_URL: API_URL, REACT_APP_MEDIA_URL: MEDIA_URL } = process.env;
// const MEDIA_PATH = API_URL || "" + MEDIA_URL;

export const setAdminUserListAction = (payload) => {
  return {
    type: SET_ADMIN_USER_LIST,
    payload,
  };
};

export const createAdminUserAction = (payload) => {
  return {
    type: CREATE_ADMIN_USER,
    payload,
  };
};

export const updateAdminUserAction = (payload) => {
  return {
    type: UPDATE_ADMIN_USER,
    payload: payload,
  };
};


export const deleteAdminUserAction = (payload) => {
  return {
    type: DELETE_ADMIN_USER,
    payload,
  };
};



export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: LOGOUT_USER,
  };
};

// export const logoutUser = () => {
//   localStorage.clear();

//   return {
//     type: LOGOUT_USER,
//   };
// };

// export const updateProfileDetails = async (profileData, dispatch, history) => {
//   try {
//     var bodyFormData = new FormData();

//     bodyFormData.append("profile_picture", profileData["profile_picture"]);
//     delete profileData["profile_picture"];

//     bodyFormData.append("data", JSON.stringify(profileData));

//     // console.log(profileData);
//     let response = await axios({
//       method: "PUT",
//       url: process.env.REACT_APP_API_URL + "/users/profile/",
//       headers: {
//         Authorization: "Token " + localStorage.getItem("token"),
//       },
//       data: bodyFormData,
//     });

//     // console.log("action user tsx", response);
//     if (response.data.profile_picture) {
//       const userStateData = {
//         username: response.data.user.username,
//         firstName: response.data.user.first_name,
//         lastName: response.data.user.last_name,
//         email: response.data.user.email,
//         id: response.data.user.id,
//         profileId: response.data.id,
//         profileUrl: response.data.profile_picture,
//       };

//       // @TempIgnore below
//       // @ts-ignore
//       setUserEssentials(userStateData);
//       dispatch(
//         setUserStateAction({
//           user: userStateData,
//           isAuthenticated: true,
//         })
//       );
//     }

//     if (history) {
//       setTimeout(() => {
//         history.replace("/home");
//       }, 1000);
//     }

//     return response.data;
//   } catch (error) {
//     // console.log("Error Log Update Profile Request(Welcome Screen) => ", error);
//   }
// };

// export const fetchAllWorkCategories = async () => {
//   try {
//     let response = await axios({
//       method: "GET",
//       url: process.env.REACT_APP_API_URL + "/users/category/",
//     });

//     // console.log("action user tsx", response.data);
//     return response.data;
//   } catch (error) {
//     // console.log("Error Log Fetch Categories(Welcome Screen) => ", error);
//     return null;
//   }
// };

// export const fetchUpcomingGames = async (dispatch) => {
//   try {
//     let response = await axios({
//       method: "GET",
//       url: process.env.REACT_APP_API_URL + "/upcoming-games/",
//     });

//     // console.log("action user tsx", response.data);
//     dispatch(setUpcomingGames(response.data));
//   } catch (error) {
//     // console.log("Error Log Fetch Upcoming Games => ", error);
//   }
// };

// export const getUsersByUsername = async (username, dispatch) => {
//   try {
//     let response = await axios({
//       method: "GET",
//       url: process.env.REACT_APP_API_URL + "/users/?username=" + username,
//       headers: {
//         Authorization: "Token " + localStorage.getItem("token"),
//       },
//     });
//     // console.log("action user tsx", response.data);
//     dispatch(setSearchedUsers(response.data));
//   } catch (error) {
//     // console.log("Error Log GET Users by username => ", error);
//   }
// };
