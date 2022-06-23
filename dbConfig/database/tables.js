class Tabelas {
    init(connection) {
        this.connection = connection;

        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, observacoes text, PRIMARY KEY (id))'

        this.connection.query(sql, (error) => {
            if (error) {
                console.log('Ocorreu um erro!', error);
            } else {
                console.log('Tabela Atendimentos iniciada com sucesso!');
            }
        })
    }

    criarPets() {
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(200), PRIMARY KEY (id))';

        this.connection.query(query, error => {
            if (error) {
                console.log('Ocorreu um erro!', error);
            } else {
                console.log('Tabela Pets iniciada com sucesso!');
            }
        })
    }
}

module.exports = new Tabelas;