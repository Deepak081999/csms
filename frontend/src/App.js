import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedLayout from './components/ProtectedLayout';
import TicketManager from './pages/TicketManager';
import GitHubRepoList from './pages/GitHubRepoList';
import Settings from './pages/Settings';
import Role from './pages/Role';
import Permission from './pages/Permission';
import UploadResume from './pages/resume/UploadResume';
import ResumeTable from './pages/resume/ResumeTable';
import ShowResume from './pages/resume/ShowResume';
import LinkedInProfile from './pages/LinkedInProfile';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route path="tickets" element={<TicketManager />} />
          <Route path="linkedin" element={<LinkedInProfile />} />
          <Route path="github" element={<GitHubRepoList />} />
          <Route path="settings" element={<Settings />} />
          <Route path="role" element={<Role />} />
          <Route path="permission" element={<Permission />} />
          <Route path="UploadResume" element={<UploadResume />} />
          <Route path="ResumeTable" element={<ResumeTable />} />
          <Route path="ShowResume" element={<ShowResume />} />
        </Route>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
