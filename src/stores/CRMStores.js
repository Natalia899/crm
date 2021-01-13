import { observable, computed, action, makeObservable } from 'mobx'
import axios from 'axios'


export class CRMStores {
    constructor() {
        this.clients = []
        this.owners = []
        this.emailTypes = []
        

        makeObservable(this, {
            clients: observable,
            owners: observable,
            emailTypes: observable,
            getClients: action,
            getOwners: action,
            addClient: action,
            getEmailTypes: action,
            addClient: action,
            updateEmailType: action
        })
    }

    async getClients() {
    let data = await axios.get("http://localhost:3002/clients")
    console.log(data.data[0]);
    this.clients=data.data[0]
    }

    async getOwners(){
    let data = await axios.get("http://localhost:3002/owners")
    console.log(data.data[0]);
     this.owners = data.data[0]
    }

    async getEmailTypes() {
    let data = await axios.get("http://localhost:3002/email")
    console.log(data.data[0]);
     this.emailTypes = data.data[0]
    }

   async addClient(newClient) {
        await axios.post('http://localhost:3002/client/id', newClient)
        this.getClients()
    }
    async updateEmailType(name, newType) {
        await axios.put(`http://localhost:3002/client/${name}`, newType)
        this.getClients()
    }

    async updateOwner(name, newOwner) {
        await axios.put(`http://localhost:3002/client/${name}`, newOwner)
        this.getClients()
    }

    async updateSold(name, newValue) {
        await axios.put(`http://localhost:3002/client/${name}`, newValue)
        this.getClients()
    }


    // filterClients (event) {
    //    let tempList = [...this.clients]
    //    tempList.list.filter
    // }
}

