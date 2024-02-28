import React, { useState } from 'react';
import "../Styles/PasswordValid.css";

const PasswordValid = ({ onPasswordValid }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 부모 컴포넌트에게 기존 비밀번호 유효성 검사를 요청합니다.
        onPasswordValid(password);
    };

    return (
        <div className='ValidForm'>
            <h3>본인 확인을 위해 비밀번호를 <br/> 다시 확인해주세요</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <h4>비밀번호 확인</h4>
                    <br />
                    <input className='ValidInput'
                        type="password"
                        value={password}
                        placeholder='비밀번호를 입력해주세요.'
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>
                <br />
                <button className='ValidBtn' type="submit">비밀번호 확인</button>
            </form>
        </div>
    );
};

export default PasswordValid;
