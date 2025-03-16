import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator, Text} from 'react-native';
import BarberResultList from '../Components/BarberResultList';
import firestore from '@react-native-firebase/firestore';

const BarberList = ({route}) => {
  const {hair} = route.params;
  const [barberList, setBarber] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(
        (querySnapshot) => {
          const barberList = [];
          querySnapshot.forEach((documentSnapshot) => {
            barberList.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id, // Using Firestore document ID as the key
            });
          });
          setBarber(barberList);
          setLoading(false); // Set loading to false once data is fetched
        },
        (error) => {
          console.error('Error fetching barber data:', error);
          setLoading(false); // Stop loading on error
        },
      );

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#ffcc00" />
      </SafeAreaView>
    );
  }

  if (barberList.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noDataText}>
          No barbers available at the moment.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarberResultList results={barberList} hair={hair} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});

export default BarberList;
