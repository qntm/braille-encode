import { BRAILLE_CHAR_TABLE, BRAILLE_BYTE_TABLE } from './lookup.js'

/**
 * Encode a Uint8Array as a Braille Unicode string.
 *
 * Each byte is mapped to a single Braille character using the
 * non-standard dot-to-bit mapping defined in lookup.js.
 * The result is a string where each character represents one byte.
 *
 * @param {Uint8Array} uint8Array - The binary data to encode
 * @returns {string} Braille Unicode string
 */
export const encode = uint8Array => {
  const chars = Array.from(uint8Array, byte => BRAILLE_CHAR_TABLE[byte])
  return chars.join('')
}

/**
 * Decode a Braille Unicode string back into a Uint8Array.
 *
 * Each Braille character is mapped back to its corresponding byte value.
 * Throws an error if any character is not a valid Braille character
 * from the encoding table.
 *
 * @param {string} str - The Braille string to decode
 * @returns {Uint8Array} Decoded binary data
 * @throws {Error} If a character is not a valid Braille encoding character
 */
export const decode = str => {
  const bytes = str.split('').map(ch => {
    if (!(ch in BRAILLE_BYTE_TABLE)) {
      throw Error("Cannot decode character '" + ch.charCodeAt(0) + "', not Braille.")
    }
    return BRAILLE_BYTE_TABLE[ch]
  })
  return Uint8Array.from(bytes)
}
