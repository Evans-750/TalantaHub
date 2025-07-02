import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Upload from './pages/Upload';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Opportunities from './pages/Opportunities';
import PostForm from './pages/Opportunities/PostForm';
import ManageDashboard from './pages/Opportunities/ManageDashboard';
import ViewAll from './pages/Opportunities/ViewAll';

import { AuthProvider } from './contexts/AuthContext';
import { TalentProvider } from './contexts/TalentContext';
import { OpportunitiesProvider } from './contexts/OpportunitiesContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TalentProvider>
          <OpportunitiesProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/opportunities/all" element={<ViewAll />} />

              <Route
                path="/upload"
                element={
                  <PrivateRoute>
                    <Upload />
                  </PrivateRoute>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Public Opportunities Page */}
              <Route path="/opportunities" element={<Opportunities />} />

              {/* Submission for Mentors, Sponsors, Organizations */}
              <Route
                path="/opportunities/post"
                element={
                  <PrivateRoute allowedRoles={['mentor', 'sponsor', 'organization']}>
                    <PostForm />
                  </PrivateRoute>
                }
              />

              {/* Manage submitted opportunities (dashboard) */}
              <Route
                path="/opportunities/dashboard"
                element={
                  <PrivateRoute allowedRoles={['mentor', 'sponsor', 'organization']}>
                    <ManageDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </OpportunitiesProvider>
        </TalentProvider>
      </AuthProvider>
    </Router>
  );
}
