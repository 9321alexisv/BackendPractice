import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ClientService {
    private clients = [
        {
            id: 1,
            nombre: 'cliente1',
            direccion: 'direccion1'
        },
        {
            id: 2,
            nombre: 'cliente2',
            direccion: 'direccion2'
        }
    ]

    findAll() {
        return this.clients;
    }

    findById(id: number) {

        const client = this.clients.find(c => c.id === id);
        if (!client) {
            throw new NotFoundException(`Client with id ${id} does not exist`);
        }
        return client;
    }

    updateClient(clientBody, id) {
        //Validaciones

        const client = this.clients.find(c => c.id === id);

        if (!client) {
            throw new NotFoundException(`Client with id ${id} does not exist`);
        }

        client.nombre = clientBody.nombre || client.nombre;
        client.direccion = clientBody.direccion || client.direccion;

        return { status: 'cliente actualizado' };
    }

    deleteClient(id) {

        const clientIndex = this.clients.findIndex(c => c.id === id);

        if (clientIndex === -1) {
            throw new NotFoundException(`Client with id ${id} does not exist`);
        }

        //Logica para eliminar
        this.clients.splice(clientIndex, 1);

        return { status: 'cliente eliminado' };
    }

    createClient(clientBody) {
        //Validaciones

        const existingClient = this.clients.find(c => c.id === clientBody.id);

        if (existingClient) {
            throw new NotFoundException(`Client with id ${clientBody.id} already exist`);
        }

        // Crear un nuevo cliente con los datos proporcionados en el body
        const newClient = {
        id: clientBody.id, // Asegúrate de proporcionar el ID en el body
        nombre: clientBody.nombre,
        direccion: clientBody.direccion,
    };

    // Agregar el nuevo cliente a la lista de clientes
    this.clients.push(newClient);

        return { status: 'cliente creado' };
    }
}

//coment prueba