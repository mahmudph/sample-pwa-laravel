import { BackgroundSyncPlugin } from "workbox-background-sync";
import { registerRoute } from "workbox-routing";
import { NetworkOnly } from "workbox-strategies";
import { showNotification, sendDataToUi, getClientById } from "./notifications";

const statusPlugin = {
    fetchDidSucceed: ({ response }) => {
        if (response.statusCode >= 500) {
            throw new Error("no internet connection");
        }
        return response;
    },
    fetchDidFail: async (error) => {
        console.log("makan malam");
        console.log(error);
        console.log(error.event.clientId);
        const client = getClientById(error.event.clientId);
        sendDataToUi(client, "data will be post when internet availble");
    },
};

registerRoute(
    ({ url }) =>
        url.pathname == "/add-news" || url.pathname == "/api/master/create",
    new NetworkOnly({
        cacheName: "data-cache",
        plugins: [
            statusPlugin,
            new BackgroundSyncPlugin("myQueueNames", {
                maxRetentionTime: 0.1 * 60,
                onSync: async ({ queue }) => {
                    let entry;
                    while ((entry = await queue.shiftRequest())) {
                        try {
                            await fetch(entry.request);
                            showNotification("woh. your post has been sync ");
                        } catch (error) {
                            await this.unshiftRequest(entry);
                            throw error;
                        }
                    }
                },
            }),
        ],
    }),
    "POST"
);
