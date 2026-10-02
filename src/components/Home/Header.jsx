import {
  useState,
} from "react";

import {
  View,
  Pressable,
  TextInput,
  Image,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useTranslation,
} from "react-i18next";

import {
  router,
} from "expo-router";

import AppText from "../AppText";

import i18n, {
  applyRTL,
} from "../../i18n";

import useRTL from "../../hooks/useRTL";

import {
  useShop,
} from "../../context/ShopContext";

export default function Header({
  products = [],
  searchQuery,
  setSearchQuery,
  isScrolled,
}) {
  const { t } =
    useTranslation();

  const {
    isRTL,
    row,
    textAlign,
    writingDirection,
  } = useRTL();

  const {
    favorites,
  } = useShop();

  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  // عدد المنتجات في المفضلة
  const favoritesCount =
    favorites.length;

  const handleLanguageChange =
    async () => {
      const newLanguage =
        isRTL ? "en" : "ar";

      await i18n.changeLanguage(
        newLanguage
      );

      applyRTL(newLanguage);
    };

  const searchResults =
    searchQuery.trim().length > 0
      ? products.filter(
          (product) =>
            product.title
              ?.toLowerCase()
              .includes(
                searchQuery
                  .trim()
                  .toLowerCase()
              )
        )
      : [];

  const handleProductPress =
    (product) => {
      setSearchQuery("");
      setSearchOpen(false);

      router.push({
        pathname:
          "/product/[id]",
        params: {
          id: String(
            product.id
          ),
        },
      });
    };

  const handleSearchToggle =
    () => {
      setSearchOpen(
        (prev) => !prev
      );
    };

  return (
    <View className="px-6 pt-4 pb-2">

      {/* Top Header */}

      <View
        className="items-center justify-between"
        style={{
          flexDirection: row,
        }}
      >

        {/* Store Logo / Brand */}

        <AppText
          weight="bold"
          className="text-[27px] text-black"
        >
          {t("home.store")}
        </AppText>

        {/* Actions */}

        <View
          className="items-center gap-3"
          style={{
            flexDirection: row,
          }}
        >

          {/* Search Icon */}

          {isScrolled && (
            <Pressable
              onPress={
                handleSearchToggle
              }
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center active:opacity-70"
            >
              <Ionicons
                name={
                  searchOpen
                    ? "close"
                    : "search-outline"
                }
                size={19}
                color="#111"
              />
            </Pressable>
          )}

          {/* Language */}

          <Pressable
            onPress={
              handleLanguageChange
            }
            className="px-2 py-1 active:opacity-50"
          >
            <AppText
              weight="semibold"
              className="text-[13px] text-gray-500"
            >
              {isRTL
                ? "EN"
                : "AR"}
            </AppText>
          </Pressable>

          {/* Favorites */}

          <View className="relative">

            <Pressable
              onPress={() =>
                router.push(
                  "/favorites"
                )
              }
              className="w-10 h-10 rounded-full bg-black items-center justify-center active:opacity-80"
            >
              <Ionicons
                name="heart-outline"
                size={20}
                color="#fff"
              />
            </Pressable>

            {/* Favorites Badge */}

            {favoritesCount >
              0 && (
              <View className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-black border-2 border-white items-center justify-center">
                <AppText
                  weight="bold"
                  className="text-white text-[8px]"
                >
                  {favoritesCount >
                  99
                    ? "99+"
                    : favoritesCount}
                </AppText>
              </View>
            )}

          </View>

        </View>
      </View>

      {/* Search Area */}

      {(!isScrolled ||
        searchOpen) && (
        <View className="relative z-50">

          {/* Search Input */}

          <View
            className="mt-6 h-[54px] rounded-2xl border border-gray-200 bg-gray-50 px-4 items-center"
            style={{
              flexDirection: row,
            }}
          >

            <Ionicons
              name="search-outline"
              size={20}
              color="#666"
            />

            <TextInput
              value={
                searchQuery
              }
              onChangeText={
                setSearchQuery
              }
              placeholder={
                isRTL
                  ? "ابحث عن منتج..."
                  : "Search for a product..."
              }
              placeholderTextColor="#999"
              className="flex-1 text-black text-[14px] px-3"
              style={{
                textAlign,
                writingDirection,
              }}
            />

            {searchQuery.length >
              0 && (
              <Pressable
                onPress={() =>
                  setSearchQuery(
                    ""
                  )
                }
                className="w-7 h-7 rounded-full bg-gray-200 items-center justify-center"
              >
                <Ionicons
                  name="close"
                  size={15}
                  color="#555"
                />
              </Pressable>
            )}

          </View>

          {/* Search Dropdown */}

          {searchQuery.trim()
            .length > 0 && (
            <View
              className="absolute left-0 right-0 top-[62px] bg-white rounded-2xl border border-gray-100 overflow-hidden"
              style={{
                shadowColor:
                  "#000",
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity:
                  0.12,
                shadowRadius:
                  18,
                elevation: 8,
              }}
            >

              {/* Results Header */}

              <View
                className="px-4 pt-4 pb-3 items-center justify-between"
                style={{
                  flexDirection: row,
                }}
              >
                <AppText
                  weight="semibold"
                  className="text-black text-[13px]"
                >
                  {isRTL
                    ? "نتائج البحث"
                    : "Search results"}
                </AppText>

                {searchResults.length >
                  0 && (
                  <AppText
                    weight="medium"
                    className="text-gray-400 text-[11px]"
                  >
                    {
                      searchResults.length
                    }{" "}
                    {isRTL
                      ? "منتج"
                      : "products"}
                  </AppText>
                )}
              </View>

              {/* Search Results */}

              {searchResults.length >
              0 ? (
                <View>

                  {searchResults
                    .slice(0, 5)
                    .map(
                      (product) => (
                        <Pressable
                          key={
                            product.id
                          }
                          onPress={() =>
                            handleProductPress(
                              product
                            )
                          }
                          className="px-4 py-3 active:bg-gray-50"
                        >

                          <View
                            className="items-center"
                            style={{
                              flexDirection:
                                row,
                            }}
                          >

                            <View className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden">
                              <Image
                                source={{
                                  uri:
                                    product.thumbnail ||
                                    product.images?.[0],
                                }}
                                className="w-full h-full"
                                resizeMode="cover"
                              />
                            </View>

                            <View className="flex-1 mx-3">

                              <AppText
                                weight="semibold"
                                numberOfLines={
                                  1
                                }
                                className="text-black text-[13px]"
                                style={{
                                  textAlign,
                                  writingDirection,
                                }}
                              >
                                {
                                  product.title
                                }
                              </AppText>

                              <View
                                className="items-center mt-1"
                                style={{
                                  flexDirection:
                                    row,
                                }}
                              >

                                <AppText
                                  weight="bold"
                                  className="text-black text-[12px]"
                                >
                                  $
                                  {
                                    product.price
                                  }
                                </AppText>

                                {product.discountPercentage >
                                  0 && (
                                  <View className="ml-2 px-1.5 py-0.5 rounded-md bg-black">

                                    <AppText
                                      weight="semibold"
                                      className="text-white text-[8px]"
                                    >
                                      -
                                      {Math.round(
                                        product.discountPercentage
                                      )}
                                      %
                                    </AppText>

                                  </View>
                                )}

                              </View>

                            </View>

                            <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">

                              <Ionicons
                                name={
                                  isRTL
                                    ? "chevron-back"
                                    : "chevron-forward"
                                }
                                size={15}
                                color="#777"
                              />

                            </View>

                          </View>

                        </Pressable>
                      )
                    )}

                  {/* View All */}

                  {searchResults.length >
                    5 && (
                    <Pressable
                      onPress={() =>
                        setSearchQuery(
                          searchQuery
                        )
                      }
                      className="mx-4 mt-1 mb-4 h-11 rounded-xl bg-black items-center justify-center active:opacity-80"
                    >

                      <View
                        className="items-center"
                        style={{
                          flexDirection:
                            row,
                        }}
                      >

                        <AppText
                          weight="semibold"
                          className="text-white text-[12px]"
                        >
                          {isRTL
                            ? "عرض كل النتائج"
                            : "View all results"}
                        </AppText>

                        <Ionicons
                          name={
                            isRTL
                              ? "arrow-back"
                              : "arrow-forward"
                          }
                          size={14}
                          color="#fff"
                          style={{
                            marginLeft:
                              isRTL
                                ? 0
                                : 7,
                            marginRight:
                              isRTL
                                ? 7
                                : 0,
                          }}
                        />

                      </View>

                    </Pressable>
                  )}

                </View>
              ) : (

                /* No Results */

                <View className="px-5 py-8 items-center">

                  <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center">

                    <Ionicons
                      name="search-outline"
                      size={20}
                      color="#999"
                    />

                  </View>

                  <AppText
                    weight="semibold"
                    className="text-black text-[13px] mt-3"
                  >
                    {isRTL
                      ? "مفيش منتجات"
                      : "No products found"}
                  </AppText>

                  <AppText
                    weight="regular"
                    className="text-gray-400 text-[11px] mt-1 text-center"
                  >
                    {isRTL
                      ? "جرب البحث باسم منتج مختلف"
                      : "Try searching for something else"}
                  </AppText>

                </View>
              )}

            </View>
          )}

        </View>
      )}

    </View>
  );
}