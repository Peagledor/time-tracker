import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TimeTracker from './components/timer/TimerTracker';

const App = () => {
  const [activeTab, setActiveTab] = useState('timer');

  return (
    <Provider store={store}>
      <div>
        <h1 className="text-5xl font-bold mb-6">Freelance Dashboard</h1>
        
        <div className="bg-zinc-800 inline-flex rounded-lg p-1">
          <button 
            onClick={() => setActiveTab('timer')} 
            className="p-2 rounded"
          >
            Timer
          </button>
          <button 
            onClick={() => setActiveTab('clients')} 
            className="p-2 rounded"
          >
            Clients
          </button>
          <button 
            onClick={() => setActiveTab('invoices')} 
            className="p-2 rounded"
          >
            Invoices
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className="p-2 rounded"
          >
            Settings
          </button>
        </div>

        {activeTab === 'timer' && <TimeTracker />}
      </div>
    </Provider>
  );
};

export default App;