import React, { Component, Fragment, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import BarComp from './components/chartComponents/BarComp';
import LineComp from './components/chartComponents/LineComp';
import SimpleScatterComp from './components/chartComponents/SimpleScatterComp';
import SimpleAreaComp from './components/chartComponents/SimpleAreaComp';
import Home from './components/Home';
import {me} from './store'
import PieComp from './components/chartComponents/PieComp';
import { me } from './store';
import FunnelComp from './components/chartComponents/FunnelComp';

/**
 * COMPONENT
 */

const Routes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/bar" component={BarComp} />
          <Route path="/pie" component={PieComp} />

          <Route path='/home' component={Home} />
          <Redirect to='/home' />
        </Switch>
      ) : (
        <Switch>
          <Route path='/' exact>
            {Login}
          </Route>
          <Route path='/login'>{Login}</Route>
          <Route path='/signup'>{Signup}</Route>
        </Switch>
      )}
      <Switch>
        <Route path='/bar' component={BarComp} />
        <Route path='/line' component={LineComp} />
        <Route path='/simplescatter' component={SimpleScatterComp} />
        <Route path='/simplearea' component={SimpleAreaComp} />
        <Route path='/funnel' component={FunnelComp} />
      </Switch>
    </div>
  );
};



export default Routes;

