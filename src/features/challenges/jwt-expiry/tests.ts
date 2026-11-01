export const jwtTests = `
const NOW = 1000000

function t(name, token, expected) {
  const result = acceptToken(token, NOW)
  return { name, passed: result === expected }
}

const valid = { header: { alg: "HS256" }, payload: { sub: "u1", exp: NOW + 100, aud: "sprintpulse" }, signatureValid: true }

return [
  t("valid token not expired", valid, true),
  t("exp in the past", { ...valid, payload: { ...valid.payload, exp: NOW - 1 } }, false),
  t("no exp field", { ...valid, payload: { sub: "u1", aud: "sprintpulse" } }, false),
  t("alg none with valid flag", { ...valid, header: { alg: "none" } }, false),
  t("wrong audience", { ...valid, payload: { ...valid.payload, aud: "other" } }, false),
  t("nbf in future", { ...valid, payload: { ...valid.payload, nbf: NOW + 50 } }, false),
  t("signatureValid false", { ...valid, signatureValid: false }, false),
]
`
