import SystemCheckAlert from './SystemCheckAlert';
import FormUI from './UI/FormUI';
import { ConfigProvider } from 'antd';
import '../node_modules/antd/dist/reset.css'

function App() {
  return (
    <div className="App">
        <ConfigProvider>
        {/* <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}> */}
        <SystemCheckAlert>
          <FormUI />
        </SystemCheckAlert>
      </ConfigProvider>
    </div>
  );
}

export default App;
