'use strict';
var fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');


const sequelize = new Sequelize(null, null, null, {
    dialect: "sqlite",
    storage: './database/database.db',
});

const Books = sequelize.import(path.join(__dirname, '/models/books'));

Books.sync({force: true})
    .then(() => {
        const books = JSON.parse(fs.readFileSync(path.join(__dirname, '/defaultBooks.json'), 'utf8'));
        return Promise.all(books.map(books => Books.create(books)));
    });

//2015-20-05
//yyyy-mm-dd
module.exports = Books;