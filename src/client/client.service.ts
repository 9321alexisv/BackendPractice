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

        //Logica para actualizar

        return { status: 'cliente actualizado' };
    }

    deleteClient(id) {

        const client = this.clients.find(c => c.id === id);

        if (!client) {
            throw new NotFoundException(`Client with id ${id} does not exist`);
        }

        //Logica para eliminar

        return { status: 'cliente eliminado' };
    }

    createClient(clientBody) {
        //Validaciones

        const client = this.clients.find(c => c.id === clientBody.id);

        if (client) {
            throw new NotFoundException(`Client with id ${clientBody.id} already exist`);
        }

        //Logica para crear el cliente
        return { status: 'cliente creado' };
    }
}

//coment prueba