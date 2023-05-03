import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import {useDispatch, useSelector} from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LOGOUT_REQUEST } from "../constants/actionTypes";

//사이트 로고 부분
const Title = styled(Link)`
  text-decoration: none;
  text-align: right;
  color: black;
  font-size: 2rem;
`;
const HeaderWrapper = styled.div`
  text-align: left;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
const ProfileWrapper = styled.div`
  padding-top: 5px;
  float: right;
  text-decoration: none;
  color: black;
`;

const Header = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); //임시로 로그인 여부 상태 생성
  const {isLogIn} = useSelector((state)=>state.user);
  const {me}= useSelector((state)=>state.user);
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch({
      type:LOGOUT_REQUEST
    })
  }

  useEffect(()=>{
    console.log(isLogIn)
    console.log(me);
  },[isLogIn])
  return (
    <HeaderWrapper>
      <Title to="/">HIGHWAY</Title>
      <ProfileWrapper>
        {isLogIn ? (
          <Link
            to="/profile"
            style={{ float: "right", textDecoration: "none", color: "black" }}
          >
            <Avatar
              size={28}
              icon={<UserOutlined />}
              style={{ marginRight: "5px" }}
            />
            {me.userName}
            <Link to = "/"
              onClick={onLogOut}
            >
            로그아웃
            </Link>
          </Link>
        ) : (
          <Link to="/login" style={{ float: "right" }}>
            로그인
          </Link>
        )}
      </ProfileWrapper>
    </HeaderWrapper>
  );
};

export default Header;
