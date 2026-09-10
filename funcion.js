const URL_GOOGLE = "https://script.google.com/macros/s/AKfycbyO4O4iXrnQVsP5nsxc_yi7nUNrCj7RoywPLq_qDHBwTDAp9tfgaUkvFkQ6d38Khrkf/exec";

const input = document.getElementById("medida");
const boton = document.getElementById("agregar");
const tabla = document.getElementById("tabla");
const totalGeneral = document.getElementById("totalGeneral");

let sumaTotales = 0;


// ========================================
// CARGAR DATOS DE GOOGLE SHEETS
// ========================================

async function cargarDatos() {

    try {

        const respuesta = await fetch(URL_GOOGLE);

        const registros = await respuesta.json();

        tabla.innerHTML = "";

        sumaTotales = 0;

        registros.forEach(function(datos) {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${datos.fecha}</td>
                <td>${datos.medida}</td>
                <td>${datos.valor}</td>
                <td>${datos.total}</td>
            `;

            tabla.appendChild(fila);

            sumaTotales += Number(datos.total);

        });

        totalGeneral.textContent = sumaTotales;

    } catch (error) {

        console.error("Error al cargar los datos:", error);

    }

}


// ========================================
// AGREGAR NUEVA MEDICIÓN
// ========================================

boton.addEventListener("click", async function() {

    const medida = Number(input.value);

    if (input.value === "" || isNaN(medida)) {

        alert("Escriba una medida válida");

        return;

    }

    const valor = 890;

    const total = medida * valor;

    const ahora = new Date();

    const dia = ahora.toLocaleDateString();
    const hora = ahora.toLocaleTimeString();

    const datos = {

        fecha: dia + " " + hora,
        medida: medida,
        valor: valor,
        total: total

    };


    try {

       const respuesta = await fetch(URL_GOOGLE, {

    method: "POST",

    body: new URLSearchParams({
        fecha: datos.fecha,
        medida: datos.medida,
        valor: datos.valor,
        total: datos.total
    })

});


        const resultado = await respuesta.json();


        if (resultado.resultado === "ok") {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${dia} ${hora}</td>
                <td>${medida}</td>
                <td>${valor}</td>
                <td>${total}</td>
            `;

            tabla.appendChild(fila);


            sumaTotales += total;

            totalGeneral.textContent = sumaTotales;


            input.value = "";

        }


    } catch (error) {

        console.error(error);

        alert("No se pudo guardar la medición");

    }

});


// ========================================
// CARGAR LOS DATOS AL ABRIR LA PÁGINA
// ========================================

cargarDatos();