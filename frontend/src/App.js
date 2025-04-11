
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';

import { useState } from 'react';

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refresh = () => setRefreshFlag(!refreshFlag);

  return (
    <div className="App">
      <h1>Customer Service Management</h1>
      <TicketForm refresh={refresh} />
      <TicketList key={refreshFlag} />



    </div>
  );
}

export default App;
