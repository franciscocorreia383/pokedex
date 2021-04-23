let imagem = document.getElementById('imagem')
let nome = document.getElementById('nome')

let url = document.URL
let urlId = url.split(`=`)
let id = urlId[urlId.length-1]
//console.log(`https://pokeapi.co/api/v2/pokemon/${id}`);

fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(function(response){
    return response.json()
}).then(function(data){
    console.log(data);
    imagem.src = data.sprites.front_default
    nome.textContent = data.name
})

