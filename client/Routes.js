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
import FunnelComp from './components/chartComponents/FunnelComp';
import Create from './components/Create';
import Edit from './components/Edit';
import MyCharts from './components/MyCharts';

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
          <Route exact path='/' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/create' component={Create} />
          <Route path='/edit' component={Edit} />
          <Route path='/mycharts' component={MyCharts}/>
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route path='/login'>{Login}</Route>
          <Route path='/signup'>{Signup}</Route>
        </Switch>
      )}
      <Switch>
        
      </Switch>
    </div>
  );
};



export default Routes;

