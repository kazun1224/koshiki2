export const fetchUser:() => string| null = () => {
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : localStorage.clear();

  return userInfo;
};

export const userAccessToken:() => string| null = () => {
  const accessToken =
    localStorage.getItem("accessToken") !== "undefined"
      ? JSON.parse(localStorage.getItem("accessToken") || "{}")
      : localStorage.clear();

  return accessToken;
};
