import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Catalog from '../views/Catalog';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
}
