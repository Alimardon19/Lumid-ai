import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import {App as AntdApp, ConfigProvider} from 'antd';


createRoot(document.getElementById('root')!).render(
    <ConfigProvider>
        <AntdApp>
            <App/>
        </AntdApp>
    </ConfigProvider>
)
