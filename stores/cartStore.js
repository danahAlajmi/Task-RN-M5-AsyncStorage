import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }
  addItem = async (item) => {
    this.items.push(item);
    try {
      const JsonValue = JSON.stringify(this.items);
      await AsyncStorage.setItem("@storeItems", JsonValue);
    } catch (e) {
      console.log(e);
    }
    //
  };

  fetchItems = async () => {
    // return this.items;
    try {
      const JsonValue = await AsyncStorage.getItem("@storeItems");
      JSON.parse(JsonValue) != null
        ? (this.items = JSON.parse(JsonValue))
        : (this.items = []);
    } catch (e) {
      console.log(e);
    }
  };
  clearCart = async () => {
    try {
      await AsyncStorage.removeItem("@storeItems");
      this.items = [];
    } catch (e) {
      console.log(e);
    }
  };
  getItemsCount() {
    return this.items.length;
  }
  getTotalPrice() {
    if (this.items.length === 0) {
      return 0;
    }
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getItems = () => {
    return this.items;
  };
}

const cartStore = new CartStore();
cartStore.fetchItems();
export default cartStore;
