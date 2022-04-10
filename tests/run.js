const path = require('path')
const serve = require('koa-static')
const Koa = require('koa')

const puppeteer = require('puppeteer')
const { viddyIn } = require('viddy/puppeteer')
const assert = require('assert')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function asyncPipe(x, ...promiseMakerFns) {
  return new Promise((resolve, reject) => {
    promiseMakerFns
      .reduce(SequenceReducer(reject), Promise.resolve(x))
      .then(resolve, reject)
  })

  function SequenceReducer(reject) {
    return (lastPromise, createNextPromise) =>
      lastPromise.then(createNextPromise, reject)
  }
}

async function main() {
  // Server
  const app = new Koa()
  app.use(serve(path.join(__dirname, './www')))
  const server = app.listen(4000)
  const browser = await puppeteer.launch({ headless: true, devtools: true })
  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason)
    browser.close()
    server.close()
  })

  // Tests
  const page = await browser.newPage()
  await page.goto('http://localhost:4000/index.html')
  const viddy = await viddyIn(page)

  await viddy
    .innerText({ selector: 'td', above: 'middle', leftOf: 'middle' })
    .then(text => assert.equal(text, 'top-left'))

  await viddy
    .innerText({ selector: 'td', above: 'middle', rightOf: 'left' })
    .then(text => assert.equal(text, 'top'))

  await viddy
    .innerText({ selector: 'td', above: 'middle', rightOf: 'middle' })
    .then(text => assert.equal(text, 'top-right'))

  // ...

  await viddy
    .innerText({ selector: 'td', leftOf: 'middle', below: 'top' })
    .then(text => assert.equal(text, 'left'))

  await viddy
    .innerText({ selector: 'td', rightOf: 'left', below: 'top' })
    .then(text => assert.equal(text, 'middle'))

  await viddy
    .innerText({ selector: 'td', near: 'middle', rightOf: 'middle' })
    .then(text => assert.equal(text, 'right'))

  // ...

  await viddy
    .innerText({ selector: 'td', below: 'middle', leftOf: 'bottom' })
    .then(text => assert.equal(text, 'bottom-left'))

  await viddy
    .innerText({ selector: 'td', near: 'middle', below: 'middle' })
    .then(text => assert.equal(text, 'bottom'))

  await viddy
    .innerText({ selector: 'td', near: 'right', below: 'right' })
    .then(text => assert.equal(text, 'bottom-right'))

  // ...

  await viddy.hasContent('hello').then(yep => {
    assert.equal(yep, true)
  })

  await viddy.innerText('hello').then(greeting => {
    assert.equal(greeting, 'Hello, world!')
  })

  await viddy.innerText('data').then(grabbed => {
    assert.equal(grabbed, 'Waiting on some data to load...')
  })

  await viddy.valueOf('Name:').then(val => {
    assert.equal(val, 'Ignatius Cheese')
  })

  await viddy.valueOf('feedback').then(grabbedValue => {
    assert.equal(grabbedValue, "Type somethin', will ya!")
  })

  const noCheckbox = { pattern: 'no:', near: 'yes:' }
  await viddy.valueOf(noCheckbox).then(grabbedValue => {
    assert.equal(grabbedValue, '')
  })
  await Promise.all([
    viddy.waitForValue('no', noCheckbox).then(sel => {
      assert.equal(sel, 'input#yesno_no')
    }),

    viddy.selectorOf(noCheckbox).then(sel => {
      assert.equal(
        sel,
        'html > body > form:nth-of-type(2) > p:nth-of-type(4) > label'
      )
      return page.click(sel)
    })
  ])

  await viddy.valueOf(noCheckbox).then(grabbedValue => {
    assert.equal(grabbedValue, 'no')
  })

  await viddy.valueOf('Country:').then(grabbedValue => {
    assert.equal(grabbedValue, '')
  })

  await Promise.all([
    viddy.waitForValue('uk', 'Country:').then(css => {
      assert.equal(css, 'select#country')
    }),

    viddy.selectorOf(/click here/i, { below: 'there' }).then(sel => {
      assert.equal(sel, 'html > body > button:nth-of-type(2)')
      return page.click(sel)
    })
  ])

  // viddy.waitFor.timesOutAfterMs(500)

  await viddy
    .waitForCta('click here', { below: /again/i })
    .then(sel => page.click(sel).then(() => sel))
    .then(sel => () => console.log('clicked: ', sel))

  await viddy.innerText('data').then(grabbed => {
    assert(/Now the data is loaded! :: \d+\.\d+ :: Click here/.test(grabbed))
  })

  await viddy.matchText(/\d+\.\d+/, { near: 'again' }).then(grabbedValue => {
    assert(/\d+\.\d+/.test(grabbedValue))
  })

  await viddy.matchText('again').then(grabbedValue => {
    assert.equal(grabbedValue, 'Hello, again!')
  })

  // ...

  const clickFirstButton = () =>
    viddy
      .waitForCta('click here', { above: /country/i })
      .then(sel => page.click(sel))

  const clickAndWait = ms => [() => clickFirstButton(), () => delay(ms)]

  await Promise.all([
    viddy.waitForIdle(),
    asyncPipe(
      null,
      ...clickAndWait(400),
      ...clickAndWait(400),
      ...clickAndWait(400)
    )
  ])

  await browser.close()
  server.close()
}

main()
