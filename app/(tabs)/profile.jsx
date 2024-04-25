import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const logout = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-16 mb-12 px-4">
            <TouchableOpacity
              className="items-end w-full mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border-secondary border rounded-lg justify-center items-center"> 
              <Image source={{uri:user?.avatar}} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover"/>
            </View>

            <InfoBox 
              title={user?.username}
              containerStyle='mt-5'
              titleStyles='text-lg'
              />

              <View className="flex-row mt-5">
              <InfoBox 
              title={posts.length || 0}
              containerStyle='mr-10'
              subTitle='Posts'
              titleStyles='text-xl'
              />
              <InfoBox 
              title='1.2k' 
              subTitle='Followers'
              titleStyles='text-xl'
              />
              </View>
          </View>
        )}
        ListEmptyComponent={() => {
          <EmptyState
            title="No videos found!"
            subtitle="No videos found for this search query!"
          />;
          // <Text className='text-white'>adsadasdasdas</Text>
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
