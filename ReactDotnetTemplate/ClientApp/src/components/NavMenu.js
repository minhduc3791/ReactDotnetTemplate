import React, { Component } from 'react';
import './NavMenu.css';
import { Menu, Segment } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.state = {
        collapsed: true,
        activeItem: 'home'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
      return (
          <Segment inverted>
              <Menu inverted pointing secondary>
                  <Menu.Item
                      as={NavLink} exact to="/"
                      name='React'
                      active={this.state.activeItem === 'React'}
                      onClick={this.handleItemClick}
                  />
                  <Menu.Item
                      as={NavLink} to="/customers"
                      name='Customers'
                      active={this.state.activeItem === 'Customers'}
                      onClick={this.handleItemClick}
                  />
                  <Menu.Item
                      as={NavLink} to="/products"
                      name='Products'
                      active={this.state.activeItem === 'Products'}
                      onClick={this.handleItemClick}
                  />
                  <Menu.Item
                      as={NavLink} to="/stores"
                      name='Stores'
                      active={this.state.activeItem === 'Stores'}
                      onClick={this.handleItemClick}
                  />
                  <Menu.Item
                      as={NavLink} to="/sales"
                      name='Sales'
                      active={this.state.activeItem === 'Sales'}
                      onClick={this.handleItemClick}
                  />
              </Menu>
          </Segment>
      );
  }
}
