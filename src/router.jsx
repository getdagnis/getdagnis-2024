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
      { path: '/', element: <App><WipPage /></App> },
      { path: '/about', element: <App><AboutPage /></App> },
      { path: '/contact', element: <App><ContactForm /></App> },
      { path: '/design/', element: <App><DesignPage /></App> },
      { path: '/design/project/:key', element: <App><DesignProjectPage /></App> },
      { path: '/redirect/:to', element: <App><RedirectPage /></App> },
      { path: '/skills', element: <Navigate to="/skills/dev" /> },
      { path: '/skills/dev', element: <App><SkillsPage /></App> },
      { path: '/skills/design', element: <App><SkillsPage /></App> },
      { path: '/skills/:section', element: <Navigate to="/skills/dev" /> },
      { path: '/shared', element: <App><SharedPage /></App> },
      { path: '/vote', element: <App><VotePage /></App> },
      { path: '/wip', element: <App><WipPage /></App> },
      { path: '/cv', element: <App><CvPage /></App> },
      { path: '/404', element: <App><NotFoundPage /></App> },
      { path: '*', element: <App><NotFoundPage /></App> },
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
