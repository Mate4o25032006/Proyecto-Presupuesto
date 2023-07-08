const ingresos = [
    new Ingreso('Sueldo', 3500000),
    new Ingreso('Alquiler', 1300000),
    new Ingreso('Tienda', 2200000),
    new Ingreso('Finca', 3300000)
];

const egresos = [
    new Egreso('Meercado', 500000),
    new Egreso('Salud', 280000),
    new Egreso('Transporte', 280000)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let cargarCabecero  = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

let totalIngresos  = () =>{
    let totalIngresos =  0;
    for(let ingreso of ingresos){
        //Recorro el arreglo de ingresos y por cada ingreso del arreglo 'ingresos acumulo el atributo valor yy lo guardo en la variable 'totalIngresos'
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

let totalEgresos  = () =>{
    let totalEgresos =  0;
    for(let egreso of egresos){
        totalEgresos+= egreso.valor;
    }
    return totalEgresos;
}

const formatoMoneda  = (valor) => {
    return valor.toLocaleString('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits: 2})
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-CO', {style: 'percent', minimumFractionDigits: 2})
}

//*INGRESOS
const cargarIngresos = () =>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        //Por cada objeto 'ingreso' este es pasado como parámetro a la función 'crearIngresoHTML'
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

//Recibimos ingreso que se está iterando en este momento
//Por cada objeto 'ingreso' se generá el código HTML, el cual regresa a la varible  que llamó la función (ingresosHTML)
const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline"
                        onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;

    return ingresoHTML;
    console.log(ingresoHTML);
}

const eliminarIngreso = (id) => {
    //Por cada objeto del arreglo hacemos una comparación: ingreso.id es es objeto que se está iterando y id es el objeto que proporcionamos como parámetro. Si el objeto y el id coinciden regresamos el indice del arreglo
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    //SPLICE indicamos que se eliminará un indice
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}



//*EGRESOS

const cargarEgresos = () =>{
    let egresosHTML = '';
    for(let egreso of egresos){
        //concatenamos cada uno de los egresos que vayamos encontrando
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let EgresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

    return EgresoHTML;
}

let eliminarEgreso = (id) =>{
    let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
    //SPLICE indicamos que se eliminará un indice
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}


let agregarDato = () =>{
    let forma = document.forms['forma'];

    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    //Accedo al atributo de value para recuperar la información del input
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}