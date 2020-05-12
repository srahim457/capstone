// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import Register from '../auth/Register';
// import Login from '../auth/Login';
// import Alert from '../layout/Alert';
// import Dashboard from '../dashboard/Dashboard';
// import ProfileForm from '../profile-forms/ProfileForm';
// import AddExperience from '../profile-forms/AddExperience';
// import AddEducation from '../profile-forms/AddEducation';
// import Profiles from '../profiles/Profiles';
// import Profile from '../profile/Profile';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';
// import NotFound from '../layout/NotFound';
// import PrivateRoute from '../routing/PrivateRoute';

// const Routes = (props) => {
//   return (
//     <section className='container'>
//       <Switch>
//         <Route exact path='/register' component={Register} />
//         <Route exact path='/login' component={Login} />
//         <Route exact path='/profiles' component={Profiles} />
//         <Route exact path='/profile/:id' component={Profile} />
//         <PrivateRoute exact path='/dashboard' component={Dashboard} />
//         <PrivateRoute exact path='/create-profile' component={ProfileForm} />
//         <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
//         <PrivateRoute exact path='/add-experience' component={AddExperience} />
//         <PrivateRoute exact path='/add-education' component={AddEducation} />
//         <PrivateRoute exact path='/posts' component={Posts} />
//         <PrivateRoute exact path='/posts/:id' component={Post} />
//         <Route component={NotFound} />
//       </Switch>
//     </section>
//   );
// };

// export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signup from '../SignUp';
import Login from '../Login';
import Profile from '../Profile';
import MarketPlace from '../MarketPlace';
import NotFound from '../layout/NotFound';
import AllGuilds from '../AllGuilds';

import PrivateRoute from '../routing/PrivateRoute';
import Messages from '../Messages';

//Might import Navbar in here instead

const Routes = (props) => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/' component={Signup} />
        <Route path='/' component={Login} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/market-place' component={MarketPlace} />
        <PrivateRoute path='/all-guilds' component={AllGuilds} />
        <PrivateRoute path='/messages' component={Messages} />
        {/* <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
        <PrivateRoute exact path='/posts' component={Posts} />
  <PrivateRoute exact path='/posts/:id' component={Post} />*/}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
