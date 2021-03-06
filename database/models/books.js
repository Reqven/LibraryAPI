'use strict';

const Books = (sequelize, DataTypes) => {
    return sequelize.define('Books', {
        //No need to define an id, sequelize create an "id"
        //primary key by itself
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Book\'s name is missing'
                }
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        release: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
            validate: {
                isDate: {
                    msg: 'Release date is incorrect!'
                }
            }
            //2015-20-05
            //yyyy-mm-dd
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                isBoolean: {
                    args: true,
                    msg: 'Books.state is not a boolean'
                }
            }
        },
    });
};

module.exports = Books;