const TOKEN_LOCATION = 'token';
const USER_ESSENTIALS_LOCATION = 'adminuser';

export const setUserTokenInLocal = (token) => {
  localStorage.setItem(TOKEN_LOCATION, token);
};

export const setUserEssentials = (payload) => {
  localStorage.setItem(USER_ESSENTIALS_LOCATION, JSON.stringify(payload));
};

export const getUserAccessToken = () => {
  try {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) throw new Error("Token doesn't exist");
    return tokenString;
  } catch (err) {
    // console.log(err);
    return null;
  }
};

export const getUserEssentials = () => {
  try {
    const userEssentialsString = localStorage.getItem(USER_ESSENTIALS_LOCATION);
    const userEssentialsRetrieved = JSON.parse(userEssentialsString);
    // console.log("storage user", { userEssentialsRetrieved });
    return userEssentialsRetrieved;
  } catch (error) {
    // console.log("Could not get user essentials");
    console.error({ error });
    return null;
  }
};
