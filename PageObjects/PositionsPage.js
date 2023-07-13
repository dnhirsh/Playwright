import { expect } from "@playwright/test"
import { BasePage } from "./BasePage"
import { ApplyPage } from "./ApplyPage"

export class PositionsPage extends BasePage{
    constructor(page){
        super(page)
        this.departmentMenu = this.page.getByText("Teams")
        this.locationsMenu = this.page.getByText("Locations")
        this.listItem = this.page.getByRole('listitem')
        this.tlv = this.listItem.filter({ hasText: 'Tel Aviv'})
        this.rNd = this.listItem.filter({ hasText: 'R&D'})
        this.careerItem = this.page.locator('.careers-loop-item')
        this.searchField = this.page.getByPlaceholder('Job title or professional field')
        
    }
    
      async selectPosition(position) {

        // Select position by text
        await this.careerItem.filter({ hasText: `${position}`}).click()

        // Check that the position page title is compatible 
        const applyNow = new ApplyPage(this.page)
        const title = await applyNow.jobTitle.textContent()
        expect(title).toEqual(position)
      }

      async setFiltersTLVRnD() {

        // Open locations menu and select Tel Aviv
        await this.setFilter(this.locationsMenu, this.tlv)
        
        // Open departmen menu and select R&D
        await this.setFilter(this.departmentMenu, this.rNd)
      }  

      async setFilter(dropdownSelector, filterType){

        // Open drop down menu
        await dropdownSelector.dblclick() //Sometimes a single click is not opening the manu(also manualy)

        // Select filter
        await filterType.click()

        // Check that the filter is selected
        await expect(filterType).toHaveClass('active')

        // Close drop down menu
        await this.searchField.click()

        // Check that counter is '1'
        const filterText = await dropdownSelector.textContent()
        expect(filterText).toContain('(1)')
      }
}

