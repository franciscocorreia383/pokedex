let pokeTable = document.getElementById("poke-table")
let pokeBodyTable = pokeTable.getElementsByTagName("tbody")[0]
let navPrevious = document.getElementById('nav-previous')
let navNext = document.getElementById('nav-next')

let nextURL = ''
let previousURL = ''

// button.addEventListener("click", function(event){
//     console.log("Clicado");
// })

navNext.addEventListener("click", function(event){
    if(!navNext.classList.contains("disabled")){
       getPokemonList(nextURL).then(function(data){
            clearTable()
            fillTable(data)
        })
    }

})

navPrevious.addEventListener("click", function(event){
    if(!navPrevious.classList.contains("disabled")){
        getPokemonList(previousURL).then(function(data){
            clearTable()
            fillTable(data)
        })
    }
})

function clearTable(){
    let new_tbody = document.createElement('tbody')
    pokeBodyTable.parentNode.replaceChild(new_tbody, pokeBodyTable)
    pokeBodyTable = new_tbody
}

async function getPokemonList(url){
    let response = await fetch(url)
    let json = await response.json()
    return json
}

function fillTable(data){

    if(data.previous == null){
        navPrevious.classList.add("disabled")
    }else{
        navPrevious.classList.remove("disabled")
        navPrevious.href = data.previous
    }

    if(data.next == null){
        navNext.classList.add("disabled")
    }else{
        navNext.classList.remove("disabled")
    }
    
    nextURL = data.next
    previousURL = data.previous

    let pokemonList = []

    data.results.forEach(function(element, index, array){
        fetch(element.url)
        .then(function(results){
            return results.json()
        })
        .then(function(data){
            let pokemonInfo = {id:data.id, name:data.name, weight:data.weight}
            pokemonList.push(pokemonInfo)
            insertNewRow(data)
        })
    })
}


function insertNewRow(data){
    let newRow = pokeBodyTable.insertRow(-1);

            let idCell = newRow.insertCell(0);
            let idText = document.createTextNode(data.id);
            idCell.appendChild(idText)

            let nameCell = newRow.insertCell(1);
            let nameText = document.createTextNode(data.name);
            nameCell.appendChild(nameText)

            let weightCell = newRow.insertCell(2);
            let weightText = document.createTextNode(data.weight);
            weightCell.appendChild(weightText)

            let detailCell = newRow.insertCell(3);
            let detailButton = document.createElement("button");
            detailButton.className = "btn btn-primary"
            detailButton.textContent = "Detalhes"
            detailButton.addEventListener("click", function(event){
                window.open(`detail.html?id=${data.id}`,"_self")
            })
            detailCell.appendChild(detailButton)
            //console.log(`${data.id} - ${data.name}`);
}



getPokemonList("https://pokeapi.co/api/v2/pokemon").then(function(data){
    clearTable()
    fillTable(data)
})

// fetch('https://pokeapi.co/api/v2/pokemon')
//     .then(function(response){
//         return response.json()
//     })
//     .then(function(data){

        // if(data.previous == null){
        //     navPrevious.classList.add("disabled")
        // }else{
        //     navPrevious.classList.remove("disabled")
        //     navPrevious.href = data.previous
        // }

        // if(data.next == null){
        //     navNext.classList.add("disabled")
        // }else{
        //     navNext.classList.remove("disabled")
        // }
        
        // nextURL = data.next
        // previousURL = data.previous

        // data.results.forEach(function(element, index, array){
        //     fetch(element.url)
        //     .then(function(results){
        //         return results.json()
        //     })
        //     .then(function(data){
        //         let newRow = pokeBodyTable.insertRow(-1);

        //         let idCell = newRow.insertCell(0);
        //         let idText = document.createTextNode(data.id);
        //         idCell.appendChild(idText)

        //         let nameCell = newRow.insertCell(1);
        //         let nameText = document.createTextNode(data.name);
        //         nameCell.appendChild(nameText)

        //         let weightCell = newRow.insertCell(2);
        //         let weightText = document.createTextNode(data.weight);
        //         weightCell.appendChild(weightText)

        //         console.log(`${data.id} - ${data.name}`);
        //     })
        // })
    // })