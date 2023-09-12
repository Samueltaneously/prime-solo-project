import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

// Importing in MUI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import MaterialUISwitch from './MuiSwitch';




function UserPage() {

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
    history.push('/info')
  }

  const buttonStyle = {
    // backgroundColor: 'black',
    color: 'white',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    '&:hover': {
      backgroundColor: 'darkgray',
    }
  };


  return (
    <Box className='userBackground'>

      <Grid container
        rowGap={5}
        columnGap={5}
        alignItems="center"
        justifyContent="center"
        xs={12}>


        <Grid>

          <Box style={buttonStyle}>
            <h2>Describe your dream:</h2>
          </Box>

          <Box>
            <form>
              <textarea type="text"
                name="Dream_Description"
                placeholder='Enter dream description here...'
                className="form-control"
                style={{ height: '20em', width: '30em' }}
                value={dream_description}
                onChange={(event) => setDream_Description(event.target.value)}>
              </textarea>
            </form>
          </Box>

          <span style={buttonStyle}>
            <span>Dream</span>
            <MaterialUISwitch />
            <span>Nightmare</span>
          </span>

          <Button onClick={handleSubmit} style={buttonStyle} sx={{ marginLeft: '20%', backgroundColor: 'black', border: '1px white solid' }} > Save Dream</Button>


        </Grid>


      </Grid>
    </Box >
  );
}

export default UserPage;
