var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var MainLayout = require('./components/catalog.jsx').MainLayout;
var CartLayout = require('./components/cart.jsx').CartLayout;
var AppRouter = Backbone.Router.extend({
  routes:{
    "": 'index',
    "cart/": 'cart'

  },
  index: function(){
    ReactDOM.render(
      React.createElement(MainLayout),
      document.getElementById('app')
    )
  },
cart: function(){
  ReactDOM.render(
    React.createElement(CartLayout),
    document.getElementById('app')
  )
}
});
var appRouter = new AppRouter();

module.exports = appRouter;
