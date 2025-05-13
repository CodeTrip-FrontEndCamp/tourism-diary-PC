import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { ReactElement } from "react";

const AuthRouter = ({ children }: { children: ReactElement }) => {
  const token = useSelector((state: any) => state.user.token);
  const location = useLocation();

  if (token) {
    return children;
  } else {
    message.warning("请先登录");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
};

export default AuthRouter;
