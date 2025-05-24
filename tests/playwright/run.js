const path = require("path");
const serve = require("koa-static");
const Koa = require("koa");

const { chromium } = require("playwright");
const { viddyIn, viddyWellIn } = require("viddy/playwright");
const assert = require("assert");

const headless = true;
const devtools = true;
const SERVER_PORT = 4763;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function asyncPipe(x, ...promiseMakerFns) {
  return new Promise((resolve, reject) => {
    promiseMakerFns
      .reduce(SequenceReducer(reject), Promise.resolve(x))
      .then(resolve, reject);
  });

  function SequenceReducer(reject) {
    return (lastPromise, createNextPromise) =>
      lastPromise.then(createNextPromise, reject);
  }
}

async function main() {
  // Server
  const app = new Koa();
  app.use(serve(path.join(__dirname, "../www")));
  const server = app.listen(SERVER_PORT);
  const browser = await chromium.launch({ headless, devtools });

  // Tests
  const page = await browser.newPage();
  await page.goto(`http://localhost:${SERVER_PORT}/index.html`);

  const viddy = await viddyIn(page);
  const viddyWell = await viddyWellIn(page);

  await viddy
    .innerText({ selector: "td", above: "middle", leftOf: "middle" })
    .then(text => assert.equal(text, "top-left"));

  await viddy
    .innerText({ selector: "td", above: "middle", rightOf: "left" })
    .then(text => assert.equal(text, "top"));

  await viddy
    .innerText({ selector: "td", above: "middle", rightOf: "middle" })
    .then(text => assert.equal(text, "top-right"));

  // ...

  await viddy
    .innerText({ selector: "td", leftOf: "middle", below: "top" })
    .then(text => assert.equal(text, "left"));

  await viddy
    .innerText({ selector: "td", rightOf: "left", below: "top" })
    .then(text => assert.equal(text, "middle"));

  await viddy
    .innerText({ selector: "td", near: "middle", rightOf: "middle" })
    .then(text => assert.equal(text, "right"));

  // ...

  await viddy
    .innerText({ selector: "td", below: "middle", leftOf: "bottom" })
    .then(text => assert.equal(text, "bottom-left"));

  await viddy
    .innerText({ selector: "td", near: "middle", below: "middle" })
    .then(text => assert.equal(text, "bottom"));

  await viddy
    .innerText({ selector: "td", near: "right", below: "right" })
    .then(text => assert.equal(text, "bottom-right"));

  // ...

  await viddy.hasContent("hello").then(yep => {
    assert.equal(yep, true);
  });

  await viddy.innerText("hello").then(greeting => {
    assert.equal(greeting, "Hello, world!");
  });

  await viddy.innerText("data").then(grabbed => {
    assert.equal(grabbed, "Waiting on some data to load...");
  });

  await viddy.valueOf("Name:").then(val => {
    assert.equal(val, "Ignatius Cheese");
  });

  await viddy.valueOf("feedback").then(grabbedValue => {
    assert.equal(grabbedValue, "Type somethin', will ya!");
  });

  const noCheckbox = { pattern: "no:", near: "yes:" };
  await viddy.valueOf(noCheckbox).then(grabbedValue => {
    assert.equal(grabbedValue, "");
  });
  await Promise.all([
    viddy.waitForValue("no", noCheckbox).then(sel => {
      assert.equal(sel, "#yesno_no");
    }),

    viddy.for(noCheckbox).then(sel => {
      assert.equal(sel, "p:nth-child(4) > label");
      return page.click(sel);
    }),
  ]);

  await viddy.valueOf(noCheckbox).then(grabbedValue => {
    assert.equal(grabbedValue, "no");
  });

  await viddy.valueOf("Country:").then(grabbedValue => {
    assert.equal(grabbedValue, "");
  });

  await viddyWell.when("Country:").then(({ exists }) => {
    let result = exists(sel => `found: ${sel[0]}`)
      .absent(() => "sorry, not found")
      .valueOf();

    assert.equal(result, "found: form:nth-child(5) label");
  });

  assert.equal(
    (await viddy.when("Country_:"))
      .exists(sel => `found: ${sel}`)
      .absent(() => "sorry, not found")
      .valueOf(),
    "sorry, not found",
  );

  await Promise.all([
    viddy.waitForValue("uk", "Country:").then(css => {
      assert.equal(css, "#country");
    }),

    viddy.for(/click here/i, { below: "there" }).then(sel => {
      assert.equal(sel, `button:nth-child(9)`);
      return page.click(sel);
    }),
  ]);

  // viddy.waitFor.timesOutAfterMs(500)

  await viddy
    .waitForCta("click here", { below: /again/i })
    .then(sel => page.click(sel).then(() => sel))
    .then(sel => () => console.log("clicked: ", sel));

  await viddy.innerText("data").then(grabbed => {
    assert(/Now the data is loaded! :: \d+\.\d+ :: Click here/.test(grabbed));
  });

  await viddy.matchText(/\d+\.\d+/, { near: "again" }).then(grabbedValue => {
    assert(/\d+\.\d+/.test(grabbedValue));
  });

  await viddy.matchText("again").then(grabbedValue => {
    assert.equal(grabbedValue, "Hello, again!");
  });

  // ...

  const clickFirstButton = () =>
    viddy
      .waitForCta("click here", { above: /country/i })
      .then(sel => page.click(sel));

  const clickAndWait = ms => [() => clickFirstButton(), () => delay(ms)];

  await Promise.all([
    viddy.waitForDomToIdle(),
    asyncPipe(
      null,
      ...clickAndWait(400),
      ...clickAndWait(400),
      ...clickAndWait(400),
    ),
  ]);

  // ...

  await viddy.forCta("click here", { below: "boggo" }).then(
    () => {
      throw new Error(
        '"boggo" does not exist, so we shouldn\'t match anything "below" it',
      );
    },
    err => {
      assert.equal(
        true,
        err.message.includes(
          "ViddyError: could not resolve query to any elements",
        ),
      );
    },
  );

  // ...

  await browser.close();
  server.close();
}

main();
