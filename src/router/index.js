import React from 'react';
import { Router,Route ,Switch } from 'react-router-dom';/*BrowserRouter*/
import createHistory from 'history/createBrowserHistory';
import Poss from '../container/merchants/business/enroll/index/index';
import Agreement from "../container/merchants/business/enroll/agreement";


const BrowserHistory = createHistory();

const myRouter = () => (
        <Router history={BrowserHistory}>
            <Switch>
                <Route path="/" component={Poss}/>
                <Route path="/aa" component={Agreement}/>
            </Switch>

        </Router>
    )
export default myRouter;