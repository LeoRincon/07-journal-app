import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
} from './';
import { loadNotes } from '../../helpers';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    const setDocResp = await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('UID no exist');
    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    const noteToFireStore = { ...activeNote };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(activeNote));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(activeNote.id));
  };
};
