import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Typography, TextField } from '@mui/material';
import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks';
// import { ImageGallery } from '../components';
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
} from '../../store/journal';

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote, messageSaved, isSaving } = useSelector(
    (state) => state.journal
  );
  const { title, body, date, onInputChange, formState } = useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onDeleteNote = () => {
    dispatch(startDeletingNote());
  };

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Good job!', `${messageSaved}`, 'success');
    }
  }, [messageSaved]);

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      direction='column'
      justifyContent='space-between'
      sx={{ mb: 1, mx: 'auto' }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color='primary'
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} /> Save{' '}
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Enter your title'
          label='Title'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type='textArea'
          variant='filled'
          multiline
          fullWidth
          placeholder='What Happened Today?'
          label='Description'
          minRows={3}
          sx={{ border: 'none', mb: 1 }}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent='end'>
        <Button onClick={onDeleteNote} sx={{ mt: 2 }} color='error'>
          <DeleteOutline />
          Delete Note
        </Button>
      </Grid>
      {/* <ImageGallery /> */}
    </Grid>
  );
};
