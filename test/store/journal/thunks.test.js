/*** @jest-environment node */
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';
import { collection, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';

describe('tests on `Journal Thunks`', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('should create a new empty note', async () => {
    const uid = 'TEST-UID';
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());

    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      })
    );

    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      })
    );

    //Delete in firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  });
});
