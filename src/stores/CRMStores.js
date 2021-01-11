import { observable, computed, action, makeObservable } from 'mobx'
import axios from 'axios'


export class CRMStores {
    constructor() {
        this.clients = []

        makeObservable(this, {
            clients: observable,
            getClients: action
        })
    }

    async getClients() {
    let data = await axios.get("http://localhost:3002/clients")
    console.log(data.data[0]);
    this.clients.push(data.data[0])
    }

    
}

