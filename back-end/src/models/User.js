const Sequelize = require('sequelize'); //Fazendo a requisição do sequelize

const db = require('./db'); //Fazendo a requisição do arquivo ./db

const User = db.define('users',{ //Definindo as propriedades dos atributos da tabela "users" do banco de dados
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 80] // Garante que o campo tenha entre 1 e 50 caracteres
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 50] // Garante que o campo tenha entre 1 e 50 caracteres
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            len: [1, 100] // Garante que o campo tenha entre 1 e 50 caracteres
        }
    },
    recover_password: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }
});

//Criar a tabela
User.sync({force: true});

module.exports = User;