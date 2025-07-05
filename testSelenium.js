const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');

(async function runTests() {
  let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.setChromeBinaryPath("/usr/bin/google-chrome");
  let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();


  try {
    console.log("1_ Chargement de la page");
    await driver.get("http://localhost:3000/index.html");
    await driver.sleep(2000);

    console.log("2_ Vérif du titre");
    await driver.wait(until.titleContains("To-Do List"), 3000);
    await driver.sleep(1000);

    console.log("3_ Ajout 1ère tâche 'Acheter du chocolat blanc' ");
    const newTaskInput = await driver.findElement(By.id("newTaskInput"));
    const addTaskButton = await driver.findElement(By.id("addTaskButton"));
    await newTaskInput.sendKeys("Acheter du chocolat blanc");
    await driver.sleep(1000);
    await addTaskButton.click();
    await driver.sleep(2000);

    console.log("4_ Ajout 2ème tâche 'Acheter du lait entier' ");
    await newTaskInput.clear();
    await newTaskInput.sendKeys("Acheter du lait entier");
    await driver.sleep(1000);
    await addTaskButton.click();
    await driver.sleep(2000);

  console.log("5_ Vérif que le nombre de tâche soit 2 ");
await driver.wait(async () => {
  const tasks = await driver.findElements(By.css("#taskList li"));
  return tasks.length === 2;
}, 3000);
let tasks = await driver.findElements(By.css("#taskList li"));
console.log(`=> Nombre de tâches présente: ${tasks.length}`);

console.log("6_ Cocher la 1ère tâche");
tasks = await driver.findElements(By.css("#taskList li"));
let firstCheckbox = await tasks[0].findElement(By.css('input[type="checkbox"]'));
await firstCheckbox.click();
await driver.sleep(2000);

    console.log("7_ Supprimer la tâche cochée");
    tasks = await driver.findElements(By.css("#taskList li")); 
    let deleteButton = await tasks[0].findElement(By.css("button"));
    await deleteButton.click();
    await driver.sleep(2000);


    console.log("8_ Vérif 1 seule tâche restante");
    await driver.wait(async () => {
      const remaining = await driver.findElements(By.css("#taskList li"));
      return remaining.length === 1;
    }, 3000);

    const remainingTaskText = await driver.findElement(By.css("#taskList li span")).getText();
    console.log(`=> ${remainingTaskText.length} tâche(s) restante(s) =>`, remainingTaskText);

    if (remainingTaskText.includes("Acheter du lait entier")) {
      console.log(" => Test est réussi");
    } else {
      console.warn("=> Tâche restante différente");
    }

    await driver.sleep(3000);
    console.log("Fin du test");
  } catch (error) {
    console.error("Erreur durant le test :", error);
  } finally {
    await driver.sleep(3000);
    await driver.quit();
  }
})();
