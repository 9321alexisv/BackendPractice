//-------------------------------DECLARACION DE VARIABLES-----------------------------------------------
const txtId = document.getElementById('txtId');
const txtNombre = document.getElementById('txtNombre');
const btnFindById = document.getElementById('btnFindById');
const txtDireccion = document.getElementById('txtDireccion');
const txtTitulo = document.getElementById('txtTitulo');
const btnRead = document.getElementById('btnRead');
const btnCreate = document.getElementById('btnCreate');
const btnUpdate = document.getElementById('btnUpdate');
const btnDelete = document.getElementById('btnDelete');
const resultados = document.getElementById('resultados');

//-------------------------------DECLARACION DE VARIABLES-----------------------------------------------

//-------------------------------LISTENER----------------------------------------------------------

btnRead.addEventListener('click', async () => {
    resultados.innerHTML = '';
    cargarClientes();
});

btnCreate.addEventListener('click', async () => {
    try {

        const id = parseInt(txtId.value, 10);
        const nombre = txtNombre.value;
        const direccion = txtDireccion.value;

        const nuevoCliente = {
            id: id,
            nombre: nombre,
            direccion: direccion
        };

        const response = await fetch('http://localhost:3000/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoCliente),
        });
        
        if (response.status === 201) {
            resultados.innerHTML = 'Registro Ingresado con exito';
        } else {
            resultados.innerHTML = 'Error al crear el registro';
        }
    } catch (error) {
        console.error(error);
    }
    cargarClientes();
})

btnFindById.addEventListener('click', async () => {
    try {
        const id = txtId.value;

        const response = await fetch(`http://localhost:3000/client/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.status === 200) {
            contenedor.innerHTML = '';
            resultados.innerHTML = '';

            const data = await response.json();

            // Crear una tabla
            const table = document.createElement('table');
            table.className = 'client-table';

            // Crear la fila de encabezado de la tabla con los títulos
            const headerRow = table.insertRow();
            const idHeader = document.createElement('th');
            idHeader.textContent = 'Id';
            headerRow.appendChild(idHeader);
            const nombreHeader = document.createElement('th');
            nombreHeader.textContent = 'Nombre';
            headerRow.appendChild(nombreHeader);
            const direccionHeader = document.createElement('th');
            direccionHeader.textContent = 'Dirección';
            headerRow.appendChild(direccionHeader);

            // Crear una fila para el cliente encontrado
            const clientRow = table.insertRow();
            const idCell = clientRow.insertCell();
            idCell.textContent = data.id;
            const nombreCell = clientRow.insertCell();
            nombreCell.textContent = data.nombre;
            const direccionCell = clientRow.insertCell();
            direccionCell.textContent = data.direccion;

            // Agregar la tabla al contenedor de resultados
            resultados.appendChild(table);
        } else if (response.status === 404) {
            // Si no se encuentra el cliente, mostrar un mensaje de error
            resultados.innerHTML = 'Cliente no encontrado';
        } else {
            // Manejar otros posibles errores de solicitud aquí
            resultados.innerHTML = 'Error en la solicitud';
        }
    } catch (error) {
        console.error(error);
    }
});


//-------------------------------LISTENER----------------------------------------------------------



//-------------------------------FUNCION CARGAR INFO-----------------------------------------------

const cargarClientes = async () => {
    try {
        const respuesta = await fetch("http://localhost:3000/client");

        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            // Crear una tabla
            const table = document.createElement('table');
            table.classList.add('client-table');

            // Crear la fila de encabezado de la tabla con los títulos
            const headerRow = table.insertRow();
            const idHeader = document.createElement('th');
            idHeader.textContent = 'Id';
            headerRow.appendChild(idHeader);
            const nombreHeader = document.createElement('th');
            nombreHeader.textContent = 'Nombre';
            headerRow.appendChild(nombreHeader);
            const direccionHeader = document.createElement('th');
            direccionHeader.textContent = 'Dirección';
            headerRow.appendChild(direccionHeader);

            // Iterar a través de los datos y crear filas de datos
            datos.forEach(client => {
                const clientRow = table.insertRow();
                const idCell = clientRow.insertCell();
                idCell.textContent = client.id;
                const nombreCell = clientRow.insertCell();
                nombreCell.textContent = client.nombre;
                const direccionCell = clientRow.insertCell();
                direccionCell.textContent = client.direccion;
            });

            // Obtener el contenedor y limpiarlo antes de agregar la tabla
            const contenedor = document.getElementById('contenedor');
            contenedor.innerHTML = '';
            
            // Agregar la tabla al contenedor
            contenedor.appendChild(table);
        } else if (respuesta.status === 401) {
            console.log('Mal');
        } else if (respuesta.status === 404) {
            console.log('El cliente que buscas no existe');
        } else {
            console.log('Hubo un error y no sabemos qué pasó');
        }
    } catch (error) {
        console.error(error);
    }
}
//-------------------------------FUNCION CARGAR INFO-----------------------------------------------

//cargarClientes();
