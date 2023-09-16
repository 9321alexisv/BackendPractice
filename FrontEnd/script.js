//-------------------------------DECLARACION DE VARIABLES-----------------------------------------------

const txtTitulo = document.getElementById('txtTitulo');

//-------------------------------DECLARACION DE VARIABLES-----------------------------------------------


//-------------------------------FUNCION CARGAR PELICULAS-----------------------------------------------

const cargarClientes = async () => {
    try {
        const respuesta = await fetch("http://localhost:3000/client");

        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let clients = '';
            datos.forEach(client => {
                clients += `
                                <div class = "client">
                                    <h1 class="nombre">${client.nombre}</h1>
                                    <br>
                                    <div class = "direccion">${client.direccion}</div>
                                    <br>
                                    <h5 class = "id">${client.id}</h5>
                                </div> 
                        `;
            });
            console.log(datos);

            document.getElementById('contenedor').innerHTML = clients;

        } else if (respuesta.status === 401) {
            console.log('Mal');
        } else if (respuesta.status === 404) {
            console.log('El cliente que buscas no existe');
        } else {
            console.log('Hubo un error y no sabemos qué pasó');
        }

    } catch (error) {
        console.log(error);
    }
}

cargarClientes();

//-------------------------------FUNCION CARGAR PELICULAS-----------------------------------------------


