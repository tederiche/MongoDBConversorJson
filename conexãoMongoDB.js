const fs = require('fs')
const {MongoClient} = require ('mongodb')

const url = 'mongodb://localhost:27017/empresaTest'

async function fazerPesquisa(valorCid10, valorCidTipo) {
    const client = new MongoClient(url)

    try {
        await client.connect();

        const colecoes = ['CAT-2005', 'CAT-2006', 'CAT-2007', 'CAT-2008', 'CAT-2009', 
        'CAT-2010', 'CAT-2011', 'CAT-2012', 'CAT-2013', 'CAT-2014', 'CAT-2015', 'CAT-2016',
        'CAT-2017', 'CAT-2018', 'CAT-2019', 'CAT-2020', 'CAT-2012-NICOLAS-PLAN2', 'CAT-2013-NICOLAS-PLAN3', 'CAT-2014-NICOLAS-PLAN4',
        'CAT-2015-NICOLAS-PLAN10','CAT-2015-NICOLAS-PLAN5', 'CAT-NICOLAS-PLAN0', 'CAT-NICOLAS-PLAN11', 'CAT-NICOLAS-PLAN12', 
        'CAT-NICOLAS-PLAN13', 'CAT-NICOLAS-PLAN14', 'CAT-NICOLAS-PLAN8', 'CAT-NICOLAS-PLAN9', 'CAT-NICOLAS2017-PLAN6']

        const resultadosPorColecao = []

        for( const colecaoNome of colecoes ){
            const colecao = client.db().collection(colecaoNome)

            const query = {
                CID_10: valorCid10,
                CID_TIPO: valorCidTipo};

            const resultado = await colecao.find(query)
                .toArray()

            resultadosPorColecao.push({colecao: colecaoNome, resultado})
        }

        console.log('resultado por colecaoNome:', resultadosPorColecao)
        return resultadosPorColecao
    }
    finally {
       await client.close();
    }
}
const valorCid10Usuario = "F06"
const valorCidTipoUsuario = "4" 

fazerPesquisa( valorCid10Usuario, valorCidTipoUsuario)
    .then(resultados => {
        resultadosTotais = [].concat(...resultados.map(item => item.resultado))
        fs.writeFileSync('resultados.json', JSON.stringify(resultados, null, 2));
        console.log('resultados salvos no arquivos resultado.json');
    })
    .catch(error => {
        console.error(
            'error ao execultar pesquisa', error
        )
    })
