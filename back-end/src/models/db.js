const Sequelize = require('sequelize'); //Fazer a requisição do sequelize, dependência do node para integração com banco de SGBD's

const sequelize = new Sequelize(process.env.DB_URI);

sequelize.authenticate() //Realizar a autenticação do banco de dados, com tentativas de conexão utilizando o THEN e CATCH
.then(function() {
    console.log("Conexão com o banco de dados realizada com sucesso!");

}).catch(function() {
    console.log("Conexão com o banco de dados não realizada com sucesso!");
});

module.exports = sequelize; //Exportar o módulo sequelize para ser utilizado em outros arquivos, como no User.js
