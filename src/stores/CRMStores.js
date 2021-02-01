import { observable, computed, action, makeObservable } from 'mobx'
import axios from 'axios'


export class CRMStores {
    constructor() {
        this.clients = []
        this.owners = []
        this.emailTypes = []
        this.chartsData = []

        makeObservable(this, {
            clients: observable,
            owners: observable,
            emailTypes: observable,
            getClients: action,
            getOwners: action,
            getHottestCountry: action,
            addClient: action,
            getEmailTypes: action,
            addClient: action,
            updateEmailType: action,
            newClients: computed,
            emailsSent: computed,
            outstandingClients: computed,
            getBudgetsData: action,
            getChartsData: action,
            chartsData: observable

        })
    }

    async getClients() {
        let data = await axios.get("http://localhost:3002/clients")
        this.clients = data.data[0]
    }

    async getOwners() {
        let data = await axios.get("http://localhost:3002/owners")
        this.owners = data.data[0]
    }

    async getEmailTypes() {
        let data = await axios.get("http://localhost:3002/email")
        this.emailTypes = data.data[0]
    }

    async getHottestCountry() {
        let data = await axios.get("http://localhost:3002/hottestCountry")
        return data.data.category
    }

    async addClient(newClient) {
        await axios.post('http://localhost:3002/client', newClient)
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

    get newClients() {
        const currentDate = new Date().toLocaleDateString()
        const newClientsList = this.clients.filter(c => c.date.slice(1)[0] == currentDate[0] && c.date.slice(6) == currentDate.slice(5))
        return newClientsList.length
    }

    get emailsSent() {
        return this.clients.filter(c => c.email_type !== null).length
    }

    get outstandingClients() {
        return this.clients.filter(c => c.sold == 0).length
    }

    async getBudgetsData() {
        let data = await this.getHottestCountry()
        const newClients = { value: this.newClients, title: 'New Clients this Month', icon: 'faChartLine', color: 'green' }
        const emailsSent = { value: this.emailsSent, title: 'Emails Sent', icon: 'faEnvelope', color: 'blue' }
        const outStandingClients = { value: this.outstandingClients, title: 'Outstanding Clients', icon: 'faUserCircle', color: 'red' }
        const hottestCountry = { value: data, title: 'Hottest Country', icon: 'faGlobeAmericas', color: 'yellow' }
        const budgetsData = [newClients, emailsSent, outStandingClients, hottestCountry]
        return budgetsData
    }

    async getChartsData() {
        let data = await axios.get("http://localhost:3002/chartsData")
        console.log(data.data);
        this.chartsData = data.data
    }
   
}

