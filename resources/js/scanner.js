import { Html5QrcodeScanner } from "html5-qrcode";

let html5QrcodeScanner = new Html5QrcodeScanner("render", {
    fps: 10,
    disableFlip: true,
    qrbox: { width: 250, height: 250 },
});

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    html5QrcodeScanner.clear().then((_) => {
        window.location.href = "/home";
    });
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    console.warn(`Code scan error = ${error}`);
}

$(function () {
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});
