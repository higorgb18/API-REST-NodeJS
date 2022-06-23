const conexao = require('../dbConfig/connection')
const uploadArquivo = require('../files/uploadArquivos')

class Pet {
    add(pet, res) {
        const query = 'INSERT INTO Pets SET?'

        uploadArquivo(pet.imagem, pet.nome, (error, novoCaminho) => {

            if (error) {

                res.status(400).json({ error })
                
            } else {

                const novoPet = {nome: pet.nome, imagem: novoCaminho}

                conexao.query(query, novoPet, error => {
                    if (error) {
                        console.log(error)
                        res.status(400).json(error)
                    } else {
                        res.status(200).json(novoPet)
                    }
                })

            }
        })
    }
}

module.exports = new Pet