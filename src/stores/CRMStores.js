import { observable, computed, action, makeObservable } from 'mobx'
import axios from 'axios'


export class CRMStores {
    constructor() {
        this.clients = []
        this.owners = []

        makeObservable(this, {
            clients: observable,
            owners: observable,
            getClients: action,
            getOwners: action,
            addClient: action
        })
    }

    async getClients() {
    let data = await axios.get("http://localhost:3002/clients")
    console.log(data.data[0]);
    this.clients.push(data.data[0])
    }

    async getOwners(){
    let data = await axios.get("http://localhost:3002/owners")
    console.log(data.data[0]);
     this.owners = data.data[0]
    }

   async addClient(newClient) {
        await axios.post('http://localhost:4200/client', newClient)
        this.getClients()
    }

    
}

