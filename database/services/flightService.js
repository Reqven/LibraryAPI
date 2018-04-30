'use strict';
const db = require('../database');


exports.find = (({reference}) => {
    return db.Flights.findAll({
        where: {
            reference:reference
        }
    })
});