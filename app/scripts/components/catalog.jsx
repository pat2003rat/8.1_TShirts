var $ = window.$ = window.jQuery = require('jquery');
var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Backbone = require('backbone');
var Cookies = require('js-cookie');

var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var Shirt = require('../models/shirts').Shirt;
var ShirtCollection = require('../models/shirts').ShirtCollection
var Order = require('../models/shirts').Order;
var OrderCollection = require('../models/shirts').OrderCollection

// require bootstrap-sass for dropdown menu
require('bootstrap-sass');

var MainLayout = React.createClass({
  getInitialState: function() {
    var shirtCollection = new ShirtCollection();
    return {
      shirtCollection: shirtCollection,
      showModal: true
    }
  },

  componentWillMount: function() {
    if(Cookies.get('username')){
      this.setState({ showModal: false })
    };

    var newShirtCollection = this.state.shirtCollection;
    newShirtCollection.add([
      {
          image: "./images/ewok.jpg",
          name: "Ewok Brewing",
          price: 7.99,
          description: "Walk In, Ewok Out"
      }, {
          image: "./images/hanssolo.jpg",
          name: "Hans going Solo .......",
          price: 7.49,
          description: "Leverhosen never felt so right"
      }, {
          image: "./images/acute.jpg",
          name: "Acute Baby ....",
          price: 5.97,
          description: "Why so obtuse?"
      }, {
          image: "./images/r2d2.png",
          name: "It's a Pirates Life for R2D2 ....",
          price: 5.97,
          description: "C3PO didnt make it in time"
      }, {
          image: "./images/element.jpg",
          name: "Confusion",
          price: 5.97,
          description: "Element of Confusion"
      },{
          image: "./images/muscles.jpg",
          name: "Muscles",
          price: 5.97,
          description: "Installing Muscles"
      }
    ]);
    this.setState({shirtCollection: newShirtCollection});
  },

  addUsername: function(username){
    console.log(username);
    Cookies.set('username', username)
    // set your Cookie
    var usernameCheck = Cookies.get('username')
    console.log('check', usernameCheck);
    // get the cookie (show me in the console)
    this.setState({
      username: username,
      showModal: false
    });
    // then update state
  },

    render: function() {
        return (
            <div className="container-fluid">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <button type="buttonpush" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">T-Shirt Heaven </a>
                  </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li className="active">
                      <a href="#">T-Shirts </a>
                    </li>
                    <li>
                      <a href="#cart/">Cart</a>
                    </li>
                  </ul>
                </div>
                <span>Hello - you're signed in as {Cookies.get('username')}</span>
              </div>
            </nav>
            <SignInModal showModal={ this.state.showModal } addUsername={ this.addUsername }/>
            <div className="row">
                <div className = "col-md-12">
              <Tshirt shirtCollection={this.state.shirtCollection}/>
              </div>
            </div>
          </div>
        )
    }
});

var Tshirt = React.createClass({
  getInitialState: function(){
    var orderCollection = new OrderCollection();
    var self = this;
    orderCollection.fetch().done(function(){
      self.setState({orderCollection: orderCollection})
  });
  return {
    orderCollection: orderCollection
  };
  },

    addToOrder: function(e, tshirt){
      e.preventDefault();

      // Return a shallow copy of the model's attributes
      var item = tshirt.toJSON();

      if(localStorage.getItem('cart')){
        // parse localStorage (so you can access what was already added to the cart)
        var cart = JSON.parse(localStorage.getItem('cart'));
        // add t-shirt
        cart.push(tshirt);
        // stringify cart
        cart = JSON.stringify(cart);
        // set localStorage
        localStorage.setItem('cart', cart);
      } else {
        console.log('cart does not exist');
        // create an empty array
        var cart = [];

        // add t-shirt to array
        // The push() method adds new items to the end of an array
        cart.push(tshirt);

        // stringify cart
        // The JSON.stringify() method converts a JavaScript value to a JSON string
        cart = JSON.stringify(cart);

        // set localStorage
        localStorage.setItem('cart', cart)
      }

  },
  //method to select a size
    selectSize: function(e, tshirt) {
      e.preventDefault();
      console.log('e', e.target.text);
      // target the text value of the dropdown
      var size = e.target.text;
      tshirt.set({size: size})
    },

    openModal() {
    this.setState({showModal: true});
    },

    closeModal() {
    return this.setState({showModal: false});
  },

  addUsername(username){
    return Cookies.set('username', username);
  },

    render: function() {
      var self = this;

      var tshirts = this.props.shirtCollection.map(function(tshirt, index) {
        return (
          <div key={tshirt.cid} className="col-sm-12 col-md-4">
            <div className="thumbnail">
              <img src={tshirt.get('image')} alt="..."/>
              <div className="caption">
                <h3 className ="descriptioncaption">{tshirt.get('description')}</h3>
                <p className ="descriptioncaption2">$ {tshirt.get('price')}</p>
                <div className="btn-group " >
                  <Dropdown key={index} tshirt={ tshirt }/>
                </div>
                <a onClick={(e)=>self.addToOrder(e, tshirt)} href="#" className="btn btn-primary" role="button">Add To My Cart</a>
              </div>
            </div>
          </div>
          )
        })
    return(
      <div>{tshirts}</div>
    )
  }
});

class Dropdown extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     title: 'Select Size'
   }
   this._handleSize = this._handleSize.bind(this);
 }

 _handleSize(eventKey) {
   this.setState({ title: eventKey });
   this.props.tshirt.set({ size: eventKey });
 }

 render(){
   return (
     <ButtonToolbar>
       <DropdownButton onSelect={ this._handleSize } title={ this.state.title } id="dropdown-size-medium">
         <MenuItem eventKey="Small">Small</MenuItem>
         <MenuItem eventKey="Medium">Medium</MenuItem>
         <MenuItem eventKey="Large">Large</MenuItem>
         <MenuItem eventKey="Extra Large">Extra Large</MenuItem>
       </DropdownButton>
     </ButtonToolbar>
   )
 }
}

class SignInModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleUsername = this.handleUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps){
    console.log('next', nextProps );
    // this.setState({showModal: this.props.openModal});
  }

  handleUsername(e) {
    e.preventDefault();
    this.setState({username: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addUsername(this.state.username);
  }
  render(){

    return (
      <div>
        <Modal show={this.props.showModal} >
          <Modal.Header closeButton>
            <Modal.Title>
              <span>You haven't logged in yet!</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" onChange={this.handleUsername} placeholder='username' />
            <button onClick={this.handleSubmit}>Sign me in!</button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

module.exports = {
    MainLayout,
    Tshirt
}
