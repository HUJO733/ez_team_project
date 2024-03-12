import { Link } from "react-router-dom";
import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { handlePostcode } from "./Postcodehandle";
import axios from "axios";
// import './Register.css'
import "../Styles/RegisterPersonal.css";

function RegisterPersonal() {
  const [username, setUsername] = useState(""); //이름
  const [email, setEmail] = useState(""); //이메일
  const [password, setPassword] = useState(""); //비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); //비밀번호확인
  const [openPostcode, setOpenPostcode] = useState(false); //주소
  const [address, setAddress] = useState(""); //주소
  const [detailedaddress, setdetailedaddress] = useState(""); //상세주소
  const [phonenumber, setphonenumber] = useState(""); //핸드폰번호
  const [emailDuplication, setEmailDuplication] = useState(true); //이메일 유효성
  // 이메일 유효성 검사 02/14 김민호

  const handle = handlePostcode(openPostcode, setOpenPostcode, setAddress);

  const setPasswordMatch = (match) => {
    // setPasswordMatch(true) 또는 setPasswordMatch(false) 등으로 사용
  };

  // 이메일 유효성 검사 02/14 김민호
  const handleEmailDuplicationCheck = () => {
    if (!email) {
      alert("이메일을 입력해주세요!");
      return;
    }

    // 클라이언트가 서버에 이메일 중복 확인을 요청합니다./0214 김민호
    axios
      .post("http://localhost:8000/checkEmailDuplication", { email })
      .then((response) => {
        console.log("서버 응답:", response.data);
        setEmailDuplication(response.data.success);
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("이메일 중복 확인 중 오류:", error);
        alert("client :: 이메일 중복 확인 중 오류가 발생했습니다.");
      });
  };

  const handleRegisterClick = () => {
    if (!username || !email || !password || !confirmPassword || !address) {
      alert("정보를 모두 입력해주세요!");
      return;
    }
    if (!emailDuplication) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }

    if (!email) {
      alert("이메일을 입력해주세요!");
      return;
    }
    if (!emailDuplication) {
      alert("이미 등록된 이메일입니다.");
      return;
    }
    // if (!email.includes('@')) {
    //   alert('이메일을 입력해주세요!');
    //   return;
    // }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      setPasswordMatch(false);
      return;
    }
    // 이메일이 중복되었는지 확인합니다.
    // 이메일 유효성 검사 02/14 김민호

    // if (password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //   alert('비밀번호는 최소 10글자 이상이어야 하며, 특수문자를 포함해야 합니다.');
    //   return;
    // }

    // 클라이언트에서 서버로 회원가입 요청
    axios
      .post("http://localhost:8000/regester", {
        username,
        password,
        email,
        address,
        detailedaddress,
        phonenumber,
        usertype: "personal",
      })
      .then((response) => {
        console.log("서버 응답:", response.data);
        alert("회원가입이 완료되었습니다.");
        if (response.data.userType === 1) {
          // 개인 사용자 처리
        }
        window.location.href = "/"; // 홈 페이지 또는 다른 페이지로 리디렉션
      })
      .catch((error) => {
        if (error.response) {
          // 서버가 응답한 상태 코드가 2xx가 아닌 경우
          console.error(
            "서버 응답 오류:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          // 서버로 요청이 전송되었지만 응답이 없는 경우
          console.error("서버 응답이 없음:", error.request);
        } else {
          // 요청을 설정하는 중에 에러가 발생한 경우
          console.error("요청 설정 중 오류:", error.message);
        }
        alert("서버와의 통신 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="regi-page">
      <div className="regi-form">
        <h2>회원가입</h2>
        <input
          type="text"
          placeholder="사용자명"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />

        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="regi-email__button"
          onClick={handleEmailDuplicationCheck}
        >
          이메일 확인
        </button>
        {/* 이메일 유효성 검사 02/14 김민호 */}

        <br />

        <input
          type="text"
          placeholder="핸드폰번호"
          value={phonenumber}
          onChange={(e) => setphonenumber(e.target.value)}
        />

        <br />
        <input
          type="text"
          placeholder="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="button" className="regi-addr__button" onClick={handle.clickButton}>
          주소 선택
        </button>
        {openPostcode && (
          <DaumPostcode
            onComplete={handle.selectAddress}
            autoClose={false}
            defaultQuery=""
          />
        )}
        <br />
        <input
          type="text"
          placeholder="상세주소"
          value={detailedaddress}
          onChange={(e) => setdetailedaddress(e.target.value)}
        />
        <br />
        <button className="regi-complete__button" onClick={handleRegisterClick}>
          가입완료
        </button>
        <div className="regi-button__to-login">
          <Link to="/Login">로그인창</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPersonal;
