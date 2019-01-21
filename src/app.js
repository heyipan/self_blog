import React from 'react'
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'
import {store,persistor} from './store/index'
/*import store from './store/index'*/
import { PersistGate } from 'redux-persist/integration/react';
import MyRouter from './router/index'



ReactDOM.render(
    (<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MyRouter />
        </PersistGate>
    </Provider>)
    ,document.getElementById("root")
)
/*
<Provider store={store}>
    <Router>{routers}</Router>
</Provider>*/
