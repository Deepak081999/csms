import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';

// import TicketForm from './components/TicketForm';
// import TicketList from './components/TicketList';
// import GitHubRepoList from './git/GitHubRepoList';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  // const [refreshFlag, setRefreshFlag] = useState(false);

  // const refresh = () => setRefreshFlag(!refreshFlag);

  return (
    <Router>
      <Routes>

        {/* <h1>Customer Service Management</h1>
        <TicketForm refresh={refresh} />
        <TicketList key={refreshFlag} />
        <hr />
        <GitHubRepoList /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
