import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { Primary } from '../res/themes.js';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "../res/styles.css";

export default function CardComponent(props) {
  const [state, setState] = React.useState({isEditing: false});
  const [button, setButton] = React.useState({text: 'Edit', icon: faPen});

  const [result, setResult] = React.useState('');
  const [proof, setProof] = React.useState('');

  const outcomeSection = (outcome, isEditing) => {
    if (isEditing) {
      return <FormControl fullWidth sx={{marginBottom: '10px'}}>
              <InputLabel>Outcome</InputLabel>
              <Select
                value={ result }
                label='outcome'
                onChange={(event) => {setResult(event.target.value)}}
              >
                <MenuItem value={'WINNER'}>Winner</MenuItem>
                <MenuItem value={'RUNNER'}>Runner</MenuItem>
                <MenuItem value={'RUNNER-UP'}>Runner-Up</MenuItem>
                <MenuItem value={'PARTICIPATED'}>Participated</MenuItem>
              </Select>
            </FormControl>
    } else {
      return ("Outcome : " + outcome)
    }
  }
  
  const proofSection = (isEditing) => {
    if(isEditing) {
      return ( 
        <form method='post' encType='multipart/form-data' className='proof-upload'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="proof"
                onChange={(props) => { setProof(props.target.files[0]); }}
            />
        </form>);
    } else {
      return ( 
      <Button 
        size="small" 
        sx={{ maxWidth: '120px'}}
        onClick={() => { 
          props.handleViewState(true, props.proof);
         }}
      >
        View Proof
      </Button>);
    }
  }

  const deleteEntry = () => {
    axios.get('http://localhost:2003/od-application/delete-entry/' + props.id, 
    {withCredentials: true}
    ).then(alert('Entry Deleted'))
      .catch((err) => console.log(err));

    window.location.reload(true);
  }

  const handleClick = () => {
    if (!state.isEditing) {
      setState({isEditing: true})
      setButton({text: 'Done', icon: faCheck});    
    } else {
      if (proof !== '' || result !== '') {
        const formData = new FormData();
        formData.append('outcome', result);
        formData.append('proof', proof);

        console.log(result, proof);
        axios.post('http://localhost:2003/od-application/modify-entry/' + props.id,
        formData,
        {withCredentials: true}
        ).then(alert('Updated Entry'))
          .catch(err => console.log(err));
      }

      setState({isEditing: false})
      setButton({text: 'Edit', icon: faPen}); 
    }
  }

  return (
    <Card sx={{ 
       minWidth: '345px',
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
                {outcomeSection(props.outcome, state.isEditing)}
                <br />
                {'From  ' + props.start_date.substring(0, 10) + '  to  ' + props.end_date.substring(0, 10)}
              </Typography>
              <Typography variant="body3">
                Status: {props.status}
              </Typography>
              
          </CardContent>
          {proofSection(state.isEditing)}
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
            onClick={() => handleClick()}
          >
            <Typography variant='button' sx={{ paddingRight: 1 }}>{button.text}</Typography>
            <FontAwesomeIcon icon={ button.icon }/>
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
