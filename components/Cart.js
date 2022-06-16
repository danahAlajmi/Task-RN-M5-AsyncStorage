import { observer, inject } from "mobx-react";
import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import cartStore from "../stores/cartStore";

const Cart = () => {
  const data = cartStore.getItems().slice();
  function Totals() {
    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
        <Text style={styles.lineRight}>$ {cartStore.getTotalPrice()}</Text>
      </View>
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.cartLine}>
        <Text style={styles.lineLeft}>{item.name}</Text>
        <Text style={styles.lineRight}>$ {item.price}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContainer}
        data={data}
        renderItem={renderItem}
        ListFooterComponent={Totals}
      />
      <Button
        title="clear"
        onPress={() => {
          cartStore.clearCart();
        }}
      />
    </View>
  );
};

export default observer(Cart);

const styles = StyleSheet.create({
  cartLine: {
    flexDirection: "row",
  },
  cartLineTotal: {
    flexDirection: "row",
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
  },
  lineTotal: {
    fontWeight: "bold",
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: "#333333",
  },
  lineRight: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
    color: "#333333",
    textAlign: "right",
  },
  itemsList: {
    backgroundColor: "#eeeeee",
  },
  itemsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
