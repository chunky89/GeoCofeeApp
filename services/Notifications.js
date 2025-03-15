import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export async function Notifications() {
    const {status} = await requestPusNotifications.requestPermissionAsync();
    if (status !== 'granted') {
        alert('enable notifications update')
        return;
    }
}

export async function getToken() {
    if(Platform.OS ==='android') {
        await messaging().requestPermission();
        return await messaging().getToken();
    }
}
