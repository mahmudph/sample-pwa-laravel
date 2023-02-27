import { Html5Qrcode } from "html5-qrcode";
import Sweal from "sweetalert2";

const showInformation = (title, message) => {
    if (Sweal.isLoading) Sweal.hideLoading();
    Sweal.fire({
        title: title,
        text: message,
        showConfirmButton: true,
        icon: "info",
        allowOutsideClick: false,
    });
};

const getCameraAvailability = async () => {
    try {
        let cameras = await Html5Qrcode.getCameras();
        return cameras;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const startQrScanner = async (html5QrCode, deviceId) => {
    try {
        let facingMode = { deviceId: deviceId };

        await html5QrCode.start(facingMode, config, (text, object) => {
            if (html5QrCode.isScanning) {
                html5QrCode.pause();
                window.localStorage.setItem("qr-result", text);
                showScanSuccess(html5QrCode);
            }
        });

        showInformation(
            "Scan Qr Code",
            "Pastikan qr code terlihat dengan jelas, didalam kotak dan tidak buram"
        );
    } catch (e) {
        return null;
    }
};

const stopQrScanner = (html5QrCode) => {
    if (html5QrCode.isScanning) html5QrCode.stop();
    $("#btn-action").toggleClass("d-none");
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
            // stopQrScanner(html5QrCode);
            window.location.href = "/scan-result";
        }
    });
};

const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1.7777778,
};

const showAvailableCameras = async (cameras) => {
    const result = await Sweal.fire({
        title: "Select Camera",
        input: "select",
        inputOptions: cameras,
    });
    return result.value;
};

$(function () {
    const html5QrCode = new Html5Qrcode("render", false);

    $("#start").on("click", () => {
        Sweal.showLoading();
        window.localStorage.removeItem("qr-result");

        getCameraAvailability().then((cameras) => {
            if (cameras && cameras.length) {
                let selectedCamera = {};
                cameras.forEach(
                    (item) => (selectedCamera[item.id] = item.label)
                );
                showAvailableCameras(selectedCamera).then((cameraId) => {
                    $("#start").toggleClass("d-none");
                    $(".content-information").toggleClass("d-none");

                    startQrScanner(html5QrCode, cameraId).then((_) => {
                        $("#btn-action").toggleClass("d-none");
                    });
                });
            } else {
                showInformation("Qr Code Failure", "No camera detected!");
            }
        });
    });

    $("#stop").on("click", () => {
        stopQrScanner(html5QrCode);
    });

    $("#upload").on("click", async () => {
        /**
         *
         */
        const { value: file } = await Sweal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
                accept: "image/*",
                "aria-label": "Upload your profile picture",
            },
        });

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Sweal.fire({
                    imageUrl: e.target.result,
                    imageAlt: "The uploaded picture",
                    allowOutsideClick: false,
                    showConfirmButton: true,
                    showCancelButton: true,
                }).then(async (res) => {
                    if (res.isConfirmed) {
                        try {
                            await html5QrCode.stop();
                            const result = await html5QrCode.scanFileV2(file);
                            window.localStorage.setItem(
                                "qr-result",
                                result.decodedText
                            );
                            showScanSuccess(html5QrCode);
                        } catch (e) {
                            console.log(e);
                            alert(e);
                        }
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    });
});
