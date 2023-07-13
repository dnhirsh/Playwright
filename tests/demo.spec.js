// @ts-check
const { test, expect } = require('@playwright/test')
const { HomePage } = require('../PageObjects/HomePage')
const { PositionsPage } = require('../PageObjects/PositionsPage')
const { ApplyPage } = require('../PageObjects/ApplyPage')

test.only('Apply for a job', async ({ page }) => {
  test.setTimeout(60000)
  const homePage = new HomePage(page)
  const positionsPage = new PositionsPage(page)
  const applyNow = new ApplyPage(page)
  const positionDescription = 'Automation Infrastructure Engineer'

  // Open home page
  await homePage.openIsraelCareers()

  // Filter for Tel-Aviv and R&D
  await positionsPage.setFiltersTLVRnD()

  // Select "Automation Engineer" position
  await positionsPage.selectPosition(positionDescription)

  // Click on "Apply Now" button
  await applyNow.clickApplyNow()

  // Fill form fields with invalid values
  await applyNow.fillAndSubmitFormWIthInvalidValues()
});

