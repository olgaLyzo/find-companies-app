import { api } from "../requests/axios";

export async function getAccountInfo() {
  const res = await api.get("/account/info");
	console.log(res)
  return res.data;
}