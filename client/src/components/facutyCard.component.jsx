import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material';
import { Primary } from '../res/themes.js';


export default function CardComponent(props) {
  function numToRoman(num) {
    const table = {'1': 'I', '2': 'II', '3': 'III', '4': 'IV'};
    return table[num];
  }

  function isApproved(status) {
    if ( status === 'APPROVED' ) {
      return true;
    }
    else { return false }
  }

  return (
    <Card sx={{ 
      minWidth: 275, 
      boxShadow: 3, 
      marginTop: 2, 
      bgcolor: alpha(Primary['card-bg'], Primary['card-opacity'])
      }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.name} - {numToRoman(props.year_of_study)} {props.department} {props.section} ({props.register_number})
        </Typography>
        <Typography variant="h5" component="div" color="#4d004d">
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
      <CardActions >
        <Button 
          size="small" 
          variant="contained" 
          color="success" 
          disabled={isApproved(props.status)}
        >
          Approve
        </Button>
        <Button 
          size="small" 
          variant="contained" 
          color="error" 
          disabled={isApproved(props.status) || props.status === 'NOT-APPROVED'}
        >
          Reject
        </Button>
        <Button size="small">View Proof</Button>
      </CardActions>
    </Card>
  );
}
