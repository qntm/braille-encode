import { encodechar, decodechar } from './lookup.js'

/**
 * Convert a single byte value to its corresponding Braille pattern character.
 * @param {number} byteValue - A number in range 0–255
 * @returns {string} The Braille pattern character for this byte
 */
const byteToBraille = byteValue => encodechar[byteValue]

/**
 * Convert a single Braille pattern character to its corresponding byte value.
 * @param {string} ch - A Braille pattern character
 * @returns {string} The byte value as a string (for lookup table index)
 * @throws {Error} If the character is not a valid Braille pattern
 */
const brailleToByte = ch => {
  if (!(ch in decodechar)) {
    throw Error(
      "Cannot decode character '" + ch.charCodeAt(0) + "', not Braille."
    )
  }
  return decodechar[ch]
}

/**
 * Encode binary data as a string of Braille pattern characters.
 * Each byte in the input maps to exactly one Braille character in the output,
 * making the encoding visually resemble the binary data — raised dots are 1-bits.
 *
 * @param {Uint8Array|Array<number>} uint8Array - Binary data to encode
 * @returns {string} Braille pattern string
 */
export const encode = uint8Array =>
  Array.from(uint8Array).map(byteToBraille).join('')

/**
 * Decode a Braille pattern string back to binary data.
 * Each Braille character in the input maps to exactly one byte in the output.
 *
 * @param {string} str - Braille pattern string to decode
 * @returns {Uint8Array} Decoded binary data
 * @throws {Error} If any character is not a valid Braille pattern
 */
export const decode = str =>
  Uint8Array.from(str.split('').map(brailleToByte))
