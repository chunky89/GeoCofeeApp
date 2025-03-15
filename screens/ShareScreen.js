import React, { useState, useEffect} from 'react';
import React, {View, Text, FlatList, Share} from 'react-native'
import { Button } from 'react-native-web';

export default function ShareScreen () {
    const sharePromotion = async () => {
        try {
            await Share.share({
                message:'I have just just redeemed my reward points',
            });
        } catch (error) {
            alert(error, 'You do not have enough points');
        }
    };

return (
    <View style={styles.container}>
        <Button title='Share on social media'onPress={sharePromotion} />
    </View>
);
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  });
