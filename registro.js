


const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");
const registrar = document.getElementById("registrar");
const mensaje = document.getElementById("mensaje");


registrar.addEventListener("click", async function() {

    const nombreUsuario = usuario.value.trim();
    const password = contraseña.value.trim();

    if (nombreUsuario === "" || password === "") {

        mensaje.textContent = "Complete todos los campos";
        mensaje.style.color = "red";

        return;
    }


    const datos = {

        accion: "registrar",

        usuario: nombreUsuario,

        contraseña: password

    };


    try {

        const respuesta = await fetch(URL_GOOGLE, {

            method: "POST",

            body: JSON.stringify(datos)

        });


        const resultado = await respuesta.json();


        if (resultado.resultado === "ok") {

            mensaje.textContent = "Usuario registrado correctamente";
            mensaje.style.color = "green";

            usuario.value = "";
            contraseña.value = "";

        } else {

            mensaje.textContent = resultado.mensaje;
            mensaje.style.color = "red";

        }


    } catch (error) {

        console.error(error);

        mensaje.textContent = "No se pudo conectar con el servidor";
        mensaje.style.color = "red";

    }

});
