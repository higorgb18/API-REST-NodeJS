const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.list(res);
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        
        Atendimento.buscaPorId(id, res);
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.add(atendimento, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.alterar(id, valores, res);
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.deleta(id, res);
    })
}