// nuestra funcion de adicion y sustraccion
const add = (a,b) => a + b;
const substract = (a, b) => add(a, -b);
// aqui number es un numero cualquiera, times está destinado a ser un numero entre 0 y 9
const replicate = (number , times) => {return Array(times).fill(number);}
// usamos una funcion que añade un cero a un numero
const addCero = (a) => {return replicate(a, 10).reduce(add, 0);}
// funcion para añadir decenas
const addTens = (a, b) => {return add(addCero(a), b);} 
// esta funcion permite manejar problemas con replicate, acotando su longitud maxima 
const splitNumber = (number) => {return (number.toString().split("")).map(value => parseInt(value));}
// primer paso de la multiplicacion
const coreMultiply = (a, b) => {return splitNumber(b).map(value => replicate(a, value))}
// se añade el caso en el que b es menor que cero
const intCoreMultiply = (a, b) => (b > 0 ? coreMultiply(a, b):coreMultiply(-a, -b))
// se obtiene el numero de unidades,decenas,centenas, etc...
const addUpTerms = (array) => {return array.map(value => value.reduce(add, 0))}
// utilizamos addCero para reducir el arreglo de addUpTerms
const reduceMultiplication = (array) =>{return array.reduce(addTens, 0)}
// finalmente añadimos nuestra multiplicacion de enteros, esta es nuestra funcion
// de multiplicacion para enteros
const integerMultiply = (a, b) => {return reduceMultiplication(addUpTerms(intCoreMultiply(a, b)))}

// ahora pasamos a la construccion de la division
const positiveDivision = (a, b, start) => {return integerMultiply(b, start) === a ? 
                                    [start, 0]: 
                                    integerMultiply(b, start) > a ? [start -1, a -integerMultiply(b, start-1)]: 
                                    positiveDivision(a, b, start+1)}


// finalmente definimos las funciones asociadas a la interaccion con la interfaz
const myWriter = (value) => {document.getElementById("MyInput2").value === '' ? 
                             document.getElementById("MyInput").value += value.toString():
                             document.getElementById("MyInput3").value += value.toString()}

const myOperationWriter = (value) => {document.getElementById("MyInput").value === '' ?
                                      null:
                                      document.getElementById("MyInput2").value = value.toString();}

const myClear = () => {
    document.getElementById("MyInput").value = "";
    document.getElementById("MyInput2").value = "";
    document.getElementById("MyInput3").value = "";
}

const getValue = (element) =>{return document.getElementById(element).value}

const compute = () =>{getValue("MyInput3") === '' ?
                      null:
                      getValue("MyInput2") === '+' ?
                      document.getElementById("MyInput").value = add(parseInt(getValue("MyInput")), parseInt(getValue("MyInput3"))):
                      getValue("MyInput2") === '-' ?
                      document.getElementById("MyInput").value = add(parseInt(getValue("MyInput")), -parseInt(getValue("MyInput3"))):
                      getValue("MyInput2") === '*' ?
                      document.getElementById("MyInput").value = integerMultiply(parseInt(getValue("MyInput")), parseInt(getValue("MyInput3"))):
                      getValue("MyInput2") === '/' ?
                      document.getElementById("MyInput").value = positiveDivision(parseInt(getValue("MyInput")), parseInt(getValue("MyInput3")), 1)[0]:
                      getValue("MyInput2") === '%' ?
                      document.getElementById("MyInput").value = positiveDivision(parseInt(getValue("MyInput")), parseInt(getValue("MyInput3")), 1)[1]:
                      null}