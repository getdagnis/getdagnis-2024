import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App';
import AboutPage from './pages/AboutPage';
import ContactForm from './pages/ContactForm';
import DesignPage from './pages/DesignPage';
import DesignProjectPage from './pages/DesignProjectPage';
import NotFoundPage from './pages/NotFoundPage';
import RedirectPage from './pages/RedirectPage';
import SkillsPage from './pages/SkillsPage';
import SharedPage from './pages/SharedPage';
import VotePage from './pages/VotePage';
import WipPage from './pages/WipPage';
import CvPage from './pages/CvPage';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '/', element: <App children={<WipPage />} /> },
      { path: '/about', element: <App children={<AboutPage />} /> },
      { path: '/contact', element: <App children={<ContactForm />} /> },
      { path: '/design/', element: <App children={<DesignPage />} /> },
      { path: '/design/project/:key', element: <App children={<DesignProjectPage />} /> },
      { path: '/redirect/:to', element: <App children={<RedirectPage />} /> },
      { path: '/skills', element: <Navigate to="/skills/dev" /> },
      { path: '/skills/dev', element: <App children={<SkillsPage />} /> },
      { path: '/skills/design', element: <App children={<SkillsPage />} /> },
      { path: '/skills/:section', element: <Navigate to="/skills/dev" /> },
      { path: '/shared', element: <App children={<SharedPage />} /> },
      { path: '/vote', element: <App children={<VotePage />} /> },
      { path: '/wip', element: <App children={<WipPage />} /> },
      { path: '/cv', element: <App children={<CvPage />} /> },
      { path: '/404', element: <App children={<NotFoundPage />} /> },
      { path: '*', element: <App children={<NotFoundPage />} /> },
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
