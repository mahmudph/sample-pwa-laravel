import QrScannerHandler from "./qr_scanner";
import Sweal from "sweetalert2";

const showInformation = async (title, message, icon = "info") => {
    if (Sweal.isLoading) Sweal.hideLoading();
    return Sweal.fire({
        title: title,
        text: message,
        showConfirmButton: true,
        icon: icon,
        allowOutsideClick: false,
    });
};

$(function () {
    let qrScannerOptions = {
        config: { fps: 10 },
        filedName: "category_id",
        shouldStopOnSuccess: true,
        shouldStopOnFailure: true,
        centerImageUrl:
            "https://cdn-icons-png.flaticon.com/512/3566/3566345.png",
    };

    const qrScannerHanlder = new QrScannerHandler(qrScannerOptions);

    $("#start").on("click", function () {
        qrScannerHanlder.setAddListener((result) => {
            console.log(result);

            /**
             * do action when type event is a onReceived
             */
            if (result.type == "onReceived") {
                showInformation("qr code scanner berhasil");
                console.log("save data into local storage => " + result.data);
                window.localStorage.setItem("qr-result", result.data);
            }
        });
        qrScannerHanlder.getAvailableCameraAndBindToHtml();
    });

    $("#stop").on("click", function () {
        qrScannerHanlder.stopCamera();
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
            success: async (e) => {
                let result = await showInformation(
                    "Add New Data",
                    "create new ata berhasil",
                    "success"
                );
                if (result.isConfirmed) {
                    window.location.href = "/home";
                }
            },
            error: (e) => {
                console.log(e);
                showInformation(
                    "Add New Data",
                    "create new ata gagal!",
                    "error"
                );
            },
        });
    });
});
