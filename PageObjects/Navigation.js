const { expect } = require('@playwright/test');


export class Navigation{
    constructor(page){
        this.page=page
        this.primaryMenu = page.locator('#primary-menu')
        this.secMenu = page.locator('.secondary-menu-career')
        this.careersIsrael = page.getByRole('link', { name: 'Israel' })
    }

    selectIsrael = async() =>{
        await this.careersIsrael.click()
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveURL(/israel/)
    }
      
}
