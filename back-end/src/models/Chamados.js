const Sequelize = require('sequelize');

const db = require('./db');

const Chamados = db.define('chamados', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nome_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    contato_celular: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 20] // Garante que o campo tenha entre 1 e 50 caracteres
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            len: [1, 50] // Garante que o campo tenha entre 1 e 50 caracteres
        }
    },
    localizacao: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 50] // Garante que o campo tenha entre 1 e 50 caracteres
        }
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false,
    },  
    titulo_chamado: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 150] // Garante que o campo tenha entre 1 e 50 caracteres
        }
    },
    descricao_problema: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    prioridade: {
        type: Sequelize.TEXT,
    },
    status_chamado: {
        type: Sequelize.STRING,
        defaultValue: 'Novo'
    },
    
});

module.exports = Chamados;

Chamados.sync({force: true});