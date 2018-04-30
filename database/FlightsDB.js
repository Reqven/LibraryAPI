'use strict';

const Flights = (sequelize, DataTypes) => {
    return sequelize.define('Flights', {
        reference: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: '-> Missing reference' }
            }
        },
        origin: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: '-> Missing origin' }
            }
        },
        destination: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: '-> Missing destination' }
            }
        },
        date:           { type: DataTypes.DATE      },
        placesLeft:     { type: DataTypes.INTEGER   },
        price:          { type: DataTypes.INTEGER   },
        company:        { type: DataTypes.STRING    }
    });
};

module.exports = Flights;