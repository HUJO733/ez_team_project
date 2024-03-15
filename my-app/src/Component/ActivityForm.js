// ActivityForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import "../Styles/MyPage.css";

const ActivityForm = ({userId}) => {
    const [actiData, setActiData] = useState([]);
    const [commData, setCommData] = useState([]);

    useEffect(() => {
      const fetchActi = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/acti-post&comment/${userId}`);
            const userData = response.data;
            setActiData(userData.post);
            setCommData(userData.comment);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    fetchActi();
  }, [userId]);

  return (
  <div className='acti-form'>
    <div className='acti-content'>

      <div className="my-form__title">
      <p className="my-form__text">나의 활동</p>
      </div>

      <div className='form-table-wrapper'>
      <div className='acti-content__list'>
        <p>내가 쓴 글</p>
        <table className='forms-table'>
          <thead>
            <tr>
              {/* <th className='forms-table__num'>No.</th> */}
              <th className='forms-table__title'>내용</th>
              <th className='forms-table__date'>날짜</th>
            </tr>
          </thead>
          <tbody>
            {actiData.map(activity => (
              <tr key={activity.postid}>
                {/* <td>{activity.postid}</td> */}
                <td>
                  <Link className='content__link' to={`/Community/Read/${activity.postid}`}>
                  <span>{activity.title.length > 25 ? activity.title.substring(0, 25) + '...' : activity.title}</span>
                  </Link>
                </td>
                <td>{moment(activity.createdAt).format('MM월 DD일')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='acti-content__list'>
        <p>내가 남긴 댓글</p>
        <table className='forms-table'>
          <thead>
            <tr>
              {/* <th className='forms-table__num'>No.</th> */}
              <th className='forms-table__title'>내용</th>
              <th className='forms-table__date'>날짜</th>
            </tr>
          </thead>
          <tbody>
            {commData.map(activity => (
              <tr key={activity.postid}>
                {/* <td>{activity.postid}</td> */}
                <td>
                  <Link className='content__link' to={`/Community/Read/${activity.postid}`}>
                    {/* <span>{activity.content}</span> */}
                  <span>{activity.content.length > 25 ? activity.content.substring(0, 25) + '...' : activity.content}</span>

                  </Link>
                </td>
                <td>{moment(activity.createdAt).format('MM월 DD일')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

    </div>

   
  </div>
);

};

export default ActivityForm;

