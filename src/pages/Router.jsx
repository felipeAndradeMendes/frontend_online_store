import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';

class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/cart" component={ Cart } />
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}
export default Router;
