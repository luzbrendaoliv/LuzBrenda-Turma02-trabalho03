import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import DemoBlazePage from '../support/pages/DemoBlazePage';

const CONFIG_PATH = join(__dirname, '../support/fixtures/config.yml');

const configData = (() => {
  if (process.env.QA) {
    return TheConfig.fromFile(CONFIG_PATH).andPath('environments.qa').retrieveData();
  } else if (process.env.PRD) {
    return TheConfig.fromFile(CONFIG_PATH).andPath('environments.prod').retrieveData();
  } else {
    return TheConfig.fromFile(CONFIG_PATH).andPath('environments.dev').retrieveData();
  }
})();

const { baseUrl, usuario, senha, timeout } = configData;

test.describe('Pesquisar Produto no DemoBlaze', () => {
  let demoBlazePage: DemoBlazePage;

  test.beforeEach(async ({ page }) => {
    demoBlazePage = new DemoBlazePage(page);
    await page.goto(baseUrl, { timeout });
  });

  test('Pesquisar um produto no DemoBlaze', async () => {
    const produto = 'Samsung Galaxy S6';  // Exemplo de produto
    await demoBlazePage.pesquisarProduto(produto);
    //await demoBlazePage.validarResultadoProduto();
  });
});
