import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ShopContext = createContext();

const STORAGE_KEYS = {
  cart: "@souqi_cart",
  favorites: "@souqi_favorites",
  orders: "@souqi_orders",
  addresses: "@souqi_addresses",
};

export function ShopProvider({ children }) {
  // =========================
  // State
  // =========================

  const [cart, setCart] = useState([]);

  const [favorites, setFavorites] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [lastOrder, setLastOrder] =
    useState(null);

  const [addresses, setAddresses] =
    useState([
      {
        id: "1",
        title: "Home",
        address: "Riyadh, Saudi Arabia",
        isDefault: true,
      },
    ]);

  const [isLoaded, setIsLoaded] =
    useState(false);

  // =========================
  // Load Data
  // =========================

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          savedCart,
          savedFavorites,
          savedOrders,
          savedAddresses,
        ] = await Promise.all([
          AsyncStorage.getItem(
            STORAGE_KEYS.cart
          ),

          AsyncStorage.getItem(
            STORAGE_KEYS.favorites
          ),

          AsyncStorage.getItem(
            STORAGE_KEYS.orders
          ),

          AsyncStorage.getItem(
            STORAGE_KEYS.addresses
          ),
        ]);

        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }

        if (savedFavorites) {
          setFavorites(
            JSON.parse(savedFavorites)
          );
        }

        if (savedOrders) {
          setOrders(
            JSON.parse(savedOrders)
          );
        }

        if (savedAddresses) {
          setAddresses(
            JSON.parse(savedAddresses)
          );
        }
      } catch (error) {
        console.log(
          "Error loading shop data:",
          error
        );
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  // =========================
  // Save Cart
  // =========================

  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(
      STORAGE_KEYS.cart,
      JSON.stringify(cart)
    );
  }, [cart, isLoaded]);

  // =========================
  // Save Favorites
  // =========================

  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(
      STORAGE_KEYS.favorites,
      JSON.stringify(favorites)
    );
  }, [favorites, isLoaded]);

  // =========================
  // Save Orders
  // =========================

  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(
      STORAGE_KEYS.orders,
      JSON.stringify(orders)
    );
  }, [orders, isLoaded]);

  // =========================
  // Save Addresses
  // =========================

  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(
      STORAGE_KEYS.addresses,
      JSON.stringify(addresses)
    );
  }, [addresses, isLoaded]);

  // =========================
  // Cart
  // =========================

  const addToCart = (
    product,
    quantity = 1
  ) => {
    setCart((currentCart) => {
      const existingProduct =
        currentCart.find(
          (item) =>
            item.id === product.id
        );

      if (existingProduct) {
        return currentCart.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    quantity,
                }
              : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (
    productId
  ) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.id !== productId
      )
    );
  };

  const updateQuantity = (
    productId,
    quantity
  ) => {
    if (quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // =========================
  // Favorites
  // =========================

  const toggleFavorite = (
    product
  ) => {
    setFavorites(
      (currentFavorites) => {
        const exists =
          currentFavorites.some(
            (item) =>
              item.id === product.id
          );

        if (exists) {
          return currentFavorites.filter(
            (item) =>
              item.id !== product.id
          );
        }

        return [
          ...currentFavorites,
          product,
        ];
      }
    );
  };

  // =========================
  // Orders
  // =========================

  const createOrder = () => {
    if (cart.length === 0) {
      return null;
    }

    const subtotal = cart.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    );

    const shipping =
      subtotal > 100 ? 0 : 10;

    const total =
      subtotal + shipping;

    const defaultAddress =
      addresses.find(
        (item) =>
          item.isDefault
      ) || null;

    const newOrder = {
      id: String(Date.now()),

      date:
        new Date().toISOString(),

      items: cart.map((item) => ({
        ...item,
      })),

      subtotal,

      shipping,

      total,

      status: "pending",

      address: defaultAddress,

      paymentMethod:
        "cash_on_delivery",
    };

    setOrders(
      (currentOrders) => [
        newOrder,
        ...currentOrders,
      ]
    );

    setLastOrder(newOrder);

    setCart([]);

    return newOrder;
  };

  // =========================
  // Addresses
  // =========================

  const addAddress = (
    title,
    address
  ) => {
    if (
      !title?.trim() ||
      !address?.trim()
    ) {
      return;
    }

    const newAddress = {
      id: Date.now().toString(),

      title: title.trim(),

      address: address.trim(),

      isDefault:
        addresses.length === 0,
    };

    setAddresses(
      (currentAddresses) => [
        ...currentAddresses,
        newAddress,
      ]
    );
  };

  const deleteAddress = (
    addressId
  ) => {
    setAddresses(
      (currentAddresses) => {
        const filteredAddresses =
          currentAddresses.filter(
            (item) =>
              item.id !== addressId
          );

        if (
          filteredAddresses.length >
            0 &&
          !filteredAddresses.some(
            (item) =>
              item.isDefault
          )
        ) {
          return filteredAddresses.map(
            (item, index) => ({
              ...item,
              isDefault:
                index === 0,
            })
          );
        }

        return filteredAddresses;
      }
    );
  };

  const setDefaultAddress = (
    addressId
  ) => {
    setAddresses(
      (currentAddresses) =>
        currentAddresses.map(
          (item) => ({
            ...item,
            isDefault:
              item.id === addressId,
          })
        )
    );
  };

  // =========================
  // Context
  // =========================

  return (
    <ShopContext.Provider
      value={{
        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,

        // Favorites
        favorites,
        toggleFavorite,

        // Orders
        orders,
        lastOrder,
        createOrder,

        // Addresses
        addresses,
        addAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}