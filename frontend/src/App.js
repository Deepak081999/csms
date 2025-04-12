import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedLayout from './components/ProtectedLayout';
import NewTicket from './pages/TicketForm';
import TicketList from './pages/TicketList';
import GitHubRepoList from './pages/GitHubRepoList';
import Settings from './pages/Settings';
import Role from './pages/Role';
import Permission from './pages/Permission';
import Resume from './pages/Resume';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route path="new" element={<NewTicket />} />
          <Route path="tickets" element={<TicketList />} />
          <Route path="github" element={<GitHubRepoList />} />
          <Route path="settings" element={<Settings />} />
          <Route path="role" element={<Role />} />
          <Route path="permission" element={<Permission />} />
          <Route path="resume" element={<Resume />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
