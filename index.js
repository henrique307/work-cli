#!/usr/bin/env node
const [[trabalhos, links], shl, fs] = [require("./db"), require("shelljs"), require("file-system")];

// FUNCTIONS

function get_index() {
    trabalhos.includes(process.argv[2]) ? "encontrei":"nao ta aqui nao"
}

switch(process.argv[2]){
    case "add":

        process.argv[3] ? (() => {
/**
 * MEU DEUS QUE CODIGO FEIO, eu sei, mas fica legal no arquivo DB depois
 */

// TRABALHOS

fs.writeFile("./db/trabalhos.js",

`const trabalhos = [${trabalhos.map(trab => `
    "${trab}"`)},
    "${process.argv[3]}"
]

module.exports = trabalhos`,

err => {if(err) throw err})

// LINKS

fs.writeFile("./db/links.js",

`const links = [${links.map(link => `
    "${link}"`)},
    "${shl.pwd()}/${process.argv[4]}"
]

module.exports = links`,

err => {if(err) throw err})

    })() : (
            shl.echo("voce deve definir um alias e uma rota respectivamente")
    );
    break

    case "rem":
        process.argv[3] ? (() => {

fs.writeFile("./db/trabalhos.js",

`const trabalhos = [${trabalhos.splice(trabalhos.indexOf(process.argv[3]), 1),trabalhos.map(trab => `
    "${trab}"`)}
]

module.exports = trabalhos`,

err => {if(err) throw err})

// LINKS

fs.writeFile("./db/links.js",

`const links = [${links.splice(trabalhos.indexOf(process.argv[3]), 1),links.map(link => `
        "${link}"`)}
]

module.exports = links`,

err => {if(err) throw err})

        })() : (
            shl.echo("voce deve definir um alias e uma rota respectivamente")
        );

    break

    case "list":
            const objeto = trabalhos.map((trab, index) => {})

    default:

}

// 	"list")
// 		for (( i=0; i<${#trabalhos[@]}; i++ )); do
//            printf "\n\"${trabalhos[i]}\"................${links[i]}\n"
//         done
// 	;;
// 	*)
// 		for i in "${!trabalhos[@]}"; do

// 			if [ "$1" == "${trabalhos[i]}" ] ; then
// 				echo iniciando projeto...
// 				code -r "${links[i]}"
// 			fi
// 		done
// 	;;

// esac