import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import {
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  View,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import SpecialOffers from "../components/Home/SpecialOffers";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import AllProducts from "../components/Home/AllProducts";
import BestSellers from "../components/Home/BestSellers";
import Brands from "../components/Home/Brands";
import PromoBanner from "../components/Home/PromoBanner";
import NewArrivals from "../components/Home/NewArrivals";
import Footer from "../components/Home/Footer";

import AppText from "../components/AppText";

import { getProducts } from "../../services/api";

export default function Index() {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const loadProducts = async () => {
    try {
      setError(false);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.log("Failed to load products:", error);

      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    await loadProducts();

    setRefreshing(false);
  };

 // Loading State


  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">

          <ActivityIndicator
            size="large"
            color="#111"
          />

          <AppText
            weight="medium"
            className="text-gray-500 text-[13px] mt-4"
          >
            {t("home.loading")}
          </AppText>

        </View>
      </SafeAreaView>
    );
  }

 
  // Error State
  

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">

          <AppText
            weight="bold"
            className="text-black text-[18px]"
          >
            {t("home.errorTitle")}
          </AppText>

          <AppText
            weight="regular"
            className="text-gray-500 text-[12px] mt-2 text-center"
          >
            {t("home.errorMessage")}
          </AppText>

          <Pressable
            onPress={() => {
              setLoading(true);
              loadProducts();
            }}
            className="mt-5 px-7 h-11 rounded-full bg-black items-center justify-center active:opacity-70"
          >
            <AppText
              weight="semibold"
              className="text-white text-[12px]"
            >
              {t("home.retry")}
            </AppText>
          </Pressable>

        </View>
      </SafeAreaView>
    );
  }

 
  // Empty State
  

  if (products.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">

          <AppText
            weight="bold"
            className="text-black text-[18px]"
          >
            {t("home.emptyTitle")}
          </AppText>

          <AppText
            weight="regular"
            className="text-gray-500 text-[12px] mt-2 text-center"
          >
            {t("home.emptyMessage")}
          </AppText>

          <Pressable
            onPress={() => {
              setLoading(true);
              loadProducts();
            }}
            className="mt-5 px-7 h-11 rounded-full bg-black items-center justify-center active:opacity-70"
          >
            <AppText
              weight="semibold"
              className="text-white text-[12px]"
            >
              {t("home.retry")}
            </AppText>
          </Pressable>

        </View>
      </SafeAreaView>
    );
  }

  
  // Home


 return (
  <SafeAreaView
    className="flex-1 bg-white"
    edges={["top"]}
  >
    <Header
      products={products}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      isScrolled={isScrolled}
    />

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 0,
      }}
      onScroll={(event) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        setIsScrolled(offsetY > 60);
      }}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#111"
        />
      }
    >
      <Hero products={products} />

      <Categories products={products} />

      <SpecialOffers products={products} />

      <FeaturedProducts products={products} />

      <AllProducts products={products} />

      <BestSellers products={products} />

      <Brands products={products} />

      <PromoBanner products={products} />

      <NewArrivals products={products} />

      <Footer />
    </ScrollView>
     <BottomNav />
  </SafeAreaView>
);
}