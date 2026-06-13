/**
 * braille-encode — Represent binary data as Braille Unicode characters.
 *
 * Each byte value (0-255) maps to a unique Braille pattern character (U+2800–U+28FF).
 * The dot pattern in each Braille character visually corresponds to the bit pattern
 * of the byte it represents, making the encoding intuitively readable.
 *
 * @module braille-encode
 */

// ─── Lookup Table ──────────────────────────────────────────────────────────────
// 256 Braille characters indexed by byte value.
// Organized in rows of 16 for readability — each row corresponds to the high nibble,
// each column within a row to the low nibble of the byte.
// Row 0x0_: base patterns (dots 1-4 only)
// Row 0x1_: same patterns + dot 7
// Row 0x2_: base patterns + dot 5
// Row 0x3_: base patterns + dots 5 + 7
// ...and so on following the Unicode Braille pattern encoding.

const BRAILLE_CHARS = [
  // 0x0_  0x1_  0x2_  0x3_  0x4_  0x5_  0x6_  0x7_
  // 0x8_  0x9_  0xA_  0xB_  0xC_  0xD_  0xE_  0xF_
  '⠀⢀⠠⢠⠐⢐⠰⢰⠈⢈⠨⢨⠘⢘⠸⢸', // 0x0_
  '⡀⣀⡠⣠⡐⣐⡰⣰⡈⣈⡨⣨⡘⣘⡸⣸', // 0x1_
  '⠄⢄⠤⢤⠔⢔⠴⢴⠌⢌⠬⢬⠜⢜⠼⢼', // 0x2_
  '⡄⣄⡤⣤⡔⣔⡴⣴⡌⣌⡬⣬⡜⣜⡼⣼', // 0x3_
  '⠂⢂⠢⢢⠒⢒⠲⢲⠊⢊⠪⢪⠚⢚⠺⢺', // 0x4_
  '⡂⣂⡢⣢⡒⣒⡲⣲⡊⣊⡪⣪⡚⣚⡺⣺', // 0x5_
  '⠆⢆⠦⢦⠖⢖⠶⢶⠎⢎⠮⢮⠞⢞⠾⢾', // 0x6_
  '⡆⣆⡦⣦⡖⣖⡶⣶⡎⣎⡮⣮⡞⣞⡾⣾', // 0x7_
  '⠁⢁⠡⢡⠑⢑⠱⢱⠉⢉⠩⢩⠙⢙⠹⢹', // 0x8_
  '⡁⣁⡡⣡⡑⣑⡱⣱⡉⣉⡩⣩⡙⣙⡹⣹', // 0x9_
  '⠅⢅⠥⢥⠕⢕⠵⢵⠍⢍⠭⢭⠝⢝⠽⢽', // 0xA_
  '⡅⣅⡥⣥⡕⣕⡵⣵⡍⣍⡭⣭⡝⣝⡽⣽', // 0xB_
  '⠃⢃⠣⢣⠓⢓⠳⢳⠋⢋⠫⢫⠛⢛⠻⢻', // 0xC_
  '⡃⣃⡣⣣⡓⣓⡳⣳⡋⣋⡫⣫⡛⣛⡻⣻', // 0xD_
  '⠇⢇⠧⢧⠗⢗⠷⢷⠏⢏⠯⢯⠟⢟⠿⢿', // 0xE_
  '⡇⣇⡧⣧⡗⣗⡷⣷⡏⣏⡯⣯⡟⣟⡿⣿'  // 0xF_
].join('')

const encodeLookup = BRAILLE_CHARS.split('')

// ─── Reverse Lookup ────────────────────────────────────────────────────────────
// Maps each Braille character back to its byte value for decoding.

const decodeLookup = Object.fromEntries(
  Object.entries(encodeLookup).map(([i, ch]) => [ch, Number(i)])
)

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Encode a Uint8Array as a string of Braille Unicode characters.
 * Each byte is mapped to its corresponding Braille pattern (U+2800 + byte).
 *
 * @param {Uint8Array} uint8Array - The binary data to encode
 * @returns {string} A string of Braille characters representing the binary data
 *
 * @example
 * encode(Uint8Array.from([72, 101, 108, 108, 111])) // → "⠊⢖⠞⠞⢾"
 * encode(Uint8Array.from([0]))                       // → "⠀"
 * encode(Uint8Array.from([255]))                     // → "⣿"
 */
export const encode = uint8Array => {
  const chars = []
  for (let i = 0; i < uint8Array.length; i++) {
    chars.push(encodeLookup[uint8Array[i]])
  }
  return chars.join('')
}

/**
 * Decode a string of Braille Unicode characters back into a Uint8Array.
 * Each Braille character is mapped back to its corresponding byte value.
 *
 * @param {string} str - A string of Braille characters to decode
 * @returns {Uint8Array} The decoded binary data
 * @throws {Error} If the string contains a non-Braille character
 *
 * @example
 * decode("⠊⢖⠞⠞⢾") // → Uint8Array [72, 101, 108, 108, 111]
 * decode("a")         // → throws Error: Cannot decode character 'a' (U+0061), not Braille.
 */
export const decode = str => {
  const bytes = new Uint8Array(str.length)
  for (let i = 0; i < str.length; i++) {
    const ch = str[i]
    if (!(ch in decodeLookup)) {
      const codePoint = ch.codePointAt(0)
      const hex = 'U+' + codePoint.toString(16).toUpperCase().padStart(4, '0')
      throw Error(`Cannot decode character '${ch}' (${hex}), not Braille.`)
    }
    bytes[i] = decodeLookup[ch]
  }
  return bytes
}
