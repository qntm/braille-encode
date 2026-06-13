/**
 * Braille encoding lookup table.
 * Each of the 256 possible byte values (0x00–0xFF) maps to a unique
 * Braille pattern character in Unicode range U+2800–U+28FF.
 *
 * The mapping follows the standard Braille dot numbering:
 *   Dot 1 = bit 0 (0x01)
 *   Dot 2 = bit 1 (0x02)
 *   Dot 3 = bit 2 (0x04)
 *   Dot 4 = bit 3 (0x08)
 *   Dot 5 = bit 4 (0x10)
 *   Dot 6 = bit 5 (0x20)
 *   Dot 7 = bit 6 (0x40)
 *   Dot 8 = bit 7 (0x80)
 *
 * Characters are ordered so that byte value N maps to encodechar[N].
 */
export const encodechar = (
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
 * Reverse lookup table: Braille character → byte value.
 * Built by inverting the encodechar mapping.
 */
export const decodechar = Object.fromEntries(
  Object.entries(encodechar)
    .map(([i, ch]) => [ch, i])
)
