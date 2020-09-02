// eslint-disable-next-line import/prefer-default-export
export const getUserType = () => {
//   sessionStorage.setItem("user_type", "superAdmin");
  const userType = sessionStorage.getItem("user_type");

  const mallId = sessionStorage.getItem("mall_id");

  return [userType, mallId];
};
