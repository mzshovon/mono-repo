import logo from './logo.svg';
import './App.css';
import SystemCheckAlert from './SystemCheckAlert';
import FormUI from './UI/FormUI';

function App() {
  return (
    <div className="App">
      <SystemCheckAlert>
        <FormUI/>
      </SystemCheckAlert>
    </div>
  );
}

export default App;
