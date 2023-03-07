/*
 * Created by mahmud on Tue Mar 07 2023
 * Email mahmud120398@gmail.com
 * Copyright (c) 2023 mahmud
 * Description
 */
import { Html5Qrcode } from "html5-qrcode";
import select2 from "select2";
import jQuery from "jquery";

window.$ = jQuery;
select2();

export default class QrScannerHandler {
    #htmlQrCode;
    #qrConfiguration;
    #qrFormFieldName;
    #eventListener;
    #shouldPauseQrScanner;
    #shouldStopQrScanner;
    #centerImageUrl;
    #isAvailableCameraAlradyCalled;

    /**
     *
     * @param {object} options
     */
    constructor(options) {
        this.#isAvailableCameraAlradyCalled = false;

        this.#centerImageUrl = options.centerImageUrl;
        this.#qrFormFieldName = options.filedName;
        this.#qrConfiguration = options.config ?? { fps: 10 };

        this.#shouldStopQrScanner = options.shouldStopOnSuccess;
        this.#shouldPauseQrScanner = options.shouldStopOnFailure;

        this.#htmlQrCode = new Html5Qrcode("qr-render", false);
        this.#registerListenOnSelectCamera();
    }

    /**
     * set a callback function
     * which will return a object { 'type': 'onStop' | 'onStart' | 'onReceived' | 'onError' }
     * @param { fuction } cb
     */
    setAddListener = (cb) => {
        this.#eventListener = cb;
    };

    /**
     * start process qr scanner
     * this will get the available camera on the device then
     * will show select option which used to select the camera
     */
    getAvailableCameraAndBindToHtml = async () => {
        try {
            if (!this.#isAvailableCameraAlradyCalled) {
                /**
                 * set available camera is already called
                 */
                this.#isAvailableCameraAlradyCalled = true;
                let availableCameras = await this.#getAvailableCamera();

                /**
                 * create a select option based camera available
                 */
                availableCameras.forEach((camera) => {
                    $("#camera").append(
                        `<option value=${camera.id}>${camera.label}</option>`
                    );
                });

                this.#sendEventListener({
                    type: "receivedCameralist",
                    data: availableCameras,
                });

                $("#qr-scanner-content").removeClass("d-none");
                $("#camera").select2();
            }
        } catch (e) {
            this.#sendEventListener({ type: "onError", error: e });
        }
    };

    #getAvailableCamera = async () => {
        return await Html5Qrcode.getCameras();
    };

    #registerListenOnSelectCamera = () => {
        $("#camera").on("change", async () => {
            let selectedCameraId = $("#camera").find(":selected").val();
            if (selectedCameraId != null && selectedCameraId != "") {
                /**
                 * when qr code is alredy running then
                 * stop the session then start with new sessions
                 */
                if (this.#htmlQrCode.isScanning) {
                    $(".center-qr-scanner-logo").remove();
                    await this.#htmlQrCode.stop();
                }

                let facingSelectedId = { deviceId: selectedCameraId };
                this.#startQrScanner(facingSelectedId, this.#qrConfiguration);
            } else {
                /**
                 * when qr code is scanning then stop sessions
                 */
                if (this.#htmlQrCode.isScanning) {
                    $(".center-qr-scanner-logo").remove();
                    this.#htmlQrCode.stop();
                }
            }
        });
    };

    #startQrScanner = async (deviceId, options) => {
        try {
            await this.#htmlQrCode.start(
                deviceId,
                options,
                this.#listenOnDetectedQrCode
            );
            /**
             * add camera icon in the center of the qr camera
             */
            if (this.#centerImageUrl != null) {
                $(".qr-content").append(
                    `<img src=${this.#centerImageUrl}
                    class='center-qr-scanner-logo'
                    width='50px'
                    height='50px' />`
                );

                $(".center-qr-scanner-logo").css({
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                });
            }

            this.#sendEventListener({ type: "onStart" });
        } catch (e) {
            this.#sendEventListener({ type: "onError", error: e });
        }
    };

    #handleOnSuccess = async () => {
        $(".center-qr-scanner-logo").remove();

        if (this.#shouldPauseQrScanner) this.#htmlQrCode.pause();
        if (this.#shouldStopQrScanner) await this.#htmlQrCode.stop();

        this.#sendEventListener({ type: "onStop" });
    };

    #sendEventListener = (data) => {
        if (this.#eventListener != null) this.#eventListener(data);
    };

    #listenOnDetectedQrCode = (qrData, _) => {
        $(
            `
               <div class='form-group'>
                    <input
                        type='hidden'
                        class='form-control'
                        name='${this.#qrFormFieldName}'
                        id='${this.#qrFormFieldName}'
                        value=${qrData}
                    />
               </div>
            `
        ).insertAfter("#camera");

        this.#sendEventListener({ type: "onReceived", data: qrData });
        this.#handleOnSuccess();
    };
}
