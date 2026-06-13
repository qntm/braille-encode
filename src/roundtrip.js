import { encode, decode } from './index.js'

/**
 * Round-trip test: encode bytes to Braille, then decode back.
 * The decoded result must match the original input.
 * Returns the decoded Uint8Array for fingerprint verification.
 */
export const roundtrip = uint8Array => {
  const encoded = encode(uint8Array)
  return decode(encoded)
}

// Re-export for Ghost Proxy watchability
export { encode, decode }
