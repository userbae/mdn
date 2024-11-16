import { userInfo } from "@/shared";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const PublicRoute = () => {
  const user = useRecoilValue(userInfo);
  console.log(!!user.token);
  return !!user.token ? <Navigate to={"/"} /> : <Outlet />;
};
