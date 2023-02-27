import { Html5Qrcode } from "html5-qrcode";
import Sweal from "sweetalert2";

const showInformation = (title, message) => {
    Sweal.hideLoading();
    Sweal.fire({
        title: title,
        text: message,
        showConfirmButton: true,
        icon: "info",
        allowOutsideClick: false,
    });
};

const stopQrScanner = (html5QrCode) => {
    html5QrCode.stop();
    $("#stop").toggleClass("d-none");
    $("#start").toggleClass("d-none");
    $(".content-information").toggleClass("d-none");
};

const showScanSuccess = (html5QrCode) => {
    Sweal.fire({
        title: "Scan Qr Code Success",
        text: "Process scan qr code berhasil. mohon tunggu sebentar",
        icon: "success",
        showCancelButton: false,
        showCloseButton: false,
        showConfirmButton: true,
        allowOutsideClick: false,
    }).then((res) => {
        if (res.isConfirmed) {
            stopQrScanner(html5QrCode);
        }
    });
};

const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1.7777778,
};

const facingMode = { facingMode: { exact: "environment" } };

$(function () {
    const html5QrCode = new Html5Qrcode("render", false);

    $("#start").on("click", () => {
        Sweal.showLoading();
        setTimeout(() => {
            const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                if (html5QrCode.isScanning) {
                    html5QrCode.pause();
                    showScanSuccess(html5QrCode);
                }
            };

            $("#stop").toggleClass("d-none");
            $("#start").toggleClass("d-none");
            $(".content-information").toggleClass("d-none");

            html5QrCode
                .start(facingMode, config, qrCodeSuccessCallback)
                .then((_) => {
                    showInformation(
                        "Scan Qr Code",
                        "Pastikan qr code terlihat dengan jelas, didalam kotak dan tidak buram"
                    );
                });
        }, 3000);
    });

    $("#stop").on("click", () => {
        stopQrScanner(html5QrCode);
    });
});
