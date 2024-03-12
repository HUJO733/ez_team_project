import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Register() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  // const handleRegesterClick = () => {
    
  //   // 회원가입이 성공하면 다음 경로로 이동합니다.
  //   navigate("/");
  // };

  return (
    <div className="register-page__box">
      {/* 각 버튼 클릭 시에 해당 페이지로 이동하는 버튼을 추가합니다 */}
      <button className="register-page__box-personal" onClick={() => navigateTo("/Register/personal")}>
        개인 회원가입
      </button>
      <button className="register-page__box-corperate" onClick={() => navigateTo("/Register/corporate")}>
        기업 회원가입
      </button>
      <button className="register-page__box-group" onClick={() => navigateTo("/Register/group")}>
        단체 회원가입
      </button><br/>
      <Link to="/login">로그인창</Link>
    </div>
  );
}

export default Register; 