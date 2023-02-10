
function createQRCode(id, config) {
    const qr = new QRCode(document.getElementById(id), config.text);

    console.log(qr);

    return qr;
}