/*
 * Created by mahmud on Fri Feb 10 2023
 * Email mahmud120398@gmail.com
 * Copyright (c) 2023 mahmud
 * Description
 */

export const requestNotificationPermission = async () => {
    try {
        if ("Notification" in window) {
            if (Notification.permission != "granted") {
                /**
                 * when permission is not being granted then we should request the permission
                 * of the notification
                 */
                let permission = await Notification.requestPermission();
                return permission == "granted";
            }
            return true;
        }
    } catch (e) {
        console.log(e);
    }
    return false;
};
