import QrScannerHandler from "./qr_scanner";

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
                console.log("save data into local storage => " + result.data);
                window.localStorage.setItem("qr-result", result.data);
            }
        });
        qrScannerHanlder.getAvailableCameraAndBindToHtml();
    });
});
