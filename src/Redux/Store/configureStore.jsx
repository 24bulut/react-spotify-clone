import {compose,applyMiddleware,createStore,combineReducers} from 'redux';
import thunk from "redux-thunk";
import {playListReducer,playListDetailsReducer} from "../Reducers/playListReducers.jsx"
import { navbarSelectedItemReducer } from "../Reducers/NavbarReducers.jsx";
import { songReducer } from "../Reducers/songReducers.jsx";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancers(
    applyMiddleware(thunk)
);

const rootReducer = combineReducers({
    playListReducer,
    playListDetailsReducer,
    navbarSelectedItemReducer,
    songReducer
});

export function configureStore() {
    return createStore(rootReducer, {}, middleware);
}