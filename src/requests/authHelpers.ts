export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("tokenExpire");
  localStorage.removeItem("userName");
  localStorage.removeItem("userSurname");
  localStorage.removeItem("userAvatar");

  window.location.href = "/login";
}
