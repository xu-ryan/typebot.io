import test, { expect } from '@playwright/test'
import {
  createTypebots,
  importTypebotInDatabase,
} from '@typebot.io/lib/playwright/databaseActions'
import { parseDefaultGroupWithBlock } from '@typebot.io/lib/playwright/databaseHelpers'
import { createId } from '@paralleldrive/cuid2'
import { getTestAsset } from '@/test/utils/playwright'
import { InputBlockType } from '@typebot.io/schemas/features/blocks/inputs/constants'

test.describe.parallel('Buttons input block', () => {
  test('can edit button items', async ({ page }) => {
    const typebotId = createId()
    await createTypebots([
      {
        id: typebotId,
        ...parseDefaultGroupWithBlock({
          type: InputBlockType.CHOICE,
          items: [
            {
              id: 'choice1',
            },
          ],
        }),
      },
    ])

    await page.goto(`/typebots/${typebotId}/edit`)
    await page.fill('input[value="Click to edit"]', 'Item 1')
    await page.press('input[value="Item 1"]', 'Enter')
    await page.fill('input[value="Click to edit"]', 'Item 2')
    await page.press('input[value="Item 2"]', 'Enter')
    await page.fill('input[value="Click to edit"]', 'Item 3')
    await page.press('input[value="Item 3"]', 'Enter')
    await page.press('input[value="Click to edit"]', 'Escape')
    await page.click('text=Item 2', { button: 'right' })
    await page.click('text=Delete')
    await expect(page.locator('text=Item 2')).toBeHidden()

    await page.click('text=Test')
    await page.getByRole('button', { name: 'Item 3' }).click()
    await expect(page.getByRole('button', { name: 'Item 3' })).toBeHidden()
    await expect(page.getByTestId('guest-bubble')).toHaveText('Item 3')
    await page.click('button[aria-label="Close"]')

    await page.getByTestId('block block2').click({ position: { x: 0, y: 0 } })
    await page.click('text=Multiple choice?')
    await page.getByLabel('Button label:').fill('Go')
    await page.getByPlaceholder('Select a variable').nth(1).click()
    await page.getByText('var1').click()
    await expect(page.getByText('Setvar1')).toBeVisible()
    await page.getByTestId('block block2').click({ position: { x: 0, y: 0 } })

    await page.locator('text=Item 1').hover()
    await page.waitForTimeout(1000)
    await page.click('[aria-label="Add item"]')
    await page.fill('input[value="Click to edit"]', 'Item 2')
    await page.press('input[value="Item 2"]', 'Enter')

    await page.click('text=Test')

    await page.getByRole('checkbox', { name: 'Item 3' }).click()
    await page.getByRole('checkbox', { name: 'Item 1' }).click()
    await page.locator('text=Go').click()

    await expect(page.locator('text="Item 3, Item 1"')).toBeVisible()
  })
})

test('Variable buttons should work', async ({ page }) => {
  const typebotId = createId()
  await importTypebotInDatabase(
    getTestAsset('typebots/inputs/variableButton.json'),
    {
      id: typebotId,
    }
  )

  await page.goto(`/typebots/${typebotId}/edit`)
  await page.click('text=Test')
  await page.getByRole('button', { name: 'Variable item' }).click()
  await expect(page.getByTestId('guest-bubble')).toHaveText('Variable item')
  await expect(page.locator('text=Ok great!')).toBeVisible()
  await page.click('text="Item 1"')
  await page.fill('input[value="Item 1"]', '{{Item 2}}')
  await page.getByTestId('block block1').click({ position: { x: 0, y: 0 } })
  await page.click('text=Multiple choice?')
  await page.click('text="Restart"')
  await page
    .locator('typebot-standard')
    .getByRole('checkbox', { name: 'Variable item' })
    .first()
    .click()
  await page
    .locator('typebot-standard')
    .getByRole('checkbox', { name: 'Variable item' })
    .nth(1)
    .click()
  await page.locator('text="Send"').click()
  await expect(
    page.locator('text="Variable item, Variable item"')
  ).toBeVisible()
})
