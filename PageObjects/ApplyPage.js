import { expect } from "@playwright/test"
import { BasePage } from "./BasePage"

export class ApplyPage extends BasePage{
    constructor(page){
        super(page)
        this.applyNowBtn = this.page.getByText('Apply Now')
        this.commeetFrame = this.page.frameLocator('iframe[name*="comeet-applyform-"]')
        this.firstName = this.commeetFrame.getByLabel('First name')
        this.lastName = this.commeetFrame.getByLabel('Last name')
        this.email = this.commeetFrame.getByLabel('Email')
        this.phone = this.commeetFrame.getByLabel('Phone')
        this.note = this.commeetFrame.getByLabel('Personal note')
        this.resume = this.commeetFrame.getByLabel('Resume')
        this.linkedInField = this.commeetFrame.getByLabel('LinkedIn Profile URL')
        this.submiyBtn = this.commeetFrame.locator('.submit-button button')
        this.jobTitle = this.page.locator('.main-title')
        this.lnameError = this.commeetFrame.getByText('Last name is required')
        this.fnameError = this.commeetFrame.getByText('First name is required')
        this.emailError = this.commeetFrame.getByText('Invalid email address')
        this.phoneError = this.commeetFrame.getByText('Please enter a valid phone number (7 digits minimum)')
        this.resumeError = this.commeetFrame.getByText('This file format is not allowed. Please use PDF, DOC, DOCX or RTF')
        this.generalError = this.commeetFrame.getByText('Please make sure to complete the required details and to use a valid format')
    }
    

    
    async clickApplyNow() {

        // Click apply for position after page load
        await this.page.waitForLoadState('load')
        await expect(this.applyNowBtn).toBeVisible()
        await this.applyNowBtn.click()
      }
    

    async fillFormWIthInvalidValues() {
        const filePath = require('path').join(require('path').dirname(__filename), '..', 'Resources', 'Resume.txt')
        
        // Fill the form 
        await this.email.fill('myEmail!example.com')//Invalid value
        await this.phone.fill('123456')//Invalid value
        await this.note.fill('Here is my personal note')
        await this.linkedInField.fill('https://www.linkedin.com/in/MyProfile/')
        await this.resume.setInputFiles(filePath)//Invalid format

      }

      async submitForm() {

        // Click submit
        await this.submiyBtn.click()
      }

      async fillAndSubmitFormWIthInvalidValues() {
        
        // Submit form with invalid values
        await this.fillFormWIthInvalidValues()
        await this.submitForm()

        // Check expected errors in invalid fields
        await expect(this.fnameError).toBeVisible()
        await expect(this.lnameError).toBeVisible()
        await expect(this.email).toBeVisible()
        await expect(this.phoneError).toBeVisible()
        await expect(this.resumeError).toBeVisible()
        await expect(this.generalError).toBeVisible()
      }
    }