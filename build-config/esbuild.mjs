//
// Build with esbuild
//

import fs from 'fs'
import esbuild from 'esbuild'
import { moduleTypes, optionsFrom } from './common.mjs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

const { paths, outputs, addBanner, globalName } = optionsFrom(pkg)
import { match, against, when, otherwise, defined, anyOf } from 'match-iz'

function main() {
  Promise.all(outputs.map(buildModule))
}

function buildModule({ file, format, module, define }) {
  const buildOptions = {
    entryPoints: [paths.SRC],
    target: ['es6'],
    minify: true,
    write: false,

    format,
    ...match(format)(
      when('iife')({
        platform: 'browser',
        globalName: pkg.browserGlobalName ?? globalName
      }),
      otherwise({ platform: 'node' })
    ),

    bundle: true,
    define
  }

  return esbuild
    .build(buildOptions)
    .then(getConcatenatedEsbuildContent)
    .then($ => new TextDecoder().decode($))
    .then(addBanner)
    .then(writeTextFile(file))
    .then(writePackageJson({ module, format }))
}

const writePackageJson = against(
  when({ module: defined, format: anyOf(Object.keys(moduleTypes)) })(
    ({ module, format }) =>
      writeTextFile(module)(makePackageJsonForType(format))
  )
)

function makePackageJsonForType(type = 'esm') {
  return `{ "type": "${moduleTypes[type]}" }\n`
}

//
// Helpers
//

function getConcatenatedEsbuildContent(build) {
  return mergeTypedArrays(
    build.outputFiles.map(out => out.contents),
    Uint8Array
  )
}

// https://stackoverflow.com/a/56993335/127928
const mergeTypedArrays = (arrays, type = Uint8Array) => {
  const result = new type(arrays.reduce((acc, arr) => acc + arr.byteLength, 0))
  let offset = 0
  arrays.forEach(arr => {
    result.set(arr, offset)
    offset += arr.byteLength
  })
  return result
}

function writeTextFile(path) {
  return textContent =>
    Promise.resolve(path).then($ => fs.writeFileSync($, textContent))
}

//
// Entry point
//

main()
