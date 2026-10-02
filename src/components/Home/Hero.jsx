import { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

const { width } = Dimensions.get("window");

const HORIZONTAL_PADDING = 24;
const CARD_WIDTH =
  width - HORIZONTAL_PADDING * 2;

export default function Hero({
  products = [],
}) {
  const { t } = useTranslation();

  const {
    isRTL,
    row,
    textAlign,
    writingDirection,
  } = useRTL();

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const flatListRef = useRef(null);

  const scrollX = useRef(
    new Animated.Value(0)
  ).current;

  const heroProducts =
    products.slice(0, 5);

  /* Auto Slide */

  useEffect(() => {
    if (heroProducts.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex =
        currentIndex >=
        heroProducts.length - 1
          ? 0
          : currentIndex + 1;

      flatListRef.current?.scrollToOffset({
        offset:
          nextIndex * CARD_WIDTH,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 5000);

    return () =>
      clearInterval(timer);
  }, [
    currentIndex,
    heroProducts.length,
  ]);

  if (!heroProducts.length) {
    return null;
  }

  /* Navigation */

  const goToSlide = (index) => {
    flatListRef.current?.scrollToOffset({
      offset: index * CARD_WIDTH,
      animated: true,
    });

    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const nextIndex =
      currentIndex >=
      heroProducts.length - 1
        ? 0
        : currentIndex + 1;

    goToSlide(nextIndex);
  };

  const previousSlide = () => {
    const previousIndex =
      currentIndex <= 0
        ? heroProducts.length - 1
        : currentIndex - 1;

    goToSlide(previousIndex);
  };

  /*
   * --------------------------------
   * Render Product
   * --------------------------------
   */

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
          0.96,
          1,
          0.96,
        ],
        extrapolate: "clamp",
      });

    const opacity =
      scrollX.interpolate({
        inputRange,
        outputRange: [
          0.75,
          1,
          0.75,
        ],
        extrapolate: "clamp",
      });

    return (
      <Animated.View
        style={{
          width: CARD_WIDTH,
          transform: [{ scale }],
          opacity,
        }}
      >
        <View className="h-[275px] rounded-[30px] overflow-hidden bg-[#111]">

          {/* Product Image */}

          <Image
            source={{
              uri:
                item.images?.[0] ||
                item.thumbnail,
            }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />

          {/* Soft Overlay */}

          <View className="absolute inset-0 bg-black/25" />

          {/* Bottom Gradient Effect */}

          <View className="absolute bottom-0 left-0 right-0 h-[155px] bg-black/55" />

          {/* Main Content */}

          <View className="flex-1 justify-between p-6">

            {/* Top Row */}

            <View
              className="items-center justify-between"
              style={{
                flexDirection: row,
              }}
            >
              {/* Collection */}

              <View className="px-3.5 py-2 rounded-full bg-white/15">
                <AppText
                  weight="medium"
                  className="text-white text-[10px]"
                >
                  {t(
                    "home.heroTitle"
                  )}
                </AppText>
              </View>

              {/* Counter */}

              <View className="px-3 py-2 rounded-full bg-black/20">
                <AppText
                  weight="medium"
                  className="text-white text-[10px]"
                >
                  {String(
                    index + 1
                  ).padStart(2, "0")}{" "}
                  /{" "}
                  {String(
                    heroProducts.length
                  ).padStart(2, "0")}
                </AppText>
              </View>
            </View>

            {/* Bottom Content */}

            <View
              style={{
                alignItems: isRTL
                  ? "flex-end"
                  : "flex-start",
              }}
            >
              {/* Product Name */}

              <AppText
                weight="bold"
                numberOfLines={2}
                className="text-white text-[24px] leading-[31px] max-w-[82%]"
                style={{
                  textAlign,
                  writingDirection,
                }}
              >
                {item.title}
              </AppText>

              {/* Description */}

              <AppText
                weight="regular"
                numberOfLines={1}
                className="text-white/70 text-[12px] mt-1 max-w-[80%]"
                style={{
                  textAlign,
                  writingDirection,
                }}
              >
                {t(
                  "home.heroSubtitle"
                )}
              </AppText>

              {/* Price + Button */}

              <View
                className="w-full mt-4 items-center justify-between"
                style={{
                  flexDirection: row,
                }}
              >
                {/* Price */}

                <View>
                  <AppText
                    weight="bold"
                    className="text-white text-[20px]"
                  >
                    ${item.price}
                  </AppText>
                </View>

                {/* Shop Button */}

                <Pressable
                  onPress={() =>
                    router.push({
                      pathname:
                        "/product/[id]",
                      params: {
                        id: item.id,
                      },
                    })
                  }
                  className="h-10 px-5 bg-white rounded-full items-center justify-center active:opacity-80"
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
                      className="text-black text-[12px]"
                    >
                      {t(
                        "home.shopNow"
                      )}
                    </AppText>

                    <Ionicons
                      name={
                        isRTL
                          ? "arrow-back"
                          : "arrow-forward"
                      }
                      size={14}
                      color="#111"
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
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View className="mt-5">

      {/* CAROUSEL */}

      <Animated.FlatList
        ref={flatListRef}
        data={heroProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        bounces={false}
        pagingEnabled={false}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal:
            HORIZONTAL_PADDING,
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
          const offset =
            event.nativeEvent
              .contentOffset.x;

          const index = Math.round(
            offset / CARD_WIDTH
          );

          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      />

      {/* CONTROLS */}

      <View className="px-6 mt-4">
        <View
          className="items-center justify-between"
          style={{
            flexDirection: row,
          }}
        >
          {/* Pagination */}

          <View
            className="items-center gap-2"
            style={{
              flexDirection: row,
            }}
          >
            {heroProducts.map(
              (_, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    goToSlide(index)
                  }
                  className="items-center justify-center"
                >
                  <View
                    className={
                      index ===
                      currentIndex
                        ? "w-6 h-1.5 rounded-full bg-black"
                        : "w-1.5 h-1.5 rounded-full bg-gray-300"
                    }
                  />
                </Pressable>
              )
            )}
          </View>

          {/* Arrows */}

          <View
            className="items-center gap-2"
            style={{
              flexDirection: row,
            }}
          >
            <Pressable
              onPress={
                previousSlide
              }
              className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center active:bg-gray-100"
            >
              <Ionicons
                name={
                  isRTL
                    ? "arrow-forward"
                    : "arrow-back"
                }
                size={16}
                color="#111"
              />
            </Pressable>

            <Pressable
              onPress={nextSlide}
              className="w-10 h-10 rounded-full bg-black items-center justify-center active:opacity-80"
            >
              <Ionicons
                name={
                  isRTL
                    ? "arrow-back"
                    : "arrow-forward"
                }
                size={16}
                color="#fff"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}