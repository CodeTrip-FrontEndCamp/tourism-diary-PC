import "./index.scss";
import { Card, Form, Input, Button, Radio ,message} from "antd";
import logo from "@/assets/logo.png";
import { useAppDispatch } from '@/store/hook';
import { fetchLogin } from '@/store/module/user';
import { useNavigate } from 'react-router-dom';

export interface logindata {
  moblie: string,
  code: string,
  role:string
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onFinish = async (values: logindata) => {
    await dispatch(fetchLogin(values))
    navigate('/')
    message.success('登录成功')
  };

  

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          name="login-form"
          initialValues={{ role: "reviewer" }} // 默认选择审核人员
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
