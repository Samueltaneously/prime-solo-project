import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const user = useSelector((store) => store.user);
  const [dream_description, setDream_Description] = useState('')

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("inside handleSubmit")
    let newDream = {
      dream_description: dream_description,

    }
    console.log(`Adding newDream`, { newDream })
    dispatch({
      type: "ADD_DREAM",
      payload: newDream
    })
    history.push('/checkoutpage')
  }


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h2>Describe your dream:</h2>
      <form>
        <textarea type="text"
          name="Dream_Description"
          placeholder='Enter dream description here...'
          className="form-control"
          value={dream_description}
          onChange={(event) => setDream_Description(event.target.value)}>
        </textarea>
        <button onClick={handleSubmit} className='btn'>Save Dream!</button>
      </form>
      <LogOutButton className="btn" />
    </div>
  );
}

export default UserPage;
