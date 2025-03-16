import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BarberResultsDetail = ({result}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            // Navigate to the barber details screen (you can customize this as needed)
            navigation.navigate('BarberDetails', {barber: result});
          }}>
          <View style={styles.cardContent}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{uri: result.url}}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{result.name}</Text>
              <Text style={styles.location}>Location: {result.address}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  safeAreaView: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#ced3db',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    elevation: 3, // to create a shadow effect
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
});

export default BarberResultsDetail;
