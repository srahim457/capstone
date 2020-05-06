// import React, { Component } from 'react';
// import {
//   BrowserRouter,
//   HashRouter as Router,
//   Route,
//   Switch,
// } from 'react-router-dom';

// import Home from './components/Home';
// import Navigation from './components/Navigation';
// import Profile from './components/Profile';
// import MarketPlace from './components/MarketPlace';

// class App extends Component {
//   render() {
//     return (
//       <BrowserRouter>
//         <Switch>
//           <Route exact path='/' component={Home}></Route> {/**/}
//           <Route path='/profile' component={Profile}>
//             <Navigation></Navigation>
//           </Route>
//           <Route path='/market-place' component={MarketPlace}>
//             <Navigation></Navigation>
//           </Route>
//         </Switch>
//       </BrowserRouter>
//     );
//   }
// }

// export default App;

import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import Navigation from './components/Navigation';
//import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar />*/}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={Routes} />
            <Navigation />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
