/* eslint-env mocha */

import assert from 'assert'
import fs from 'fs'
import glob from 'glob'

import { encode, decode } from '../src/index.js'

describe('braille-encode', () => {
  it('fails', () => {
    assert.throws(() => decode('abc'), Error('Cannot decode character \'97\', not Braille.'))
  })

  describe('works', () => {
    const files = glob.sync('./test/pairs/**/*.bin')
    files.forEach((fileName, i) => {
      const caseName = fileName.substring(0, fileName.length - '.bin'.length)
      it(caseName, () => {
        const uint8Array = Uint8Array.from(fs.readFileSync(caseName + '.bin'))
        const text = fs.readFileSync(caseName + '.txt', 'utf8')
        assert.deepStrictEqual(decode(text), uint8Array)
        assert.deepStrictEqual(encode(uint8Array), text)
      })
    })
  })
})
