/* eslint-env mocha */

import assert from 'node:assert/strict'
import fs from 'node:fs'

import { globSync } from 'glob'

import { encode, decode } from '../src/index.js'

describe('braille-encode', () => {
  it('fails', () => {
    assert.throws(() => decode('abc'), Error('Cannot decode character \'97\', not Braille.'))
  })

  describe('works', () => {
    const files = globSync('./test/pairs/**/*.bin')
    files.forEach((fileName, i) => {
      const caseName = fileName.substring(0, fileName.length - '.bin'.length)
      it(caseName, () => {
        const uint8Array = Uint8Array.from(fs.readFileSync(caseName + '.bin'))
        const text = fs.readFileSync(caseName + '.txt', 'utf8')
        assert.deepEqual(decode(text), uint8Array)
        assert.deepEqual(encode(uint8Array), text)
      })
    })
  })
})
