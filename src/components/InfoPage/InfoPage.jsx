import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';


function InfoPage() {


  const dispatch = useDispatch();
  const history = useHistory();
  const dreams = useSelector(store => store.allDreamsReducer);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_DREAMS' });
  }, []);

  return (

    <main>

      <div className='container'>
        <h3>Welcome, {user.username}!</h3>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>

      <div className='container'>
        <h1>Dream List</h1>
        <section className="dreams">
          {dreams.map(dream => {
            return (
              <div key={dream.id} >
                <h3>{dream.title}</h3>
                <p>{dream.dream_description}</p>
                <img src={dream.dream_image_url} alt={dream.title} onClick={() => history.push(`/details/${dream.id}`)} />
              </div>

            );
          })}
        </section>
      </div>
    </main>

  );
}

export default InfoPage;
