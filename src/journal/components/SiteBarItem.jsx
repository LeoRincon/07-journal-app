import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';

export const SiteBarItem = ({ title = '', body, id, date = [] }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title;
  }, [title]);

  const onClickActiveNote = () => {
    dispatch(setActiveNote({ title, body, id, date }));
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
