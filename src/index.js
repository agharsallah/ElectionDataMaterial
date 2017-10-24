import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxPromise from "redux-promise";
import reducers from "./reducers";
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MunReg from './munReg/MunReg' ;
import ChooseRegGov from './munre/ChooseRegGov' ;
import DetailedRegGovRoot from './detailed-reg/DetailedRegGovRoot' ;
import RegTrackLineRoot from './reg-perfomance/RegTrackLineRoot' ;
import Invalid from './oldInvalid/Invalid' ;
import Turnout from './oldTurnout/Turnout' ;
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const customHistory = createBrowserHistory()
const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    
    <Provider store={createStoreWithMiddleware(reducers)}>
    <AppContainer>
    <MuiThemeProvider>
    <Router history={customHistory}>
      <Switch>
      <Route exact path="/" component={App}/>
      <Route  path="/munre" component={ChooseRegGov}/>
      <Route  path="/munreg/:city" component={MunReg}/>
      
      <Route  path="/detailed-reg" component={DetailedRegGovRoot}/>

      <Route  path="/reg-perfomance" component={RegTrackLineRoot}/>
      
      <Route  path="/invalid" component={Invalid}/>
      <Route  path="/turnout" component={Turnout}/>
      </Switch>
    </Router>
    </MuiThemeProvider>
    </AppContainer>
    </Provider>,
    rootEl
  );

render(App);
if (module.hot) module.hot.accept('./App', () => render(App));
