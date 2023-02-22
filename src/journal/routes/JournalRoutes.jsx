import { Routes, Route, Navigate } from 'react-router-dom';

import { JournalPage } from '../pages/JournalPage';

export const JournalRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<JournalPage />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
};
