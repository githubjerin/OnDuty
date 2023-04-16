import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { Primary } from './res/themes.js';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';

export default function CardComponent() {
  return (
    <Card sx={{ 
      minWidth: 345,
       display: 'flex', 
       flexDirection: 'row', 
       boxShadow: 3, 
       marginTop: 2, 
       bgcolor: alpha(Primary['card-bg'], Primary['card-opacity']) 
       }}>
      <Box sx={{ display: 'flex', width: '1%', bgcolor: alpha(Primary['pending'], 1) }}></Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography gutterBottom variant="h5" component="div">
                  Technovation
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                REC
              </Typography>
              <Typography variant="body2">
                Outcome: WINNER
                <br />
                {'From   to  ' }
              </Typography>
              <Typography variant="body3">
                Status: APPROVED
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
          <Button size="small" disabled={true} color="primary" sx={{ marginLeft: 'auto' }}>
            <Typography variant='button' sx={{ paddingRight: 1 }}>Edit</Typography>
            <FontAwesomeIcon icon={ faPen }/>
          </Button>
        </CardActions>

        <CardActions>
          <Button size="small" disabled={true} color="error" sx={{ marginBottom: 0 }}>
            <Typography variant='button' sx={{ paddingRight: 1 }}>Delete</Typography>
            <FontAwesomeIcon icon={ faTrashCan }/>
          </Button>
        </CardActions>
      </Box>
    </Card>
    
  );
}
