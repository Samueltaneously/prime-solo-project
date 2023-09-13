import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

// Importing in MUI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import MaterialUISwitch from './MuiSwitch';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';




function UserPage() {

  const [dream_description, setDream_Description] = useState('')
  const [dreamType, setDreamType] = useState('default');
  const [backgroundImage, setBackgroundImage] = useState('default-background');
  // const [isNightmare, setIsNightmare] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.body.classList.add('default-background');
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    let newDream = {
      dream_description: dream_description,
      dream_type: dreamType,
      // isNightmare: isNightmare,
    }
    dispatch({
      type: "ADD_DREAM",
      payload: newDream
    })
    history.push('/info')
  }

  const handleDreamTypeChange = (event) => {
    setDreamType(event.target.value);
    // Add or remove CSS classes based on the selected DreamType
    if (event.target.value === 'good') {
      document.body.classList.remove('nightmare-background', 'default-background');
      document.body.classList.add('good-background');
    } else if (event.target.value === 'nightmare') {
      document.body.classList.remove('good-background', 'default-background');
      document.body.classList.add('nightmare-background');
    } else {
      document.body.classList.remove('good-background', 'nightmare-background');
      document.body.classList.add('default-background');
    }
  };


  // Define background styles based on SWITCH state
  // const userBackgroundStyle = {
  //   backgroundImage: isNightmare
  //     ? 'url("nightmare-background.jpg")' // nightmare background
  //     : 'url("default-background.jpg")', // default background
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundPosition: 'center',
  //   minHeight: '100vh',
  // };

  const buttonStyle = {
    // backgroundColor: 'black',
    color: 'white',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    '&:hover': {
      backgroundColor: 'darkgray',
    }
  };


  return (
    <Box>

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

          {/* Code for MUI Switch Background Option */}
          {/* <span style={buttonStyle}>
            <span>Dream</span>
            <MaterialUISwitch
              checked={isNightmare}
              onChange={() => setIsNightmare(!isNightmare)} // switch state toggles dream background
            />
            <span>Nightmare</span>
          </span> */}

          <RadioGroup
            row
            aria-label="dreamType"
            name="dreamType"
            value={dreamType}
            onChange={handleDreamTypeChange}
            style={buttonStyle}
          >
            <FormControlLabel
              value="good"
              control={<Radio style={{ color: 'white' }} />}
              label="Good"
            />
            <FormControlLabel
              value="default"
              control={<Radio style={{ color: 'grey' }} />}
              label="Normal"
            />
            <FormControlLabel
              value="nightmare"
              control={<Radio style={{ color: 'red' }} />}
              label="Nightmare"
            />
          </RadioGroup>

          <Button
            onClick={handleSubmit}
            style={buttonStyle}
            sx={{ marginLeft: '20%', backgroundColor: 'black', border: '1px white solid' }} > Save Dream</Button>


        </Grid>


      </Grid>
    </Box >
  );
}

export default UserPage;
