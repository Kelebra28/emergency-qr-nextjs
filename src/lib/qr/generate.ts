import QRCode from 'qrcode';

export async function generateQrDataUrl(value: string) {
  return QRCode.toDataURL(value, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 320,
  });
}

export async function generateQrBuffer(value: string) {
  return QRCode.toBuffer(value, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 500,
    type: 'png',
  });
}
