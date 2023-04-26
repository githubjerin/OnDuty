import React from 'react'
import ReactDom from 'react-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import '../res/styles.css';

export default function OdCreation({ open, onSubmit }) {
  const [event, setEvent] = React.useState('');
  const [organization, setOrganization] = React.useState('');
  const [outcome, setOutcome] = React.useState('');
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();

  if( !open ) {
    return null;
  }

  const handleChange = (event) => {
    setOutcome(event.target.value);
  };

  const newEntry = () => {
    const body = {
       event: event,
       outcome: outcome,
       organization: organization,
       start_date : start,
       end_date: end
    }

    axios.post('http://localhost:2003/od-application/new-entry', body, {withCredentials: true})
          .then(alert('Entry Added'))
          .catch((err) => console.log(err));
  }

  return ReactDom.createPortal(
    <LocalizationProvider dateAdapter={AdapterDayjs}> 
      <div className='overlay'/>
      <div className="overlay-cover">
        <div className="title">
            <h1>Apply for New OD</h1>
        </div>
        <Box
        component="form"
        sx={{
            margin: 'auto',
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}
        noValidate
        autoComplete="off"
        >

          <TextField 
            id="outlined-basic" 
            sx={{ 
              width: '100%',
              marginBottom: '10px'
            }} 
            label="Name of The Event" 
            value={ event }
            onChange={(params) => setEvent(params.target.value)}
            variant="outlined" 
          />

          <TextField 
            id="outlined-basic" 
            sx={{ 
              width: '100%',
              marginBottom: '10px'
            }} 
            label="Organization" 
            value={ organization }
            onChange={(params) => setOrganization(params.target.value)}
            variant="outlined" 
          />

          <FormControl fullWidth sx={{marginBottom: '10px'}}>
            <InputLabel>Outcome</InputLabel>
            <Select
              value={ outcome }
              label='outcome'
              onChange={handleChange}
            >
              <MenuItem value={'WINNER'}>Winner</MenuItem>
              <MenuItem value={'RUNNER'}>Runner</MenuItem>
              <MenuItem value={'RUNNER-UP'}>Runner-Up</MenuItem>
              <MenuItem value={'PARTICIPATED'}>Participated</MenuItem>
            </Select>
          </FormControl>   

          <DateTimePicker
            label="Start Date"
            value={ start }
            onChange={(date) => setStart(date)}
            sx={{ width: '100%', marginBottom: '10px' }}
          />    

          <DateTimePicker
            label="End Date"
            value={ end }
            onChange={(date) => setEnd(date)}
            sx={{ width: '100%' }}
          />  

          <Box
            sx={{
              width: "100%",
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <Button 
              variant="contained" 
              onClick={ () => {
                newEntry();
                onSubmit();
              }}
              sx={{
                width: '40%',
                marginBottom: '10px',
                marginTop: '15px',
              }}
            >
              Submit
            </Button>

            <Button 
              variant="outlined" 
              onClick={() => {
                onSubmit();
              }}
              sx={{
                width: '40%',
                marginBottom: '10px',
                marginTop: '15px'
              }}
            >
              Cancel
            </Button>
          </Box>

        </Box>
      </div>
    </LocalizationProvider>, 
    document.getElementById('modal')
  );  
}
