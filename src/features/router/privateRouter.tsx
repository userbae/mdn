import { userInfo } from "@/shared";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const PrivateRoute = () => {
  const user = useRecoilValue(userInfo);

  return !!user.token ? <Outlet /> : <Navigate to={`/login`} />;
};
