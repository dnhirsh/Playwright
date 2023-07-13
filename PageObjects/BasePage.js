import { Navigation } from "./Navigation.js"

export class BasePage{
    constructor(page){
        this.page=page
        this.navigation = new Navigation(this.page)
    }
}