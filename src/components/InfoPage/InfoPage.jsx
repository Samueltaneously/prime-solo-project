import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import LogOutButton from '../LogOutButton/LogOutButton';

// Importing in MUI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';

function InfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dreams = useSelector(store => store.allDreamsReducer);
  const user = useSelector(store => store.user);
  const [expanded, setExpanded] = useState({});
  const [flipped, setFlipped] = useState({});
  const [cardContent, setCardContent] = useState({});

  useEffect(() => {
    dispatch({ type: 'GET_ALL_DREAMS' });
  }, []);


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


  const handleExpandClick = (id) => {
    // setExpanded(prevExpanded => ({ ...prevExpanded, [id]: !prevExpanded[id] }));
    // setExpanded({ [id]: true }); // Expand the clicked card

    // Allows only one card to be expanded at once, to fix bug of removed cards from DOM
    // when whole row is expanded
    setExpanded((prevExpanded) => {
      const newExpanded = {};
      for (const cardId in prevExpanded) {
        newExpanded[cardId] = false;
      }
      newExpanded[id] = !prevExpanded[id];
      return newExpanded;
    });

  };

  const handleTransform = (id) => {
    // Commented out flips as many cards as desired
    // setFlipped(prevFlipped => ({ ...prevFlipped, [id]: !prevFlipped[id] }));

    // Current code allows only one card to be flipped
    setFlipped((prevFlipped) => {
      const newFlipped = { ...prevFlipped };

      // If card is not flipped, it flips and unflips all others
      if (!newFlipped[id]) {
        for (const cardId in newFlipped) {
          newFlipped[cardId] = false;
        }
        newFlipped[id] = true;
      } else {
        // If the clicked card is already flipped, it gets unflipped
        newFlipped[id] = false;
      }

      return newFlipped;
    });
  }

  const handleDelete = (id) => {
    dispatch({
      type: 'DELETE_DREAM', payload: id
    })
  }




  return (
    <main>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>


        <h1>Dream List</h1>


        {/* Grid for displaying all dreams*/}
        <Box className="scroll-container" sx={{ height: '1000px', overflowY: 'auto' }}>
          <Grid container
            xs={12}
            spacing={3}
            columnGap={4}
            rowGap={5}>
            {dreams.map(dream => (


              <div key={dream.id} className={`dreamcard ${expanded[dream.id] ? 'expanded' : ''}`}
                onClick={() => { handleTransform(dream.id) }}
                style={{ transform: `${flipped[dream.id] ? 'rotateY(180deg)' : 'rotateY(0deg)'}` }}>

                {/* Front of card */}
                <Card className="card-front" sx={{ width: 400 }}>
                  <CardMedia
                    sx={{ height: 256 }}
                    image={dream.dream_image_url}
                    title={dream.dream_title}
                    onClick={() => history.push(`/details/${dream.id}`)}
                  />
                  <CardContent >
                    <Typography gutterBottom variant="h5" component="div">
                      {dream.dream_title}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton onClick={() => { handleDelete(dream.id) }}>
                      <DeleteIcon />
                    </IconButton>

                    <ExpandMore
                      expand={expanded[dream.id]}
                      onClick={() => {
                        handleExpandClick(dream.id); setCardContent((prevCardContent) => ({
                          ...prevCardContent,
                          [dream.id]: dream.dream_description,
                        }));
                      }}
                      aria-expanded={expanded[dream.id]}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>

                  </CardActions>
                  <Collapse in={expanded[dream.id]} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>{dream.date}</Typography>
                      <Typography paragraph>
                        {dream.dream_description}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>

                {/* Back of card */}
                <Card className="card-back" sx={{ width: 400 }}>
                  <Card>
                    <CardContent>
                      <Typography paragraph>
                        {dream.dream_interpretation}
                      </Typography>
                    </CardContent>
                  </Card>
                  <CardContent >
                    <Typography gutterBottom variant="h5" component="div">
                      {dream.dream_title}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <ExpandMore
                      expand={expanded[dream.id]}
                      onClick={() => {
                        handleExpandClick(dream.id); setCardContent((prevCardContent) => ({
                          ...prevCardContent,
                          [dream.id]: dream.dream_description,
                        }));
                      }}
                      aria-expanded={expanded[dream.id]}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>

                  </CardActions>
                  <Collapse in={expanded[dream.id]} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>{dream.date}</Typography>
                      <Typography paragraph>
                        {dream.dream_description}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </div>

            ))}
          </Grid>
        </Box>


        {/* Profile Information Display */}
        <Box sx={{ display: 'flex' }}>
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
  );
}

export default InfoPage;
