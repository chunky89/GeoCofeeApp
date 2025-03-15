import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase';

export default function AdminScreen() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newStock, setNewStock] = useState('');

  useEffect(() => {
    const unsubscribe = db.collection('menu').onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    });
    return unsubscribe;
  }, []);

  const updateStock = () => {
    if (selectedItem && newStock) {
      db.collection('menu').doc(selectedItem.id).update({
        stock: newStock,
      }).then(() => {
        setSelectedItem(null);
        setNewStock('');
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.menuItem} onPress={() => setSelectedItem(item)}>
            {item.name} - Current Stock: {item.stock}
          </Text>
        )}
      />
      {selectedItem && (
        <View style={styles.form}>
          <TextInput placeholder="New Stock" value={newStock} onChangeText={setNewStock} keyboardType="numeric" />
          <Button title="Update Stock" onPress={updateStock} />
        </View>
      )}
    </View>
  );
}
