var React = require('react');
var Backbone = require('backbone');

var Shirt = Backbone.Model.extend({
urlRoot: 'https://tiny-lasagna-server.herokuapp.com/collections/patrickshirts'
});

var ShirtCollection = Backbone.Collection.extend({
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/patrickshirts',
  model: Shirt
});
var Order = Backbone.Model.extend({
  urlRoot: 'https://tiny-lasagna-server.herokuapp.com/collections/patrickshirts',
  idAttribute: '_id',
  defaults:{
    "name": "",
    "description": "",
    "price": "",
    "size": "",
  }
});

var OrderCollection = Backbone.Collection.extend({
  model: Order,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/patrickshirtscollection'

});



module.exports = {
  Shirt,
  ShirtCollection,
  Order,
  OrderCollection
};
