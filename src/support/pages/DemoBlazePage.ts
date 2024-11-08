import { Page } from '@playwright/test';
import demoBlazeElements from '../elements/demoBlazeElements';

class DemoBlazePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(usuario: string, senha: string) {
    await this.page.click(demoBlazeElements.loginButton);
    await this.page.fill(demoBlazeElements.usuarioInput, usuario);
    await this.page.fill(demoBlazeElements.senhaInput, senha);
    await this.page.click(demoBlazeElements.loginSubmit);
  }

  async pesquisarProduto(produto: string) {
    await this.page.click('a[href="prod.html?idp_=6"]');
    //await this.page.press(demoBlazeElements.pesquisaInput, 'Enter');
  }

  async adicionarProdutoCarrinho() {
    await this.page.waitForSelector('a[onclick="addToCart(6)"]');
    await this.page.click(demoBlazeElements.botaoAdicionarCarrinho);
  }

  async validarProdutoNoCarrinho() {
    await this.page.click(demoBlazeElements.carrinhoIcon);
    await this.page.waitForSelector(demoBlazeElements.produtoNoCarrinho);
  }

  async finalizarCompra() {

    await this.page.click(demoBlazeElements.placeOrderButton); 

    await this.page.fill(demoBlazeElements.nomeInput, 'Teste');  
    await this.page.fill(demoBlazeElements.paisInput, 'Brasil');  
    await this.page.fill(demoBlazeElements.cidadeInput, 'Cidade Teste'); 
    await this.page.fill(demoBlazeElements.cartaoCreditoInput, '1234567890123456');  
    await this.page.fill(demoBlazeElements.mesInput, '12');  
    await this.page.fill(demoBlazeElements.anoInput, '2025');

    await this.page.click(demoBlazeElements.purchaseButton);  
  }

  async validarCompraConcluida() {
    await this.page.waitForSelector(demoBlazeElements.compraConcluidaMensagem);
  }
}

export default DemoBlazePage;
