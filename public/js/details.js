let imagem = document.getElementById('imagem')
let nome = document.getElementById('nome')
let xp = document.getElementById('xp')

let url = document.URL
let urlId = url.split(`=`)
let id = urlId[urlId.length - 1]

getPokemonDesc(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (data) {
        abilities = data.abilities
        console.log(data);
        console.log(abilities[1]);
        imagem.src = data.sprites.front_default
        nome.textContent = data.name
        xp.textContent = xp.textContent + data.base_experience
        abilidades(abilities)


    })

async function getPokemonDesc(url) {
    let response = await fetch(url)
    let json = await response.json()
    return json
}

function abilidades(data) {
console.log(data);
    data.forEach(element => {
        let paragrafo = document.createElement("h4")
        let texto = document.createTextNode(element.ability.name)
        paragrafo.appendChild(texto)
        paragrafo.id = element.ability.name
        console.log(paragrafo);
        const content = document.getElementById("abilities")
        content.appendChild(paragrafo)
        let url = element.ability.url
        getPokemonDesc(url)
            .then(data => {
                console.log(data);
                let indice = acharIndice(data.effect_entries)
                console.log(indice);
                let desc = document.createElement("p")
                desc.id = "descricao"
                let texto = document.createTextNode(data.effect_entries[indice].effect)
                desc.appendChild(texto)
                const content = document.getElementById(data.name)
                content.appendChild(desc)
            })
            //element.generation.name
         
    });
}

function acharIndice(data) {
    //debugger
    for (let i = 0; i < data.length; i++) {
        if (data[i].language.name == "en") {
            console.log(data);
            return i
        }
    }
}




