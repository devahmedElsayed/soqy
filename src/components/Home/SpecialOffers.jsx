import { useEffect, useRef, useState } from "react";
import {
  View,
  Pressable,
  Image,
  Animated,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";
import { useShop } from "../../context/ShopContext";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 48;

export default function SpecialOffers({ products = [] }) {
  const { isRTL, row } = useRTL();

  const {
    favorites,
    toggleFavorite,
  } = useShop();

  const offers = products
    .filter(
      (item) =>
        item.discountPercentage > 0
    )
    .slice(0, 6);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const flatListRef = useRef(null);

  const scrollX = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    if (offers.length <= 1) return;

    const timer = setInterval(() => {
      const next =
        currentIndex ===
        offers.length - 1
          ? 0
          : currentIndex + 1;

      flatListRef.current?.scrollToOffset({
        offset:
          next * CARD_WIDTH,
        animated: true,
      });

      setCurrentIndex(next);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex, offers.length]);

  if (!offers.length) return null;

  const goToSlide = (index) => {
    flatListRef.current?.scrollToOffset({
      offset:
        index * CARD_WIDTH,
      animated: true,
    });

    setCurrentIndex(index);
  };

  const goToProduct = (product) => {
    router.push({
      pathname: "/product/[id]",
      params: {
        id: String(product.id),
      },
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(
      (favorite) =>
        favorite.id === productId
    );
  };

  const renderItem = ({
    item,
    index,
  }) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale =
      scrollX.interpolate({
        inputRange,
        outputRange: [
          0.93,
          1,
          0.93,
        ],
        extrapolate: "clamp",
      });

    const opacity =
      scrollX.interpolate({
        inputRange,
        outputRange: [
          0.65,
          1,
          0.65,
        ],
        extrapolate: "clamp",
      });

    const oldPrice =
      item.price /
      (1 -
        item.discountPercentage /
          100);

    const favorite = isFavorite(
      item.id
    );

    return (
      <Animated.View
        style={{
          width: CARD_WIDTH,
          transform: [
            { scale },
          ],
          opacity,
        }}
      >
        <Pressable className="rounded-[30px] overflow-hidden bg-[#F4EEE5]">

          {/* Image */}
          <View className="h-[285px] bg-[#E9E0D3]">

            <Image
              source={{
                uri:
                  item.images?.[0] ||
                  item.thumbnail,
              }}
              className="w-full h-full"
              resizeMode="cover"
            />

            {/* Discount */}
            <View
              className="absolute top-5 px-4 py-2 rounded-full bg-black"
              style={{
                [isRTL
                  ? "right"
                  : "left"]: 18,
              }}
            >
              <AppText
                weight="bold"
                className="text-white text-[11px]"
              >
                -{Math.round(
                  item.discountPercentage
                )}
                %{" "}
                {isRTL
                  ? "خصم"
                  : "OFF"}
              </AppText>
            </View>

            {/* Wishlist */}
            <Pressable
              onPress={() =>
                toggleFavorite(item)
              }
              className="absolute top-5 w-10 h-10 rounded-full bg-white items-center justify-center active:opacity-70"
              style={{
                [isRTL
                  ? "left"
                  : "right"]: 18,
              }}
            >
              <Ionicons
                name={
                  favorite
                    ? "heart"
                    : "heart-outline"
                }
                size={18}
                color={
                  favorite
                    ? "#e11d48"
                    : "#111"
                }
              />
            </Pressable>

          </View>

          {/* Content */}
          <View className="px-5 py-5">

            {/* Product Name */}
            <AppText
              weight="bold"
              numberOfLines={1}
              className="text-black text-[20px]"
              style={{
                textAlign:
                  isRTL
                    ? "right"
                    : "left",
                writingDirection:
                  isRTL
                    ? "rtl"
                    : "ltr",
              }}
            >
              {item.title}
            </AppText>

            {/* Price + Button */}
            <View
              className="items-center justify-between mt-4"
              style={{
                flexDirection: row,
              }}
            >

              {/* Price */}
              <View
                className="items-center gap-3"
                style={{
                  flexDirection: row,
                }}
              >
                <AppText
                  weight="bold"
                  className="text-black text-[19px]"
                >
                  ${item.price}
                </AppText>

                <AppText
                  weight="regular"
                  className="text-gray-400 text-[12px] line-through"
                >
                  ${oldPrice.toFixed(
                    0
                  )}
                </AppText>
              </View>

              {/* Shop Button */}
              <Pressable
                onPress={() =>
                  goToProduct(item)
                }
                className="h-10 px-5 rounded-full bg-black items-center justify-center active:opacity-80"
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
                    className="text-white text-[11px]"
                  >
                    {isRTL
                      ? "تسوق الآن"
                      : "Shop now"}
                  </AppText>

                  <Ionicons
                    name={
                      isRTL
                        ? "arrow-back"
                        : "arrow-forward"
                    }
                    size={13}
                    color="#fff"
                    style={{
                      marginLeft:
                        isRTL ? 0 : 6,
                      marginRight:
                        isRTL ? 6 : 0,
                    }}
                  />
                </View>
              </Pressable>

            </View>
          </View>

        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View className="mt-12">

      {/* Section Header */}
      <View
        className="px-6"
        style={{
          alignItems:
            isRTL
              ? "flex-end"
              : "flex-start",
        }}
      >
        <AppText
          weight="bold"
          className="text-black text-[24px]"
          style={{
            textAlign:
              isRTL
                ? "right"
                : "left",
            writingDirection:
              isRTL
                ? "rtl"
                : "ltr",
          }}
        >
          {isRTL
            ? "عروض مميزة"
            : "Special Offers"}
        </AppText>

        <AppText
          weight="regular"
          className="text-gray-400 text-[11px] mt-1"
          style={{
            textAlign:
              isRTL
                ? "right"
                : "left",
            writingDirection:
              isRTL
                ? "rtl"
                : "ltr",
          }}
        >
          {isRTL
            ? "خصومات مختارة لك"
            : "Exclusive deals for you"}
        </AppText>
      </View>

      {/* Carousel */}
      <Animated.FlatList
        ref={flatListRef}
        data={offers}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        bounces={false}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 24,
          marginTop: 20,
        }}
        getItemLayout={(
          _,
          index
        ) => ({
          length: CARD_WIDTH,
          offset:
            CARD_WIDTH * index,
          index,
        })}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        onMomentumScrollEnd={(
          event
        ) => {
          const index =
            Math.round(
              event.nativeEvent
                .contentOffset.x /
                CARD_WIDTH
            );

          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      />

      {/* Bottom Navigation */}
      <View className="px-6 mt-5">

        <View
          className="items-center justify-between"
          style={{
            flexDirection: row,
          }}
        >

          {/* Progress */}
          <View
            className="items-center"
            style={{
              flexDirection: row,
            }}
          >
            <AppText
              weight="bold"
              className="text-black text-[12px]"
            >
              {String(
                currentIndex + 1
              ).padStart(2, "0")}
            </AppText>

            <View className="w-14 h-[2px] bg-gray-200 mx-2 overflow-hidden">

              <View
                className="h-full bg-black"
                style={{
                  width: `${
                    ((currentIndex +
                      1) /
                      offers.length) *
                    100
                  }%`,
                }}
              />

            </View>

            <AppText
              weight="medium"
              className="text-gray-400 text-[12px]"
            >
              {String(
                offers.length
              ).padStart(2, "0")}
            </AppText>
          </View>

          {/* Arrows */}
          <View
            className="items-center gap-2"
            style={{
              flexDirection: row,
            }}
          >

            <Pressable
              onPress={() =>
                goToSlide(
                  currentIndex ===
                    0
                    ? offers.length -
                        1
                    : currentIndex -
                        1
                )
              }
              className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center active:opacity-60"
            >
              <Ionicons
                name={
                  isRTL
                    ? "arrow-forward"
                    : "arrow-back"
                }
                size={15}
                color="#111"
              />
            </Pressable>

            <Pressable
              onPress={() =>
                goToSlide(
                  currentIndex ===
                    offers.length -
                      1
                    ? 0
                    : currentIndex + 1
                )
              }
              className="w-10 h-10 rounded-full bg-black items-center justify-center active:opacity-80"
            >
              <Ionicons
                name={
                  isRTL
                    ? "arrow-back"
                    : "arrow-forward"
                }
                size={15}
                color="#fff"
              />
            </Pressable>

          </View>

        </View>

      </View>

    </View>
  );
}