import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
// import { makeStyles } from '@mui/material/styles';


function InfoPage() {

  // const useStyles = makeStyles((theme) => ({
  //   right: {
  //     marginLeft: 'auto'
  //   }
  // }));

  const dispatch = useDispatch();
  const history = useHistory();
  const dreams = useSelector(store => store.allDreamsReducer);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_DREAMS' });
  }, []);

  return (
    <main>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <h1>Dream List</h1>

        <Box>
          <Grid
            container
            xs={12}
            spacing={3}
            columnGap={4}
            rowGap={5}>
            {dreams.map((dream) =>

              <Card sx={{ width: 300 }} key={dream.id}>

                <CardMedia
                  sx={{ height: 200 }}
                  image={dream.dream_image_url}
                  title={dream.title}
                  onClick={() => history.push(`/details/${dream.id}`)}
                />

                <CardContent sx={{ height: 200 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {dream.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {dream.dream_description}
                  </Typography>
                </CardContent>

              </Card>

            )}
          </Grid>
        </Box>


        <Box
          sx={{ display: 'flex' }}>
          <div>
            <Card sx={{ width: 400 }}>
              <h3>Welcome, {user.username}!</h3>
              <p>Your ID is: {user.id}</p>
              <LogOutButton className="btn" />
            </Card>
          </div>
        </Box>

      </Box>
    </main >
  )
}

export default InfoPage;
