import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Customer from './components/Customer';
import Product from './components/Product';
import Sale from './components/Sale';
import Store from './components/Store';

import 'semantic-ui-css/semantic.min.css'
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/customers' component={Customer} />
        <Route path='/products' component={Product} />
        <Route path='/stores' component={Store} />
        <Route path='/sales' component={Sale} />
      </Layout>
    );
  }
}
