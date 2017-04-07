var React = require('react');
var Backbone = require('backbone');

var Order = require('../models/shirts').Order;
var OrderCollection = require('../models/shirts').OrderCollection;

var CartLayout = React.createClass({
  getInitialState: function(){
    // set cart to an empty array and map over it
    var cart = [];
    var total = 0;
    // grab existing cart from localStorage and update its value
    if(localStorage.getItem('cart')){
      // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string.
      cart = JSON.parse(localStorage.getItem('cart'));
      // put total method here
      total = cart.reduce(function(accum, i){
        return accum + i.price;
      }, 0);
    }
    // return cart and total
    return {
      cart: cart,
      total: total
    };
  },
  //clearing localStorage of puchaseItems
  puchaseItems: function(e){
    e.preventDefault();
    localStorage.clear();
    this.forceUpdate();
  },

  render: function(){
      var cartItems = this.state.cart.map(function(item, index){
        // get data out of an object through dot notation or item.key
        console.log('item', item);
        return (
          <div key={ index } className ="col-md-12">
            <div>
              <div className="col-md-3"><h3>{ item.name }</h3></div>
              <div className="col-md-3"><h3>{ item.description }</h3></div>
              <div className="col-md-3"><h3>$ { item.price }</h3></div>
              <div className="col-md-3"><h3>{ item.size }</h3></div>
            </div>
          </div>
        )
      })
    return(
      <div className="container-fluid">
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">T-Shirt Heaven</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className="active">
                            <a href="#">T-Shirts
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li>
                            <a href="#cart/">Cart</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="row">
          <div className="well col-xs-12 col-md-12 cartheadercolor">
            <div className="col-md-3"><h3>Product</h3></div>
            <div className="col-md-3"><h3>Description</h3></div>
            <div className="col-md-3"><h3>Price</h3></div>
            <div className="col-md-3"><h3>Size</h3></div>
          </div>
          <div className="well col-xs-12 col-md-12">
            { cartItems }
          </div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>

          <div className="well col-xs-12 col-md-4 checkoutwellcolor">
            <h3>Total</h3>
            <ul>
              <h1><li>$ {this.state.total}</li></h1>
            </ul>
            <button onClick={this.puchaseItems}type="button" className="btn btn-info btn-lg">Purchase Items</button>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = {
  CartLayout
};
