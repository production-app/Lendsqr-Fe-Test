import { get } from "../index";

export const usersUrl =
  "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";

export const getUsers = () => get(usersUrl);
export const getSingleUser = (userId: string | undefined) =>
  get(`${usersUrl}/${userId}`);
