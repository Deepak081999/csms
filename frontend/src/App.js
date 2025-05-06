import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedLayout from './components/ProtectedLayout';
// import Sidebar from './components/Sidebar';
import TicketManager from './pages/TicketManager';
import GitHubRepoList from './pages/GitHubRepoList';
// import Settings from './pages/Settings';
import Role from './pages/Role';
import Permission from './pages/Permission';
import AddUser from './pages/user/AddUser';
import ResumeTable from './pages/resume/ResumeTable';
import ShowResume from './pages/resume/ShowResume';
import LinkedInProfile from './pages/LinkedInProfile';
import AddLinkedInPage from './pages/linkedin/AddLinkedInPage';
import LinkedInProfilePage from './pages/linkedin/LinkedInProfilePage';
import FetchGithubOverview from './pages/github/FetchGithubOverview';
import FetchGithubRepositories from './pages/github/FetchGithubRepositories';
import StoreGithubData from './pages/github/StoreGithubData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Accessible only to logged-in users) */}
        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route path="tickets" element={<TicketManager />} />
          <Route path="linkedin" element={<LinkedInProfile />} />
          <Route path="AddLinkedInPage" element={<AddLinkedInPage />} />
          <Route path="LinkedInProfilePage" element={<LinkedInProfilePage />} />
          <Route path="github" element={<GitHubRepoList />} />
          <Route path="StoreGithubData" element={<StoreGithubData />} />
          <Route path="FetchGithubOverview" element={<FetchGithubOverview />} />
          <Route path="FetchGithubRepositories" element={<FetchGithubRepositories />} />


          {/* <Route path="settings" element={<Settings />} /> */}
          <Route path="role" element={<Role />} />
          <Route path="permission" element={<Permission />} />
          <Route path="AddUser" element={<AddUser />} />
          <Route path="ResumeTable" element={<ResumeTable />} />
          <Route path="ShowResume" element={<ShowResume />} />
        </Route>

        {/* Fallback Route for non-existing pages */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
