#!/usr/bin/env node

const [dados, shl, fs, os] = [require("./db"), require("shelljs"), require("file-system"), require("os")];

// function pegaComandos() {
//     inquirer.prompt(, (res) => {
//         if(res === "e"){
//             inquirer.close();
//         } else {
//             pegaComandos()
//         }
//     })
// }

switch(process.argv[2]){
    case "add":

        process.argv[3] && process.argv[4]? (async () => {
            /**
             * MEU DEUS QUE CODIGO FEIO, eu sei, mas fica legal no arquivo DB depois
             */

            // console.log("Adicione os comandos à serem executados sempre que o projeto for chamado:(e para sair)")
            
            // const comandos = await pegaComandos()

            fs.writeFile(`${os.homedir()}/Documents/codigos/bashScripts/work/db/index.js`,

`const dados = [${dados.map(trab => `
    {
        projeto: "${trab.projeto}",
        path: "${trab.path}"
    }`)},
    {
        projeto: "${process.argv[3]}",
        path: "${shl.pwd()}/${process.argv[4]}"
    }
]

module.exports = dados`,

            err => {if(err) throw err})

        })() : (
            console.error("ERRO: voce deve definir um alias e um caminho respectivamente")
        );

    break

    case "rem":
        process.argv[3] ? (() => {

fs.writeFile(`${os.homedir()}/Documents/codigos/bashScripts/work/db/index.js`,

`const dados = [${dados.splice(dados.findIndex(dado => dado.projeto == process.argv[3]), 1),dados.map(trab => `
    {
        projeto: "${trab.projeto}",
        path: "${trab.path}"
    }`)}
]

module.exports = dados`,

err => {if(err) throw err})

        })() : (
            console.error("ERRO: voce deve definir um alias")
        );

    break

    case "list":
        console.table(dados)
    break

    case undefined || "--help":
        console.log(`
COMANDOS:

add - adiciona um alias com um caminho
      uso: add [alias] [caminho / . para o diretório atual] 

rem - remove um alias e seu caminho
      uso: rem [alias]

list - lista todos os alias e seus caminhos
        `)
    break

    default:
        let encontrado = false
        for (index in dados) {
            if(dados[index].projeto === process.argv[2]){
                console.log("iniciando projeto..."),
                shl.exec(`code -r ${dados[index].path}`)
                encontrado = true
            }
        }

        if(!encontrado) console.log("projeto não encontrado")
        
    break

}

// 	*)
// 		for i in "${!trabalhos[@]}"; do

// 			if [ "$1" == "${trabalhos[i]}" ] ; then
// 				echo iniciando projeto...
// 				code -r "${paths[i]}"
// 			fi
// 		done
// 	;;

// esac