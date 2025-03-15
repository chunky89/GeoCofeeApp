import React, { useEffect, useState } from 'react';
import React, {Text, Image, Button, StyleSheet} from 'react-native';
import { auth, db } from '../firebase';

export default function RewardScreen () {

    const [rewards, setRewards] = useState(0);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
             const unsubscribe = db.collection('users').doc(user.uid).onSnapshot( doc => {
                if(doc.exists) {
                    setRewards(doc.data().rewards || 0);
                }
             });
             return unsubscribe;
        }
    }, []);
}

const reedemRewards = () => {
    if(rewards => 50){
        db.collection('users').doc(user.uid).update({
            rewards: rewards - 50,
        }).then(() =>alert('You have sucessfully reedemed your rewards'));
    } else {
        alert("Not enough points!")
    }
};

return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Rewards: {rewards} Points</Text>
      <Button title="Redeem 50 Points" onPress={redeemRewards} />
    </View>
  );

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
});