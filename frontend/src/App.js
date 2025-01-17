import logo from './logo.svg';
import './App.css';
import SystemCheckAlert from './Components/SystemCheckAlert';
import Form from './Components/Form';

function App() {
  return (
    <div className="App">
      <SystemCheckAlert>
        <Form/>
      </SystemCheckAlert>
    </div>
  );
}

export default App;
