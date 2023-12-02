const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const resultadodes = document.getElementById('resultado-des');
const rango = document.getElementById('rango');

// const textoCodificado = document.getElementById('textoCodificado');
const botonCopiar = document.getElementById('botonCopiar');
const botonCopiardes = document.getElementById('botonCopiar-des');

const shifMessage = () => {
    const wordArray = [...inputOriginal.value.toUpperCase()];
    printChar(0, wordArray);
}

const printChar = (currentLetterIndex, wordArray) => {
    if(wordArray.length === currentLetterIndex) return;
    inputOriginal.value = inputOriginal.value.substring(1)
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    animateChar(spanChar)
        .then( () => {
            const charSinCodificar = wordArray[currentLetterIndex];
            spanChar.innerHTML = alfabeto.includes(charSinCodificar) ? 
                alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length] : 
                charSinCodificar
            printChar(currentLetterIndex + 1, wordArray);
        });    
}

// Agregar funcionalidad de copiado al botón
botonCopiar.addEventListener('click', () => {
    const textoACopiar = resultado.innerText;
    navigator.clipboard.writeText(textoACopiar)
    // .then(() => {
    //     alert('Texto copiado al portapapeles');
    // })
    // .catch(err => {
    //     console.error('Error al intentar copiar el texto: ', err);
    // });
});

// Agregar funcionalidad de copiado al botón
botonCopiardes.addEventListener('click', () => {
    const textoACopiar = resultadodes.innerText;
    navigator.clipboard.writeText(textoACopiar)
});

const animateChar = spanChar => {
    let cambiosDeLetra = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            if(cambiosDeLetra === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}

const submit = e => {
    e.preventDefault();
    resultado.innerHTML = '';
    shifMessage()
}

cifrador.onsubmit = submit;




// DESCODIFICADOR

const inputOriginalDes = document.getElementById('input-original-des');
const descifrador = document.getElementById('descifrador');
const resultadoDes = document.getElementById('resultado-des');
const rangoDes = document.getElementById('rango-des');

const unshifMessage = () => {
    const wordArray = [...inputOriginalDes.value.toUpperCase()];
    resultadoDes.innerHTML = '';
    printCharDes(0, wordArray);
};

const printCharDes = (currentLetterIndex, wordArray) => {
    if(wordArray.length === currentLetterIndex) return;
    inputOriginalDes.value = inputOriginalDes.value.substring(1);
    const spanChar = document.createElement("span");
    resultadoDes.appendChild(spanChar);
    animateCharDes(spanChar)
        .then( () => {
            const charSinCodificar = wordArray[currentLetterIndex];
            spanChar.innerHTML = alfabeto.includes(charSinCodificar) ? 
            alfabeto[(alfabeto.indexOf(charSinCodificar) - parseInt(rangoDes.value) + alfabeto.length) % alfabeto.length] : 
            charSinCodificar;
            printCharDes(currentLetterIndex + 1, wordArray);
        });
};

const animateCharDes = spanChar => {
    let cambiosDeLetra = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            if(cambiosDeLetra === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
};

const submitDes = e => {
    e.preventDefault();
    unshifMessage();
};

descifrador.onsubmit = submitDes;