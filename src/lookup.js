/**
 * Braille encoding lookup tables.
 *
 * Each byte value (0-255) maps to a unique Braille Unicode character.
 * The dot numbering follows a non-standard scheme where each of the 8 dots
 * in a Braille cell corresponds to one bit in the byte:
 *
 *   bit 0 → dot 1,  bit 1 → dot 2,  bit 2 → dot 3,  bit 3 → dot 4,
 *   bit 4 → dot 5,  bit 5 → dot 6,  bit 6 → dot 7,  bit 7 → dot 8
 *
 * This is NOT standard Braille — it repurposes the Unicode block for
 * binary visualization. As the author notes: "of no use to Braille users."
 */

const BRAILLE_CHAR_TABLE = (
  '⠀⢀⠠⢠⠐⢐⠰⢰⠈⢈⠨⢨⠘⢘⠸⢸' +
  '⡀⣀⡠⣠⡐⣐⡰⣰⡈⣈⡨⣨⡘⣘⡸⣸' +
  '⠄⢄⠤⢤⠔⢔⠴⢴⠌⢌⠬⢬⠜⢜⠼⢼' +
  '⡄⣄⡤⣤⡔⣔⡴⣴⡌⣌⡬⣬⡜⣜⡼⣼' +
  '⠂⢂⠢⢢⠒⢒⠲⢲⠊⢊⠪⢪⠚⢚⠺⢺' +
  '⡂⣂⡢⣢⡒⣒⡲⣲⡊⣊⡪⣪⡚⣚⡺⣺' +
  '⠆⢆⠦⢦⠖⢖⠶⢶⠎⢎⠮⢮⠞⢞⠾⢾' +
  '⡆⣆⡦⣦⡖⣖⡶⣶⡎⣎⡮⣮⡞⣞⡾⣾' +
  '⠁⢁⠡⢡⠑⢑⠱⢱⠉⢉⠩⢩⠙⢙⠹⢹' +
  '⡁⣁⡡⣡⡑⣑⡱⣱⡉⣉⡩⣩⡙⣙⡹⣹' +
  '⠅⢅⠥⢥⠕⢕⠵⢵⠍⢍⠭⢭⠝⢝⠽⢽' +
  '⡅⣅⡥⣥⡕⣕⡵⣵⡍⣍⡭⣭⡝⣝⡽⣽' +
  '⠃⢃⠣⢣⠓⢓⠳⢳⠋⢋⠫⢫⠛⢛⠻⢻' +
  '⡃⣃⡣⣣⡓⣓⡳⣳⡋⣋⡫⣫⡛⣛⡻⣻' +
  '⠇⢇⠧⢧⠗⢗⠷⢷⠏⢏⠯⢯⠟⢟⠿⢿' +
  '⡇⣇⡧⣧⡗⣗⡷⣷⡏⣏⡯⣯⡟⣟⡿⣿'
).split('')

/**
 * Reverse lookup: Braille character → byte value.
 * Built by inverting the forward table.
 */
const BRAILLE_BYTE_TABLE = Object.fromEntries(
  Object.entries(BRAILLE_CHAR_TABLE)
    .map(([byteValue, brailleChar]) => [brailleChar, Number(byteValue)])
)

export { BRAILLE_CHAR_TABLE, BRAILLE_BYTE_TABLE }
