import QRCode from "qrcode"

export async function buildQr(url: string): Promise<string> {
  return QRCode.toString(url, { type: "svg", margin: 1, color: { dark: "#00d4aa", light: "#00000000" } })
}
