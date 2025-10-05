const OBJETOS  = 2;  
const TIPOS  = 3;   
const vidas = 5;

const divElementos = document.getElementById("objetos");

const getObjetosDeck = () => {
    let deck = [];
    for(let i = 1; i <= TIPOS; i++) {
        for(let j = 0; j < OBJETOS; j++) {
            deck.push(i*10+ j); 
        }
    }
    return _.shuffle(deck);
};

let objetoDeck = getObjetosDeck();

const getObjeto = () => {
    if(objetoDeck.length === 0) throw 'No hay más objetos';
    return objetoDeck.pop();
};


const btNuevoJuego = document.getElementById('btNuevoJuego');
const btAdivina = document.getElementById('btAdivina');


btNuevoJuego.addEventListener('click', () => {
    objetoDeck = getObjetosDeck();
    resultado.innerHTML = '';
    divElementos.innerHTML = '';
    document.querySelectorAll('.drop').forEach(d => d.innerHTML = '');
});


let elementoArrastrado = null;
const contenedoresDrop = document.querySelectorAll('.drop');

btAdivina.addEventListener('click', () => {
    if(objetoDeck.length === 0) {
        alert("No hay más objetos para añadir");
        return;
    }
    const objeto = getObjeto();
    const div = document.createElement('div');
    div.classList.add('elemento');
    div.draggable = true;

    const img = document.createElement('img');
    img.src = `assets/objetos/${objeto}.jpg`;
    img.classList.add('recurso')
    div.appendChild(img);

    divElementos.appendChild(div);


});




