import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouterIndex from './routes';


function App() {
  return (
    <div>
      <BrowserRouter>
        <RouterIndex />
      </BrowserRouter>
    </div>
  );
}

export default App;
