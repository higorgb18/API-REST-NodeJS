class Tabelas {
    init(connection) {
        this.connection = connection;

        this.criarAtendimentos();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, observacoes text, PRIMARY KEY (id))'

        this.connection.query(sql, (error) => {
            if (error) {
                console.log('Ocorreu um erro!', error);
            } else {
                console.log('Tabela iniciada com sucesso!');
            }
        })
    }
}

module.exports = new Tabelas;