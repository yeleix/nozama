'use strict'

const showItemGrid = require('../templates/product-grid.handlebars')
const showCartTemplate = require('../templates/cart.handlebars')
const showCartSummary = require('../templates/cart-summary.handlebars')

const store = require('../store')
const cart = require('./cart')

const getItemsSucces = (data) => {
  console.log('data is', data)
  $('#store-items').html(showItemGrid({ items: data.items }))
}

const paymentSuccessful = function (data) {
  $('#addToCartModal').modal('hide')
  $.toast({
    text: 'Payment recieved! Order Placed',
    heading: 'Payment successful',
    icon: 'success',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: '#F09C40'
  })
}

const paymentFailure = function (data) {
  $.toast({
    text: 'There was a problem processing this payment. Please try again',
    heading: 'Error with payment',
    icon: 'error',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: '#F09C40'
  })
}

const updateCartSuccess = function (data, actionDescription) {
  $.toast({
    text: 'Item ' + actionDescription,
    heading: 'Cart updated',
    icon: 'success',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: '#F09C40'
  })

  cart.cartTotal(data)

  $('#cart-items').html(showCartTemplate({ items: store.user.cart }))
  $('#cart-summary').html(showCartSummary({ summary: store.user }))

}

const populateCart = function (data) {
  // console.log(store.user)

  const showCartHtml = showCartTemplate({ items: store.user.cart })
  $('#cart-items').html(showCartHtml)
  $('#cart-summary').html(showCartSummary({ summary: store.user }))
  $('#addToCartModal').modal('show')
}

const getUserCartSuccess = function (data) {
  console.log('in getusercart success data is', data)
  store.user.cart = data.user.cart
  console.log('get user store', store.user.cart)
}

module.exports = {
  getItemsSucces,
  updateCartSuccess,
  paymentSuccessful,
  paymentFailure,
  populateCart,
  getUserCartSuccess
}
