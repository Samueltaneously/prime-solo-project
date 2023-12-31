import React, { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import LogOutButton from '../LogOutButton/LogOutButton';
import DeleteConfirmationModal from './DeleteConfirmation';
import { format } from 'date-fns';

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
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function InfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dreams = useSelector(store => store.allDreamsReducer);
  const user = useSelector(store => store.user);

  const [expanded, setExpanded] = useState({});
  const [flipped, setFlipped] = useState({});
  const [cardContent, setCardContent] = useState({});
  const [editableDescriptions, setEditableDescriptions] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dreamIdForDelete, setDreamIdForDelete] = useState(null);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_DREAMS' });
  }, [dreams]);



  //  Card expanding logic
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


  // Handles card expanding
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


  // Handles card flipping
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


  // Handles deleting of cards
  const handleDelete = (dreamID) => {
    setDreamIdForDelete(dreamID);
    setDeleteModalOpen(true);
  };
  const handleConfirmDelete = () => {
    dispatch({
      type: 'DELETE_DREAM',
      payload: dreamIdForDelete,
    });

    // Close modal
    setDeleteModalOpen(false);
  };


  const handleImageGeneration = (dreamID) => {
    dispatch({
      type: 'SEND_FOR_IMAGE',
      payload: dreamID
    })
  }


  const handleInterpretationGeneration = (dreamID) => {
    dispatch({
      type: 'SEND_FOR_INTERPRETATION',
      payload: dreamID
    })
  }


  // Handles toggling dream description editing
  const handleEditDescription = (dreamID) => {
    // Toggle edit mode for the description
    setEditableDescriptions(prevEditableDescriptions => ({
      ...prevEditableDescriptions,
      [dreamID]: !prevEditableDescriptions[dreamID],
    }));
  };

  const handleDescriptionChange = (dreamID, event) => {
    // Update description in the state when the input field changes
    setCardContent(prevCardContent => ({
      ...prevCardContent,
      [dreamID]: event.target.value,
    }));

  };

  const handleSaveDescription = (id) => {
    // Dispatch the action to update the dream description
    dispatch(editDreamDescription(id, cardContent[id]));

    // Toggle off the edit mode
    setEditableDescriptions(prevEditableDescriptions => ({
      ...prevEditableDescriptions,
      [id]: false,
    }));
  };

  const editDreamDescription = (dreamId, newDescription) => ({
    type: 'EDIT_DREAM_DESCRIPTION',
    payload: { dreamId, newDescription },
  });



  return (
    <main>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '8vh',
        color: 'whitesmoke',
      }}>
        <h1>Dream List</h1>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>


        {/* Grid for displaying all dreams*/}
        <Box className="scroll-container" sx={{ marginLeft: '40px', marginTop: '0px', height: '1000px', overflowY: 'auto' }}>
          <Grid container
            xs={12}
            spacing={3}
            columnGap={6}
            rowGap={11}>
            {dreams.map((dream) => {
              const dreamDate = new Date(dream.timestamp);
              // Formatting date into MM/DD/YYYY format
              const formattedDate = format(dreamDate, 'MM/dd/yyyy hh:mm a');
              const noImage = !dream.dream_image_url;
              return (

                <div key={dream.id} className={`dreamcard ${expanded[dream.id] ? 'expanded' : ''}`}

                  style={{ transform: `${flipped[dream.id] ? 'rotateY(180deg)' : 'rotateY(0deg)'}` }}>

                  {/*---------- Front of dreamcard ----------*/}
                  <Card className="card-front"
                    sx={{
                      backgroundColor: '#424242fa',
                      color: 'whitesmoke',
                      boxShadow: '2px 2px 10px white',
                    }}>
                    {noImage ? (
                      <CardContent
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '156px'
                        }}>
                        <Button variant="outlined" color="primary" onClick={() => { handleImageGeneration(dream.id) }}>
                          View Dream Image
                        </Button>
                      </CardContent>
                    ) : (
                      <CardMedia
                        sx={{ height: 256 }}
                        image={dream.dream_image_url}
                        title={dream.dream_title}
                      />
                    )}
                    <CardContent >
                      <Typography gutterBottom variant="h5" component="div"
                        onClick={() => { handleTransform(dream.id) }}>
                        {dream.dream_title}
                        <Button>Dream Info </Button>
                      </Typography>
                      <Typography paragraph>{formattedDate}</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites" sx={{ color: '#186BCC', }}>
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share" sx={{ color: '#186BCC', }}>
                        <ShareIcon />
                      </IconButton>
                      <IconButton onClick={() => { handleDelete(dream.id) }} sx={{ color: '#186BCC', }}>
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
                        aria-label="show more">
                        <ExpandMoreIcon sx={{ color: 'whitesmoke', }} />
                      </ExpandMore>

                    </CardActions>

                    <Collapse in={expanded[dream.id]} timeout="auto" unmountOnExit>
                      <CardContent>

                        <Typography paragraph>
                          {dream.dream_description}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>

                  {/*---------- Back of dreamcard ----------*/}
                  <Card className="card-back"
                    sx={{
                      backgroundColor: '#424242fa',
                      color: 'whitesmoke',
                      boxShadow: '2px 2px 10px white',
                    }}>
                    <CardContent>
                      <Typography style={{ marginTop: '5px' }} variant="h6" gutterBottom>
                        Interpretation:
                      </Typography>
                      {dream.dream_interpretation ? (

                        <div
                          style={{
                            border: '2px solid #007bff',
                            padding: '10px',
                            borderRadius: '5px',
                          }}>
                          <Typography paragraph>
                            {dream.dream_interpretation}
                          </Typography>
                        </div>

                      ) : (

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Button style={{ marginTop: '5px' }} variant="outlined" color="primary" onClick={() => { handleInterpretationGeneration(dream.id) }}>
                            Generate Interpretation
                          </Button>
                        </div>
                      )}
                    </CardContent>
                    <CardContent >
                      <Typography gutterBottom variant="h5" component="div"
                        onClick={() => { handleTransform(dream.id) }}>
                        {dream.dream_title}
                        <Button>Dream Image </Button>
                      </Typography>
                      <Typography paragraph>{formattedDate}</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites" sx={{ color: '#186BCC', }}>
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share" sx={{ color: '#186BCC', }}>
                        <ShareIcon />
                      </IconButton>
                      <IconButton onClick={() => { handleDelete(dream.id) }} sx={{ color: '#186BCC', }}>
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
                        aria-label="show more">
                        <ExpandMoreIcon sx={{ color: 'whitesmoke', }} />
                      </ExpandMore>

                    </CardActions>
                    <Collapse in={expanded[dream.id]} timeout="auto" unmountOnExit>
                      <CardContent>
                        {editableDescriptions[dream.id] ? (
                          <textarea
                            style={{ width: '30rem', height: '10rem' }}
                            value={cardContent[dream.id] || ''}
                            onChange={(e) => handleDescriptionChange(dream.id, e)} />

                        ) : (

                          <Typography paragraph>{dream.dream_description}</Typography>
                        )}
                        {editableDescriptions[dream.id] && (
                          <Button onClick={() => handleSaveDescription(dream.id)}>Save Description</Button>
                        )}
                        {!editableDescriptions[dream.id] && (
                          <Button onClick={() => handleEditDescription(dream.id)}>Edit Description</Button>
                        )}
                      </CardContent>
                    </Collapse>
                  </Card>
                </div>

              )
            })}
          </Grid>
        </Box>



        {/*---------- Profile Information Display ----------*/}
        <Box sx={{ display: 'flex' }}>
          <div>
            <Card
              sx={{
                width: 450,
                backgroundColor: '#424242fa',
                color: 'whitesmoke', marginTop: '20px',
                marginRight: '20px',
                border: '2px solid #007bff',
                borderRadius: '10px',
                boxShadow: '2px 2px 10px white',
              }}>
              <CardContent>
                {/* User Avatar */}
                <Avatar alt={user.username} src={user.profile_pic_url}
                  sx={{
                    width: 150,
                    height: 150,
                    backgroundColor: '#fff',
                    color: '#007bff'
                  }}>
                  {user.username[0].toUpperCase()}
                </Avatar>

                {/* User Info */}
                <Typography variant="h5" component="div" sx={{ marginTop: '10px' }}>
                  {user.username}
                </Typography>
                <Typography variant="body2" color="whitesmoke">
                  User ID: {user.id}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Box>



        {/*---------- Modals ----------*/}
        <DeleteConfirmationModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete} />

      </Box>
    </main >
  );
}

export default InfoPage;
