import { Layout, Menu, Popconfirm } from "antd";
import { HomeOutlined, DiffOutlined, LogoutOutlined } from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLogout, getProfile } from "@/store/modules/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selected = location.pathname;
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.user.userInfo);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const onConfirm = () => {
    dispatch(userLogout());
    navigate("/login");
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="light"
            selectedKeys={[selected]}
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
            onClick={(router) => {
              navigate(router.key);
            }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
