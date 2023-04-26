import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { Primary } from '../res/themes.js';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function CardComponent(props) {
  const deleteEntry = () => {
    axios.get('http://localhost:2003/od-application/delete-entry/' + props.id, 
    {withCredentials: true}
    ).then(alert('Entry Deleted'))
      .catch((err) => console.log(err));

    window.location.reload(true);
  }

  return (
    <Card sx={{ 
      minWidth: 345,
       display: 'flex', 
       flexDirection: 'row', 
       boxShadow: 3, 
       marginTop: 2, 
       bgcolor: alpha(Primary['card-bg'], Primary['card-opacity']) 
       }}>
      <Box sx={{ display: 'flex', width: '1%', bgcolor: alpha(Primary[props.status], 1) }}></Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography gutterBottom variant="h5" component="div">
                {props.event}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.organization}
              </Typography>
              <Typography variant="body2">
                Outcome: {props.outcome}
                <br />
                {'From  ' + props.start_date.substring(0, 10) + '  to  ' + props.end_date.substring(0, 10)}
              </Typography>
              <Typography variant="body3">
                Status: {props.status}
              </Typography>
          </CardContent>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        marginLeft: 'auto', 
        justifyContent: 'space-between',
        paddingTop: 1,
        paddingBottom: 1
        }}>
        <CardActions>
          <Button 
            size="small" 
            disabled={!(props.status === 'PENDING')} 
            color="primary" 
            sx={{ marginLeft: 'auto' }}
          >
            <Typography variant='button' sx={{ paddingRight: 1 }}>Edit</Typography>
            <FontAwesomeIcon icon={ faPen }/>
          </Button>
        </CardActions>

        <CardActions>
          <Button 
            size="small" 
            disabled={(props.status === 'APPROVED')} 
            color="error" sx={{ marginBottom: 0 }}
            onClick={() => {
              deleteEntry();
            }}
          >
            <Typography variant='button' sx={{ paddingRight: 1 }}>Delete</Typography>
            <FontAwesomeIcon icon={ faTrashCan }/>
          </Button>
        </CardActions>
      </Box>
    </Card>
    
  );
}
