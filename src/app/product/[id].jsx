import { useEffect, useState } from "react";

import {
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AppText from "../../components/AppText";
import useRTL from "../../hooks/useRTL";

import { getProducts } from "../../../services/api";
import { useShop } from "../../context/ShopContext";

import ProductDetailsHeader from "../../components/ProductDetails/ProductDetailsHeader";
import ProductDetailsImage from "../../components/ProductDetails/ProductDetailsImage";
import ProductDetailsInfo from "../../components/ProductDetails/ProductDetailsInfo";
import ProductDetailsActions from "../../components/ProductDetails/ProductDetailsActions";

export default function ProductDetails() {
  const { id } = require("expo-router").useLocalSearchParams();

  const { isRTL } = useRTL();

  const {
    cart,
    favorites,
    addToCart,
    toggleFavorite,
  } = useShop();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const isFavorite = favorites.some(
    (item) => item.id === product?.id
  );

  const isAdded = cart.some(
    (item) => item.id === product?.id
  );

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await getProducts();

        const foundProduct = products.find(
          (item) =>
            String(item.id) === String(id)
        );

        setProduct(foundProduct);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

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

  const handleFavorite = () => {
    toggleFavorite(product);
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1 }}
        className="bg-white"
      >
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator
            size="large"
            color="#111"
          />

          <AppText
            weight="medium"
            className="text-gray-500 text-[13px] mt-4"
          >
            {isRTL
              ? "جاري تحميل المنتج..."
              : "Loading product..."}
          </AppText>
        </View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView
        style={{ flex: 1 }}
        className="bg-white"
      >
        <View className="flex-1 items-center justify-center">
          <AppText
            weight="bold"
            className="text-black"
          >
            {isRTL
              ? "المنتج غير موجود"
              : "Product not found"}
          </AppText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="bg-white"
      edges={["top"]}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      >
        <ProductDetailsHeader
          isFavorite={isFavorite}
          onFavorite={handleFavorite}
        />

        <ProductDetailsImage
          product={product}
        />

        <ProductDetailsInfo
          product={product}
        />

        <ProductDetailsActions
          product={product}
          quantity={quantity}
          isAdded={isAdded}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onAddToCart={handleAddToCart}
        />
      </ScrollView>
    </SafeAreaView>
  );
}