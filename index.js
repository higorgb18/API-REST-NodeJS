const customExpress = require('./config/customExpress');
const connection = require('./dbConfig/database/connection');
const Tabelas = require('./dbConfig/database/tables');

connection.connect(error => {
    if (error){
        console.log('Ocorreu um erro!', error);
    } else {
        console.log('Conexão estabelecida');

        Tabelas.init(connection);
        const app = customExpress();
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    }
})
