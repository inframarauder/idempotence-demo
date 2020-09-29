const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

let orders = [];
let walletBalance = 100;

app.post('/place_order', (req, res) => {
  //check if the user has sufficient wallet balance
  if (walletBalance < req.body.amount) {
    return res.status(400).json({ message: 'Insufficient wallet balance!' });
  }
  //create new order
  let newOrder = {
    id: Math.floor(1000 + Math.random() * 9000), //random 4 digit number to act as ID
    item: req.body.item,
    amount: req.body.amount,
  };

  //add it to orders database
  orders.push(newOrder);
  walletBalance = walletBalance - parseInt(req.body.amount);

  const response = {
    message: `Your order with order id ${newOrder.id} is placed!`,
  };

  return res.status(201).json(response);
});

app.get('/wallet_balance', (req, res) => {
  return res.status(200).json({ balance: walletBalance });
});

app.listen(3030, () => console.log('Server running!'));
