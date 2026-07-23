import { api } from "../requests/axios";

export async function getAccountInfo() {
  const res = await api.get("/account/info");
  return res.data;
}