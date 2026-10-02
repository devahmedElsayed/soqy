import { View, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";
import { useShop } from "../../context/ShopContext";

export default function ProductCard({ product }) {
  const { row, isRTL } = useRTL();

  const {
    cart,
    favorites,
    addToCart,
    toggleFavorite,
  } = useShop();

  const [quantity, setQuantity] = useState(1);

  const isFavorite = favorites.some(
    (item) => item.id === product.id
  );

  const isAdded = cart.some(
    (item) => item.id === product.id
  );

  const handleDetails = () => {
    router.push({
      pathname: "/product/[id]",
      params: {
        id: product.id,
      },
    });
  };

  const handleFavorite = () => {
    toggleFavorite(product);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <View className="w-[48%] mb-7">

      {/* Product Image */}
      <Pressable
        onPress={handleDetails}
        className="active:opacity-80"
      >
        <View className="w-full h-[190px] rounded-[22px] bg-gray-50 overflow-hidden">

          <Image
            source={{
              uri: product.thumbnail || product.images?.[0],
            }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Discount */}
          {product.discountPercentage > 0 && (
            <View className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black">
              <AppText
                weight="bold"
                className="text-white text-[9px]"
              >
                -{Math.round(product.discountPercentage)}%
              </AppText>
            </View>
          )}

          {/* Favorite */}
          <Pressable
            onPress={handleFavorite}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white items-center justify-center active:opacity-70"
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={18}
              color={isFavorite ? "#111" : "#777"}
            />
          </Pressable>

        </View>
      </Pressable>

      {/* Product Info */}
      <Pressable
        onPress={handleDetails}
        className="pt-3 px-1 active:opacity-70"
      >
        <AppText
          weight="semibold"
          numberOfLines={1}
          className="text-[14px] text-black"
        >
          {product.title}
        </AppText>

        <AppText
          weight="regular"
          numberOfLines={1}
          className="text-[10px] text-gray-400 mt-1"
        >
          {product.brand || product.category}
        </AppText>

        {/* Price + Rating */}
        <View
          className="items-center justify-between mt-2"
          style={{ flexDirection: row }}
        >
          <AppText
            weight="bold"
            className="text-[15px] text-black"
          >
            ${product.price}
          </AppText>

          <View className="flex-row items-center">
            <Ionicons
              name="star"
              size={11}
              color="#111"
            />

            <AppText
              weight="semibold"
              className="text-[10px] text-gray-500 ml-1"
            >
              {product.rating?.toFixed(1)}
            </AppText>
          </View>
        </View>
      </Pressable>

      {/* Quantity */}
      <View
        className="mt-3 h-10 rounded-xl bg-gray-100 items-center justify-between px-2"
        style={{ flexDirection: row }}
      >
        <Pressable
          onPress={decreaseQuantity}
          disabled={quantity === 1}
          className="w-7 h-7 rounded-lg bg-white items-center justify-center active:opacity-60"
        >
          <Ionicons
            name="remove"
            size={14}
            color={quantity === 1 ? "#ccc" : "#111"}
          />
        </Pressable>

        <AppText
          weight="bold"
          className="text-[12px] text-black"
        >
          {quantity}
        </AppText>

        <Pressable
          onPress={increaseQuantity}
          disabled={quantity >= product.stock}
          className="w-7 h-7 rounded-lg bg-white items-center justify-center active:opacity-60"
        >
          <Ionicons
            name="add"
            size={14}
            color={
              quantity >= product.stock
                ? "#ccc"
                : "#111"
            }
          />
        </Pressable>
      </View>

      {/* Add To Cart */}
      <Pressable
        onPress={handleAddToCart}
        className={`mt-2 h-10 rounded-xl items-center justify-center active:opacity-80 ${
          isAdded ? "bg-gray-200" : "bg-black"
        }`}
      >
        <View
          className="items-center"
          style={{ flexDirection: row }}
        >
          <Ionicons
            name={isAdded ? "checkmark" : "bag-add-outline"}
            size={15}
            color={isAdded ? "#111" : "#fff"}
          />

          <AppText
            weight="semibold"
            className={`text-[10px] ml-2 ${
              isAdded ? "text-black" : "text-white"
            }`}
          >
            {isAdded
              ? isRTL
                ? "تمت الإضافة"
                : "Added"
              : isRTL
              ? "أضف للسلة"
              : "Add to Cart"}
          </AppText>
        </View>
      </Pressable>

    </View>
  );
}