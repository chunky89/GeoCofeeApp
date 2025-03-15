// screens/MenuScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { db } from '../firebase';

export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Example: listen to menu updates in Firestore
    const unsubscribe = db.collection('menu').onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Optionally include an image for each item */}
            <Text style={styles.title}>{item.name}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Stock: {item.stock}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  title: { fontSize: 18 },
});
