import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import "./../global.css";

const App = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const pickImage = async () => {
    const permisionRes =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permisionRes.granted) {
      Alert.alert("Permission", "Permission to access gallery is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const capturePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission", "Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      try {
        const asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
        await MediaLibrary.createAlbumAsync("ExpoApp", asset, true);
        Alert.alert("Saved", "Your photo has been saved to gallery!");
      } catch (err) {
        Alert.alert("Error", "Failed to save photo to gallery.");
      }
    }
  };

  if (!mediaPermission) return <View />;
  if (!mediaPermission.granted) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <Text className="mb-3 text-lg text-center text-gray-700">
          We need permission to save photo to your gallery
        </Text>
        <TouchableOpacity
          className="px-6 py-3 bg-blue-500 rounded-3"
          onPress={requestMediaPermission}
        >
          <Text className="text-lg text-center text-white">
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 w-full bg-gray-50">
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#f59e42",
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
          }}
          onPress={() => {
            router.replace("/QRScanner");
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
            Scan QR Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#2563eb",
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
          }}
          onPress={pickImage}
        >
          <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
            Pick an image from gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#059669",
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
          }}
          onPress={capturePhoto}
        >
          <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
            Capture a photo
          </Text>
        </TouchableOpacity>
        {photo && (
          <Image
            source={{ uri: photo }}
            style={{
              width: 220,
              height: 220,
              borderRadius: 16,
              alignSelf: "center",
              marginBottom: 16,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default App;
