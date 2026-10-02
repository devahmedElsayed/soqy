import { useState } from "react";

import {
  View,
  Image,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppText from "../AppText";

export default function ProductDetailsImage({
  product,
}) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const imageUri =
    product.thumbnail || product.images?.[0];

  return (
    <>
      {/* Small Image */}

      <Pressable
        onPress={() => setIsImageOpen(true)}
        style={styles.smallContainer}
      >
        <Image
          source={{ uri: imageUri }}
          style={styles.smallImage}
          resizeMode="contain"
        />

        {product.discountPercentage > 0 && (
          <View className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black">
            <AppText
              weight="bold"
              className="text-white text-[10px]"
            >
              -{Math.round(product.discountPercentage)}%
            </AppText>
          </View>
        )}
      </Pressable>

      {/* Full Screen */}

      <Modal
        visible={isImageOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsImageOpen(false)}
      >
        <View style={styles.modalContainer}>

          <Pressable
            onPress={() => setIsImageOpen(false)}
            style={styles.closeButton}
          >
            <Ionicons
              name="close"
              size={26}
              color="#fff"
            />
          </Pressable>

          <Image
            source={{ uri: imageUri }}
            style={styles.largeImage}
            resizeMode="contain"
          />

        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  smallContainer: {
    marginHorizontal: 24,
    marginTop: 12,
    height: 220,
    borderRadius: 24,
    backgroundColor: "#f9fafb",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  smallImage: {
    width: "100%",
    height: "100%",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  largeImage: {
    width: "100%",
    height: "80%",
  },

  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});