import React from 'react';
import { Route , IndexRoute} from 'react-router';

import Agreement from '../container/merchants/business/enroll/agreement/index';
import FillStore from '../container/merchants/business/enroll/fillStore/index';
import SubCompany from '../container/merchants/business/enroll/subCompany/index';
import Result from '../container/merchants/business/enroll/result/index';

let PossChildrenRouter = () =>  (
    <div>
        <IndexRoute component={Agreement}  />
        <Route path='agreement' component={Agreement} />
        <Route path='fillStore' component={FillStore}/>
        <Route path='subCompany' component={SubCompany} />
        <Route path='result' component={Result}/>
    </div>

);

export default PossChildrenRouter;