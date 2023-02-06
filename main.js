// let consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
// .then(resposta => resposta.json())
// .then(r => {
//     if (r.erro) {
//         throw Error('Esse CEP não existe')
//     }else{
//         console.log(r)
//     }
//     })
// .catch(erro => console.log(erro))
// .finally(mensagem => console.log('Processamento Concluido'));

// console.log(consultaCEP);

async function buscaCep (numero){
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try{
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${numero}/json/`);
        let consultaCEPConvertido = await consultaCEP.json();
        if(consultaCEPConvertido.erro){
            throw Error ('CEP não existente!')
        }
        var cidade =document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = consultaCEPConvertido.localidade;
        logradouro.value = consultaCEPConvertido.logradouro;
        estado.value = consultaCEPConvertido.uf;
        bairro.value = consultaCEPConvertido.bairro;

        console.log(consultaCEPConvertido)
        return consultaCEPConvertido;
    }catch (erro){
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente</p>`
        console.log(erro);
    }
}

let cep = document.getElementById('cep');
cep.addEventListener("focusout", ()=> buscaCep(cep.value));