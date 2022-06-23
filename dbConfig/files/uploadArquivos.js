const fs = require('fs');
const path = require('path')

module.exports = (caminho, nomeArquivo, callbackSucesso) => {
    const tipo = path.extname(caminho)
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if (tipoValido) {

        const novoCaminho = `./assets/images/${nomeArquivo}${tipo}`
    
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackSucesso(false, 
            novoCaminho))

    } else {

        const error = 'O formato é inválido'
        console.log('Formato de arquivo inválido!')
        callbackSucesso(error)

    }

}


