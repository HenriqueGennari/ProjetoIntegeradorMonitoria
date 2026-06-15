
import { describe, it, before, after } from "mocha";
import assert from "assert";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import path from "path";

describe("Login E2E", function () {
  let driver: any;

  before(async function () {
    // Cria um objeto de opções do Chrome.
    const options = new chrome.Options();

    // Descomente a linha abaixo para rodar sem abrir a janela do navegador.
    // options.addArguments("--headless=new");

    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--window-size=1920,1080");

    // Monta o caminho absoluto para o chromedriver instalado pelo npm.
    // path.resolve junta o diretório atual com o caminho relativo do executável.
    const chromedriverPath = path.resolve(
      process.cwd(),
      "node_modules",
      "chromedriver",
      "lib",
      "chromedriver",
      "chromedriver.exe"
    );

    // ServiceBuilder diz explicitamente ao Selenium qual executável usar.
    // Isso evita que o Selenium fique procurando ou baixando outra versão.
    const service = new chrome.ServiceBuilder(chromedriverPath);

    // Builder monta o driver.
    // forBrowser("chrome") -> diz que vamos usar o Chrome.
    // setChromeOptions(options) -> aplica as configurações definidas acima.
    // setChromeService(service) -> usa o chromedriver específico que instalamos.
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .setChromeService(service)
      .build();
  });

  after(async function () {
    await driver.quit();
  });

  // Caso de teste 1: login com credenciais válidas.
  it("deve fazer login com sucesso como aluno", async function () {

    await driver.get("http://localhost:3000/pages/login.html");

    await driver.executeScript("localStorage.clear();");
    await driver.manage().deleteAllCookies();

    await driver
      .findElement(By.css("input[name='email']"))
      .sendKeys("joao@email.com");

    await driver.findElement(By.css("#inputSenhaLogin")).sendKeys("123456");

    await driver.findElement(By.css("#btnLogin")).click();

    // O Selenium fica verificando a URL até ela conter esse texto ou estourar o timeout (10s).
    await driver.wait(until.urlContains("/pages/home.html"), 10000);

    // 6. Executa JavaScript dentro do navegador para ler o localStorage.
    // executeScript("return localStorage.getItem('token')") -> roda JS na página e retorna o valor.
    const token = await driver.executeScript(
      "return localStorage.getItem('token');"
    );

    // 7. Verifica se o token existe.
    // assert.ok(token, "...") -> falha o teste se 'token' for null/undefined/vazio.
    assert.ok(token, "Token não foi salvo no localStorage");
  });

  // Caso de teste 2: login com senha incorreta.
  it("deve exibir mensagem de erro para senha incorreta", async function () {
    await driver.get("http://localhost:3000/pages/login.html");

    await driver.executeScript("localStorage.clear();");
    await driver.manage().deleteAllCookies();

    await driver
      .findElement(By.css("input[name='email']"))
      .sendKeys("joao@email.com");
    await driver.findElement(By.css("#inputSenhaLogin")).sendKeys("senhaErrada");
    await driver.findElement(By.css("#btnLogin")).click();

    // Espera o elemento de mensagem existir no DOM.
    const mensagem = await driver.wait(
      until.elementLocated(By.css("#mensagem")),
      10000
    );

    // Espera o texto do elemento ser preenchido (não ficar vazio).
    await driver.wait(async () => {
      const texto = await mensagem.getText();
      return texto.length > 0;
    }, 10000);

    // getText() retorna o texto visível do elemento.
    const texto = await mensagem.getText();

    // Verifica se o texto é exatamente o esperado.
    assert.strictEqual(texto, "Email ou senha incorretos!");
  });

  // Caso de teste 3: login com campos vazios.
  it("deve exibir mensagem de erro para campos vazios", async function () {
    await driver.get("http://localhost:3000/pages/login.html");

    await driver.executeScript("localStorage.clear();");
    await driver.manage().deleteAllCookies();

    await driver.findElement(By.css("input[name='email']")).sendKeys("");
    await driver.findElement(By.css("#inputSenhaLogin")).sendKeys("");
    await driver.findElement(By.css("#btnLogin")).click();

    const mensagem = await driver.wait(
      until.elementLocated(By.css("#mensagem")),
      10000
    );

    await driver.wait(async () => {
      const texto = await mensagem.getText();
      return texto.length > 0;
    }, 10000);

    const texto = await mensagem.getText();
    assert.strictEqual(texto, "Preencha todos os campos!");
  });
});
