import { observable, computed, action, makeObservable } from 'mobx'


export class UpdateStores {
    constructor() {
            this.last = ''
            this.first = ''
            this.owner = ''
            this.email = ''
            this.date = ''
            this.country = ''
            this.sold = false

            makeObservable(this, {
                last: observable,
                first: observable,
                owner: observable,
                email: observable,
                date: observable,
                country: observable,
                sold: observable,
                handleInput: action
            })
    }
    // handleInput = ({ target }) => {
    //     console.log(target.value)
    //     this[target.name] = target.value
    // }

    handleInput = ({ target }) =>{
        this[target.name] = target.value
        console.log(this.first, this.country)
    }

}