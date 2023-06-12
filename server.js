const express = require("express")
const app = express();
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/OSFCardSort');
}
const Card = mongoose.connection.collection('cards');

app.get("/", function(req, res) {
    var data = Card.find();
    console.log(data);
});

app.listen(3000, function(){
    console.log('Listening on port 3000');
});