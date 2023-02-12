import { useRef, useEffect } from "react";
import { Background } from "./src/components/Background";
import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";
import "./src/services/notificationSettings";
import { fetchPushNotificationToken } from "./src/services/pushNotificationToken";
import { Subscription } from "expo-modules-core";
import * as Notifications from "expo-notifications";

export default function App() {
  const fetchNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    fetchPushNotificationToken();
  });

  useEffect(() => {
    fetchNotificationListener.current = Notifications.addNotificationReceivedListener(not => {

    })

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
    })

    return () => {
      if (fetchNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(fetchNotificationListener.current)
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  }, [])
  

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <Background>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
