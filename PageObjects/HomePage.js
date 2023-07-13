
import { expect } from "@playwright/test"
import { BasePage } from "./BasePage"

export class HomePage extends BasePage{
    constructor(page){
        super(page)
    }


    visit = async() =>{

        // Open Careers and wait for menu to show
        await this.page.goto("https://www.is.com/careers")
        await this.page.waitForLoadState('load')
        await expect(this.navigation.secMenu).toBeVisible()
    }

    openIsraelCareers = async() =>{
        
        // Open home page URL and select Israel
        await this.visit()
        await this.navigation.selectIsrael()
    }

}