import { useEffect, useMemo, useState } from "react";

import {
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import BottomNav from "../components/BottomNav";

import ProductsHeader from "../components/Products/ProductsHeader";
import ProductsSearch from "../components/Products/ProductsSearch";
import ProductsCategories from "../components/Products/ProductsCategories";
import ProductCard from "../components/Products/ProductCard";
import ProductsFilter from "../components/Products/ProductsFilter";

import AppText from "../components/AppText";
import useRTL from "../hooks/useRTL";

import { getProducts } from "../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
  const { isRTL, row } = useRTL();

  // Category coming from Home
  const { category } = useLocalSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState(category || "all");

  const [showFilter, setShowFilter] = useState(false);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Update category when coming from Home
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("all");
    }
  }, [category]);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products.map(
          (product) => product.category
        )
      ),
    ];

    return ["all", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery.trim()) {
      const query =
        searchQuery.trim().toLowerCase();

      result = result.filter((product) =>
        `${product.title} ${
          product.category
        } ${product.brand || ""}`
          .toLowerCase()
          .includes(query)
      );
    }

    // Category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category ===
          selectedCategory
      );
    }

    // Min Price
    if (minPrice !== "") {
      result = result.filter(
        (product) =>
          product.price >=
          Number(minPrice)
      );
    }

    // Max Price
    if (maxPrice !== "") {
      result = result.filter(
        (product) =>
          product.price <=
          Number(maxPrice)
      );
    }

    // Rating
    if (selectedRating > 0) {
      result = result.filter(
        (product) =>
          product.rating >=
          selectedRating
      );
    }

    // Sort
    if (sortBy === "low") {
      result.sort(
        (a, b) =>
          a.price - b.price
      );
    }

    if (sortBy === "high") {
      result.sort(
        (a, b) =>
          b.price - a.price
      );
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          b.rating - a.rating
      );
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    selectedRating,
    sortBy,
  ]);

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedRating(0);
    setSortBy("default");
    setSelectedCategory("all");
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator
          size="large"
          color="#111"
        />

        <AppText
          weight="medium"
          className="text-gray-500 text-[13px] mt-4"
        >
          {isRTL
            ? "جاري تحميل المنتجات..."
            : "Loading products..."}
        </AppText>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">

        {/* Header */}
        <ProductsHeader
          productsCount={
            filteredProducts.length
          }
        />

        {/* Search */}
        <ProductsSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Categories */}
        <View className="mt-5">

          <View
            className="px-6 mb-3 items-center justify-between"
            style={{
              flexDirection: row,
            }}
          >
            <AppText
              weight="bold"
              className="text-[14px] text-black"
            >
              {isRTL
                ? "الأقسام"
                : "Categories"}
            </AppText>

            <Pressable
              onPress={() =>
                setShowFilter(true)
              }
              className="h-9 px-4 rounded-xl bg-black flex-row items-center"
            >
              <Ionicons
                name="options-outline"
                size={15}
                color="#fff"
              />

              <AppText
                weight="semibold"
                className="text-[10px] text-white ml-2"
              >
                {isRTL
                  ? "فلترة"
                  : "Filter"}
              </AppText>
            </Pressable>
          </View>

          <ProductsCategories
            categories={categories}
            selectedCategory={
              selectedCategory
            }
            setSelectedCategory={
              setSelectedCategory
            }
          />

        </View>

        {/* Products */}
        <View className="flex-1 mt-3">

          <View
            className="px-6 mb-3 items-center justify-between"
            style={{
              flexDirection: row,
            }}
          >
            <AppText
              weight="bold"
              className="text-[14px] text-black"
            >
              {isRTL
                ? "كل المنتجات"
                : "All Products"}
            </AppText>

            <AppText
              weight="medium"
              className="text-[10px] text-gray-400"
            >
              {filteredProducts.length}
            </AppText>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 110,
            }}
          >
            {filteredProducts.length > 0 ? (
              <View className="flex-row flex-wrap justify-between">
                {filteredProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}
              </View>
            ) : (
              <View className="items-center justify-center py-20">

                <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center">
                  <Ionicons
                    name="search-outline"
                    size={25}
                    color="#999"
                  />
                </View>

                <AppText
                  weight="bold"
                  className="text-black text-[14px] mt-4"
                >
                  {isRTL
                    ? "مفيش منتجات"
                    : "No products found"}
                </AppText>

                <AppText
                  weight="regular"
                  className="text-gray-400 text-[11px] mt-1"
                >
                  {isRTL
                    ? "جرب تغير البحث أو الفلاتر"
                    : "Try changing your search or filters"}
                </AppText>

              </View>
            )}
          </ScrollView>

        </View>

        {/* Filter */}
        <ProductsFilter
          visible={showFilter}
          setVisible={setShowFilter}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedRating={
            selectedRating
          }
          setSelectedRating={
            setSelectedRating
          }
          sortBy={sortBy}
          setSortBy={setSortBy}
          resetFilters={resetFilters}
        />

        {/* Bottom Navigation */}
        <BottomNav />

      </View>
    </SafeAreaView>
  );
}