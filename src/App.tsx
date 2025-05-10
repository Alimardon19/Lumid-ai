import AOS from 'aos';
import {useEffect} from 'react';
import {App as AntdApp} from 'antd';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import store from './store/store.ts';
import ChatApp from './view/chat';
import AuthPage from './view/auth';
import Navigation from './components/navigation';
import ChatAppItem from './view/chat/chat-item.tsx';
import MilaOnboarding from './view/mila-onboarding';
import RegisteredUser from './view/auth/registered.tsx';
import {setMessageContext} from './utils/messageUtils.ts';
import CheckDocuments from './view/start-agent/check-documents';

import 'aos/dist/aos.css'; // AOS style
import 'remixicon/fonts/remixicon.css'; // Remix icon


function App() {
    const {message} = AntdApp.useApp();

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        setMessageContext(message);
    }, [message]);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigation/>}/>
                    <Route path="/mila-onboarding" element={<MilaOnboarding/>}/>
                    <Route path="/check-documents" element={<CheckDocuments/>}/>
                    <Route path="/chat" element={<ChatApp/>}/>
                    <Route path="/chat/:id" element={<ChatAppItem/>}/>
                    <Route path="/login" element={<AuthPage/>}/>
                    <Route path="/registered" element={<RegisteredUser/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;