import React from "react";
import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form } from "antd";
import {
  LoginBtn,
  LoginWrapper,
  LoginMenuItem,
  LoginInput,
  LoginMenu,
  LoginForm,
  LoginFormTitle,
} from "../styles/LoginStyle";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("로그인 값: ", values);
  };
  const goHome = () => {
    navigate("/");
  };
  return (
    <LoginWrapper>
      <LoginForm
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <LeftOutlined onClick={goHome} />
        <LoginFormTitle>로그인</LoginFormTitle>
        <Form.Item
          name="id"
          rules={[
            {
              required: true,
              message: "아이디를 입력해주세요",
            },
          ]}
        >
          <LoginInput
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="아이디 또는 이메일"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요",
            },
          ]}
        >
          <LoginInput
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ textAlign: "left", fontSize: "0.75rem" }}
        >
          <Checkbox>로그인 상태 유지</Checkbox>
        </Form.Item>
        <Form.Item>
          <LoginBtn
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </LoginBtn>
        </Form.Item>
        <LoginMenu>
          <LoginMenuItem to="/joinpresenter">회원가입</LoginMenuItem>
          <LoginMenuItem to="/findpw">비밀번호를 까먹었나요?</LoginMenuItem>
        </LoginMenu>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;
