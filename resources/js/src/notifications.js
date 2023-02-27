/*
 * Created by mahmud on Fri Feb 10 2023
 * Email mahmud120398@gmail.com
 * Copyright (c) 2023 mahmud
 * Description
 */

export const showNotification = async (title, message) => {
    try {
        self.registration.showNotification(title, {
            body: message,
            icon: "../images/icons/icon-192x192.png",
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "vibration-sample",
        });
    } catch (e) {
        console.log("show notification was failure", e);
    }
};

export const sendDataToUi = async (client, msg) => {
    return new Promise((resolve) => {
        const msgChannel = new MessageChannel();
        msgChannel.port1.onmessage = (event) => {
            if (event.data.error) {
                resolve(event.data.error);
            } else {
                resolve(event.data);
            }
        };
        client.postMessage(msg, [msgChannel.port2]);
    });
};

export const getClientById = async (clientId) => {
    const clientList = await clients.matchAll();
    const targetClient = clientList.find((client) => client.id === clientId);
    return targetClient;
};
