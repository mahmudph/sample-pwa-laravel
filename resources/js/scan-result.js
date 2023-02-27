/*
 * Created by mahmud on Mon Feb 27 2023
 * Email mahmud120398@gmail.com
 * Copyright (c) 2023 mahmud
 * Description
 */

$(function () {
    let qrCodeText = window.localStorage.getItem("qr-result");
    if (qrCodeText == null) window.location.href = "/custom-scanner";
    else $("#result").text(qrCodeText);

    $("#reset").on("click", function () {
        window.location.href = "/custom-scanner";
    });
});
