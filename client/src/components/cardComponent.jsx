import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material';


export default function CardComponent() {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, marginTop: 2, bgcolor: alpha('#4d004d', 0.05) }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Jerin BS - II CSE B (210701095)
        </Typography>
        <Typography variant="h5" component="div" color="#4d004d">
          Technovation CSBS
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Rajalakshmi Engineering College
        </Typography>
        <Typography variant="body2">
          Outcome: Winner
          <br />
          {'From        to         '}
        </Typography>
        <Typography variant="body3">
          Status: Approved
        </Typography>
      </CardContent>
      <CardActions >
        <Button size="small" variant="contained" color="success">Approve</Button>
        <Button size="small" variant="contained" color="error">Reject</Button>
        <Button size="small">View Proof</Button>
      </CardActions>
    </Card>
  );
}
