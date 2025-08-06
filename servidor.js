const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) =>{
    //console.log("Solicitação realizada");
    console.log(req.url, req.method);


    // //definindo o tipo de conteúdo do cabeçalho
    // res.setHeader('Tipo-conteudo', 'texto/simples')

    // //escrevendo a resposta
    // res.write('<head><link rel="stylesheet" href="#"></head>');
    // res.write('<p>Ola pessoal</p>');
    // res.write('<p>Ola novamente, pessoal</p>');
    // res.end();  //tem que por o end se não fica em looping

    //definindo o conteúdo de cabeçalho por html
    res.setHeader('Tipo-Conteudo', 'texto/html')

   


    //enviado um arquivo html   ANTES
//     fs.readFile('./views/index.html', (err,data)=> {
//         if(err){
//             console.log(err);
//             res.end();            
//         }else{
//             //res.write(data)
//             res.end(data);
//         }
//     })
// });


 //caminho dos arquivos html   DEPOIS   (trabalhando com rotas)
    let caminho = './views/';   //--> constante que armazena caminhos
    switch(req.url){
        case '/':
            caminho += 'index.html';
            res.statusCode = 200;
            break;

        case '/sobre':
            caminho += 'sobre.html';  //ANTES DO REDIRECIONAMENTO nossaempresa
            res.statusCode = 200;
            break;

        case '/nossaempresa':            
            res.statusCode = 301;
            res.setHeader('location', '/sobre');
            break;        

        default:
            caminho += '404.html';
            res.statusCode = 404;
            break;
    }

fs.readFile(caminho, (err,data)=> {  // NOTE que aqui mudou para o nome da constante caminho, antes era './views/index.html'
        if(err){
            console.log(err);
            res.end();            
        }else{
            //res.write(data)
            res.end(data);
        }
    })
});

server.listen(3000,'localhost',() => {
    console.log("ouvindo requisição na porta 3000");
});