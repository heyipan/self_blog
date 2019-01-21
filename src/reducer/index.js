import { combineReducers } from 'redux';

import fillStoreRs from '../container/merchants/business/enroll/fillStore/reducer'
import possRs from '../container/merchants/business/enroll/index/reducer'
import loadingRs from '../container/merchants/public/loading/reducer'
import companyRs from '../container/merchants/business/enroll/subCompany/reducer'

export default combineReducers({
    fillStoreRs,
    possRs,
    loadingRs,
    companyRs
})