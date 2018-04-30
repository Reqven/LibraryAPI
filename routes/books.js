const Books = require('../database/index');
var request = require('request-promise');
var express = require('express');
var router  = express.Router();

//get books list or a specific book by sending its id
router.get('/', async (req, res, next) => {
    console.log(req.query);
    if (req.query && req.query.id) {
        Books.find({
            where: {
                id: req.query.id
            }
        }).then(book => {
            console.log(book);
            if (book != null)
                return res.status(200).send(book);
            else {
                return res.status(404).json({
                    msg: 'No book found for the provided id'
                });
            }
        }).catch(e => {
            return res.status(404).send(e);
        });
    } else {
        Books.findAll().then(books => {
            console.log('all');
            return res.status(200).send(books);
        })
    }
});

//delete book by Book.id
router.get('/delete', async (req, res, next) => {
    if(req.query.id && req.query.id != '') {
        Books.destroy({
            where: {
                id: req.query.id,
            },
        }).then(deleted => {
            if (deleted)
                res.status(200).json({
                    msg: 'The book has been successfully deleted'
                });
            else
                res.status(404).json({
                    msg: 'No book found for the provided id'
                });
        });
    } else {
        res.status(400).json({
            msg: 'You must pass a book\'s id to delete it'
        });
    }
});

//add a new book
router.get('/add', async (req, res, next) => {
    if(req.query) {
        Books.create(req.query)
            .then(book => {
                return res.status(200).json({
                    msg: 'The book has been successfully created',
                    book: book
                });
            }).catch(e => {
                return res.status(404).json({
                    msg: e.errors[0].message
                });
            });
    } else {
        res.status(400).send('Missing data');
    }
});

//update an existing book
router.get('/update', async (req, res, next) => {
    if (req.query && req.query.id) {
        Books.find({
            where: {
                id: req.query.id
            }
        }).then(book => {
            console.log(book);
            if (book) {
                Books.update(req.query, { 
                    where: {
                        id: req.query.id
                    }
                }).then((result) => {
                    return res.status(200).json({
                        msg: 'The book has been successfully updated'
                    });
                }).catch(e => {
                    return res.status(400).json({
                        msg: e.errors[0].message
                    });
                });
            } else {
                return res.status(404).json({
                    msg: 'No book found for the provided id'
                });
            }
        }).catch(e => {
            return res.status(400).json({
                msg: e.errors[0].message
            });
        });
    } else {
        res.status(400).send('Missing data');
    }
});

module.exports = router;