/*import thunk from 'redux-thunk';*/
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';/*数据持久化 将其保存到本地*/
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import Reducer from '../reducer/index';
import thunk from 'redux-thunk'

//添加中间件
let EnhancerMiddleware = applyMiddleware(thunk);

//配置持久化数据
const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
     'possRs','fillStoreRs'
    ]
};

const persistedReducer = persistReducer(persistConfig, Reducer);//处理reducer

const store = createStore(persistedReducer, applyMiddleware(thunk));//生成store
const persistor = persistStore(store);//处理store


/*const store = createStore(Reducer,applyMiddleware(thunk));*/
export {
    store,
    persistor
}
