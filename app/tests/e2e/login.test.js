import { Builder, Browser, By, until } from "selenium-webdriver";

const BASE_URL = "http://localhost:5173";

(async function testeLoginBasico() {
  // configurado para o Firefox
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {
    // informações base
    await driver.get(`${BASE_URL}/login`);

    const campoEmail = await driver.findElement(By.name("email"));
    const campoSenha = await driver.findElement(By.name("senha"));
    const botaoEntrar = await driver.findElement(By.id("form-submit-button"));

    // cenário 1
    console.log("Cenário 1: campos incorretos -> deve exibir mensagem de erro");

    // simula o preenchimento e envio do form
    await campoEmail.clear();
    await campoSenha.clear();

    await campoEmail.sendKeys("aaaa@teste.teste.teste");
    await campoSenha.sendKeys("123");

    await botaoEntrar.click();

    // realiza validação na mensagem de erro
    const mensagemErro = await driver.wait(
      until.elementLocated(By.id("form-error-message")),
      3000
    );

    const textoErro = await mensagemErro.getText();

    if (textoErro.includes("Erro: Dados incorretos!")) {
      console.log("Mensagem de erro exibida corretamente!");
    } else {
      throw new Error(`Mensagem inesperada: ${textoErro}`);
    }

    // cenário 2
    console.log("Cenário 2: campos corretos -> deve navegar para o dashboard");

    // simula o preenchimento e envio do form
    await campoEmail.clear();
    await campoSenha.clear();

    await campoEmail.sendKeys("admin@ifrs.edu.br");
    await campoSenha.sendKeys("123456");

    await botaoEntrar.click();

    // após ter sucesso, o sistema mostra um alert, então valida o alert também
    let alert = await driver.wait(until.alertIsPresent(), 5000);

    let alertText = await alert.getText();

    if (alertText.includes("Login efetuado com sucesso!")) {
      console.log("Alert de login exibido corretamente!");
    } else {
      throw new Error(`Mensagem no alert inesperada: ${alertText}`);
    }

    await alert.accept();

    console.log("Login realizado com sucesso!");

    // verifica se o navegador realmente redireciona para o dashboard
    await driver.wait(until.urlContains("/dashboard"), 5000);

    const titulo = await driver.wait(
      until.elementLocated(By.id("dashboard-title")),
      5000
    );

    const textoTitulo = await titulo.getText();

    if (textoTitulo.includes("Olá, ")) {
      console.log("Dashboard exibido com sucesso!");
    } else {
      throw new Error("Título do dashboard incorreto");
    }

    // finaliza o teste
    console.log("Teste finalizado sem erros!");
  } catch (erro) {
    console.error("Falha durante o teste:", erro.message);
  } finally {
    await driver.quit();
  }
})();
