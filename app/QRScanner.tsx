import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

interface QRScannerProps {
  onScan: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isScan, setIsScan] = useState(true);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <Text className="mb-3 text-lg text-center text-gray-700">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          className="px-6 py-3 bg-blue-500 rounded-3"
          onPress={requestPermission}
        >
          <Text className="text-lg text-center text-white">
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (result?.data && isScan) {
      setIsScan(false);
      onScan(result.data);
      Alert.alert(
        "Scanned data",
        result.data,
        [
          {
            text: "Scan Again",
            onPress: () => setIsScan(true),
          },
          {
            text: "Go to Home",
            onPress: () => router.replace("/"),
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <View
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            padding: 16,
            borderRadius: 8,
            marginHorizontal: 8,
          }}
          onPress={() => setFacing(facing === "back" ? "front" : "back")}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Flip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const handleQrScan = (data: string) => {
  Alert.alert("Scanned QR Code", data);
};

export default function QRScannerScreen() {
  return <QRScanner onScan={handleQrScan} />;
}
