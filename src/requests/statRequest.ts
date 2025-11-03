import { api } from "../requests/axios";

export interface AccountInfoResponse {
  eventFiltersInfo: {
    usedCompanyCount: number;
    companyLimit: number;
  };
}

export async function getAccountInfo(): Promise<AccountInfoResponse> {
  const res = await api.get("/account/info");
  return res.data;
}