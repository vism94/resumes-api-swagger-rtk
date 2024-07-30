import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AcceptedResumesPage from './components/pages/AcceptedResumesPage';
import CandidateDetailsPage from './components/pages/CandidateDetailsPage';
import CandidatesPage from './components/pages/CandidatesPage';
import ImportantCommentsPage from './components/pages/ImportantCommentsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'candidates',
        element: <CandidatesPage />,
      },
      {
        path: 'candidates/:id',
        element: <CandidateDetailsPage />,
      },
      {
        path: 'comments/important',
        element: <ImportantCommentsPage />,
      },
      {
        path: 'accepted',
        element: <AcceptedResumesPage />,
      },
    ],
  },
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
