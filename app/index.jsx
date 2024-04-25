import { Redirect, router } from "expo-router";
import { images } from "../constants";

import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import {useGlobalContext} from '../context/GlobalProvider'

export default function App() {

  const {isLoading, isLoggedIn} =  useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href='/home'/>
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center min-h-[100vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5 p-7">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endles Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora
            </Text>

            <CustomButton
              title="Continue With Email"
              handlePress={() => router.push('/sign-in')}
              containerStyle="w-full mt-7"

            />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style='light'/>
    </SafeAreaView>
  );
}
