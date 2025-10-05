const OBJETOS  = 2
const TIPOS  = 3 
const PUNTOS = 0

const intentos = document.getElementById("intentos")
const resultado = document.getElementById("resultado")
const divElementos = document.getElementById("objetos")



let contador = PUNTOS

const getObjetosDeck = () => {
    let deck = [];
    for(let i = 1; i <= TIPOS; i++) {
        for(let j = 0; j < OBJETOS; j++) {
            deck.push(i*10 + j)
        }
    }
    return _.shuffle(deck)
};

let objetoDeck = getObjetosDeck()

const getObjeto = () => {
    if(objetoDeck.length === 0) throw 'No hay más objetos'
    return objetoDeck.pop()
};

const btNuevoJuego = document.getElementById('btNuevoJuego')
const btAdivina = document.getElementById('btAdivina')

btNuevoJuego.addEventListener('click', () => {
    contador = PUNTOS
    objetoDeck = getObjetosDeck()
    resultado.innerHTML = ''
    intentos.innerHTML = `Puntos: ${contador}`
    divElementos.innerHTML = ''
    document.querySelectorAll('.drop').forEach(d => d.innerHTML = '')
});

let elementoArrastrado = null
const contenedoresDrop = document.querySelectorAll('.drop')

btAdivina.addEventListener('click', () => {
    if(objetoDeck.length === 0) {
        alert("No hay más objetos para añadir")
        return
    }
    const objeto = getObjeto()
    const div = document.createElement('div')
    div.classList.add('elemento')
    div.draggable = true

    const img = document.createElement('img')
    img.src = `assets/objetos/${objeto}.jpg`
    img.classList.add('recurso')
    div.appendChild(img)

    let tipoObjeto = Math.floor(objeto / 10)
    div.dataset.tipo = tipoObjeto

    divElementos.appendChild(div)

    div.addEventListener('dragstart', (e) => {
        elementoArrastrado = div
        e.dataTransfer.effectAllowed = "move"
    });
    div.addEventListener('dragend', () => {
        elementoArrastrado = null
    });
});


const pertenece = (objeto, contenedor) => {
    return objeto.substring(0,1) === contenedor
};

contenedoresDrop.forEach(drop => {
    drop.addEventListener('dragover', (e) => e.preventDefault())

    drop.addEventListener('drop', (e) => {
        e.preventDefault()
        if(elementoArrastrado === null) return



        if(pertenece(elementoArrastrado.dataset.tipo, drop.id)) {
            contador+=10
            drop.appendChild(elementoArrastrado)
            elementoArrastrado.classList.add("correcto")
            elementoArrastrado.classList.remove('draggable')
            intentos.innerHTML = `Puntos: ${contador}`
        } else {
            elementoArrastrado.classList.add("incorrecto")
            intentos.innerHTML = `Puntos: ${contador}`
        }

        if(contador === TIPOS * OBJETOS*10) {
            resultado.innerHTML = "¡Has ganado!"
        }
    });
});

intentos.innerHTML = `Puntos: ${contador}`




