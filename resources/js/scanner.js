import { Html5Qrcode } from "html5-qrcode";
import Sweal from "sweetalert2";
const html5QrCode = new Html5Qrcode("render", false);

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

const startQrScanner = async (deviceId) => {
    try {
        const facingMode = { deviceId: deviceId };
        const config = { fps: 10 };

        await html5QrCode.start(facingMode, config, (text, _) => {
            if (html5QrCode.isScanning) {
                html5QrCode.stop();
                window.localStorage.setItem("qr-result", text);
                $(
                    `
                       <div class='form-group'>
                            <label for='category_id'>Category</label>
                            <input type='text' readonly class='form-control' name='category_id' id='category_id' value=${text} />
                       </div>
                    `
                ).insertBefore("#btn-content");
                showInformation("Scan Qr Code", "scan qr code berhasil");
            }
        });
    } catch (e) {
        console.log(e);
        return null;
    }
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

$(document).ready(() => {
    getCameraAvailability()
        .then((cameras) => {
            let cameraContainer = $("#cameras");
            cameras.forEach((item) => {
                cameraContainer.append(
                    `<option value=${item.id}>${item.label}</option>`
                );
            });
        })
        .catch((e) => {
            console.log(e);
        });

    $("#start").on("click", function () {
        let cameraId = $("#cameras").find(":selected").val();
        if (cameraId != null && cameraId != "") {
            startQrScanner(cameraId);
        } else {
            alert("tidak ada");
        }
    });

    $("#stop").on("click", function () {
        html5QrCode.stop().then((res) => console.log(res));
    });

    $("#form").on("submit", function (e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            url: "api/master/create",
            type: "post",
            data: $(this).serialize(),
            header: {
                "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
            },
            success: (e) => {
                alert(e);
                showInformation("Add New Data", "create new ata berhasil");
            },
            error: (e) => {
                console.log(e);
                showInformation("Add New Data", "create new ata gagal!");
            },
        });
    });
});
