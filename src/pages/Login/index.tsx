import "./index.scss";
import { Card, Form, Input, Button, Radio } from "antd";
import logo from "@/assets/logo.png";
import { userLogin } from "@/store/modules/user";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";

export interface logindata {
  username: string;
  password: string;
  role: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const onFinish = async (values: logindata) => {
    try {
      await dispatch(userLogin(values));
      // 如果有之前的路径，就跳转回去，否则跳转到首页
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    } catch (error) {
      // 错误已经在 userLogin action 中处理了
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form
          name="login-form"
          initialValues={{ role: "reviewer" }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "请输入账号" },
              { min: 4, message: "账号不能少于4个字符" },
            ]}
          >
            <Input size="large" placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "请输入密码" },
              { min: 6, message: "密码不能少于6位" },
            ]}
          >
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: "请选择身份" }]}
          >
            <Radio.Group>
              <Radio value="reviewer">审核人员</Radio>
              <Radio value="admin">管理员</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
