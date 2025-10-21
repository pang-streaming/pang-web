import { loginUser as sharedLoginUser, logoutUser as sharedLogoutUser } from "@pang/shared/ui";
import { queryClient } from "@/shared/lib/query-client";

export const loginUser = sharedLoginUser;

export const logoutUser = async () => {
  sharedLogoutUser();
  queryClient.clear();
}