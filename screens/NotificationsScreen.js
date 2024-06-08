// import { StyleSheet, Text, View, Button, Platform  } from 'react-native';
// import { useState, useEffect} from 'react';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
// export default function App() {

//   const [expoPushToken, setExpoPushToken] = useState('');

//   useEffect (() => {
//     console.log("Registering for push notifications...")

//     registerForPushNotificationsAsync().then(token => {
//       console.log("token: ", token);
//       setExpoPushToken(token);
//     }).catch((err) => console.log((err)));
//   }, []);

//   async function registerForPushNotificationsAsync() {
//     let token;
  
//     if (Platform.OS === 'android') {
//       await Notifications.setNotificationChannelAsync('default', {
//         name: 'default',
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: '#FF231F7C',
//       });
//     }
  
//     if (Device.isDevice) {
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!');
//         return;
//       }
//       // Learn more about projectId:
//       // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//       // EAS projectId is used here.
//       try {
//         const projectId =
//           Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
//         if (!projectId) {
//           throw new Error('Project ID not found');
//         }
//         token = (
//           await Notifications.getExpoPushTokenAsync({
//             projectId,
//           })
//         ).data;
//         console.log(token);
//       } catch (e) {
//         token = `${e}`;
//       }
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }
  
//     return token;
//   }

//   // const sendNotification = async ()=>{
//   //   console.log("Sending notification");

//   //   //notification message
//   //   const message = {
//   //     to: ExpoPushToken,
//   //     sound: "defaut",
//   //     title:"hello",
//   //     body: "world",
//   //   };

//   async function schedulePushNotification() {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "You've got mail! 📬",
//         body: 'Here is the notification body',
//         data: { data: 'goes here', test: { test1: 'more data' } },
//       },
//       trigger: { seconds: 2 },
//     });
//   }
//     // await fetch ("https://exp.host/--/api/v2/push/send", {
//     //   method: "POST",
//     //   headers: {
//     //     host: "exp.host",
//     //     accept: "application/json",
//     //     "accept-encoding": "gzip, deflate",
//     //     "content-type": "application/json",
//     //   },
//     //   body: JSON.stringify(message),
//     // });
//   // };
//   return (
//     <View style={{marginTop: 100, alignItems: "center"}}>
//       <Text style={{marginVertical: 30}}>Expo RN Push Notifications</Text>
//       <Button title="Send push notification" onpress ={async () => {
//           await schedulePushNotification();
//         }} />
//     </View>
//   );
// }














import React, { useEffect, useRef, useState } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
//import Products from './components/Products';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  }),
});
 
 function NotificationScreem({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();
 
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
 
    if (Device.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
 
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
 
    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Produtos')}
        title="Ver produtos"
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
       
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </View>
    </View>
  );
}
 
 
async function schedulePushNotification(nome, marca, preco) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Novo Produto!!!",
      body: 'Venha Conferir Nosso Novo Produto',
      data: { nome: nome, test: { test1: marca, teste2:preco } },
    },
    trigger: { seconds: 2 },
  });
}
 
async function registerForPushNotificationsAsync() {
  let token;
 
  if (Device.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
 
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }
 
  return token;
}
 
Notifications.scheduleNotificationAsync({
  content: {
    title: 'Look at that notification',
    body: "I'm so proud of myself!",
  },
  trigger: null,
});
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export{schedulePushNotification, NotificationScreem, registerForPushNotificationsAsync};
