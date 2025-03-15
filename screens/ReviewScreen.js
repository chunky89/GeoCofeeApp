import React, { useState, useEffect} from 'react';
import React,{ Text, TextInput, Button, FlatList, StyleSheet} from 'react-native';
import { auth, db } from '../firebase';

export default function ReviewScreen () {
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setReting] = useState('');

    useEffect(() => {
        const unsubscribe = db.collection('reviews').onSnapshot(snapshot => {
          const fetchedReviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setReviews(fetchedReviews);
        });
        return unsubscribe;
      }, []);
    
      const submitReview = () => {
        if (!rating || !comment) return alert("Fill in both fields!");
        db.collection('reviews').add({
          user: auth.currentUser.email,
          rating: parseInt(rating),
          comment,
        }).then(() => {
          setComment('');
          setRating('');
          alert("Review submitted!");
        });
      };
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>User Reviews</Text>
          <FlatList data={reviews} keyExtractor={item => item.id} renderItem={({ item }) => (
            <Text>{item.user} ⭐ {item.rating}/5: {item.comment}</Text>
          )} />
          <TextInput placeholder="Rating (1-5)" value={rating} onChangeText={setRating} keyboardType="numeric" style={styles.input} />
          <TextInput placeholder="Write a review..." value={comment} onChangeText={setComment} style={styles.input} />
          <Button title="Submit Review" onPress={submitReview} />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, padding: 20 },
      title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
      input: { borderWidth: 1, padding: 10, marginBottom: 10 },
    });