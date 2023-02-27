import { requestNotificationPermission } from "./src/permission_handler";
import { showNotification } from "./src/notifications";

if ("serviceWorker" in navigator) {
    window.addEventListener("DOMContentLoaded", async () => {
        /**
         * register service worker in the browser
         */
        await navigator.serviceWorker.register("/sw.js");

        /**
         * we need to register periodic background task to
         * to process caching post to the server
         */
        const backgroundSyncName = "periodicSync";
        const registration = await navigator.serviceWorker.ready;

        /**
         * request web notification
         */
        requestNotificationPermission();

        /**
         * show message from service worker
         */
        if ("MessageChannel" in window) {
            navigator.serviceWorker.addEventListener("message", (event) => {
                console.log("im here in register sw file");
                showNotification("makan malam disini", event.data.toString());
            });
        } else {
            alert("message channel not working");
        }
        if (backgroundSyncName in registration) {
            /**
             * we nend to check if the browser is support to run periodic background task
             * or not
             */
            // const status = await navigator.permissions.query({
            //     name: "periodic-background-sync",
            // });
            // if (status) {
            //     try {
            //         await registration.sync.register("myQueueName");
            //         await registration.periodicSync.register("news", {
            //             minInterval: 24 * 60 * 60 * 1000, // 1 day
            //         });
            //         console.log("Periodic background sync registered!");
            //     } catch (e) {
            //         console.error(`Periodic background sync failed:\nx${e}`);
            //     }
            // } else {
            //     console.log(
            //         "ups,your browser does not support background sync"
            //     );
            // }
        }

        console.log("service worker already registered");
    });
    console.log("your browser support service worker");
} else {
    console.log("your device does not support service worker");
}
