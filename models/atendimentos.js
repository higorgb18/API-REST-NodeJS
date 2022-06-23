const moment = require('moment');
const axios = require('axios')
const conexao = require('../dbConfig/database/connection');

class Atendimento {
    add(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'A data não pode ser no passado!'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres!'
            }
        ]

        const errors = validacoes.filter(campo => !campo.valido);
        const hasErrors = errors.length > 0;

        if (hasErrors) {
            res.status(400).json(errors)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};

            const sql = 'INSERT INTO Atendimentos SET ?';

            conexao.query(sql, atendimentoDatado, (error, results) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json(atendimento);
                }
            })

        }

        
    }

    list(res) {
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente

            if (erro) {

                res.status(400).json(erro)

            } else {

                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data

                res.status(200).json(atendimento)

            }
        })
    }

    alterar(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (error, results) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({...valores, id});
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?';

        conexao.query(sql, id, (error, results) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Atendimento;