import { observable, action, makeObservable } from 'mobx'

export class UpdateStores {
    constructor() {
            this.last = ''
            this.first = ''
            this.owner = ''
            this.email = ''
            this.date = ''
            this.country = ''
            this.emailType = ''
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
    handleInput = ({ target }) => {
        if (target.name === 'date') {
            var array = (target.value).toString().split(/-/g);
            array.push(array.shift());
            this[target.name] = array.join('/')
        } else {
            this[target.name] = target.value
            console.log(this.last);
        }
    }

}