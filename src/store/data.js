import { makeAutoObservable } from "mobx";
import axios from 'axios';

class DB {
    
    companyData = []

    constructor() {
        makeAutoObservable(this)
    }

    resetData(value) {
        this.companyData = value
    }

    async getCompanyData(named) {
        const res = await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party', {
            "query": named
        }, {
            headers: {
                "Authorization": "TOKEN",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(e => e.data)
        console.log(res.suggestions)
        this.companyData = res.suggestions
    }
}

export default new DB()