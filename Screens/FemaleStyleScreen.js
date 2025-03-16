import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import Carousel from '../Components/Carousel';
import ResultsList from '../Components/ResultsList';
import firestore from '@react-native-firebase/firestore';

const FemaleStyleScreen = ({navigation}) => {
  const [hairStyleDataArr, setHairStyleDataArr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('femaleHairStyles')
      .onSnapshot(
        (querySnapshot) => {
          const hairStyleDataArr = [];
          querySnapshot.forEach((documentSnapshot) => {
            hairStyleDataArr.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id, // Use Firestore document ID as the key
            });
          });
          setHairStyleDataArr(hairStyleDataArr);
          setLoading(false); // Data is loaded, stop the loading indicator
        },
        (error) => {
          console.error('Error fetching data: ', error);
          setLoading(false);
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

  if (hairStyleDataArr.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noDataText}>
          No styles available at the moment.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.key} // Use document ID as key
        data={hairStyleDataArr}
        ListHeaderComponent={<Carousel data={hairStyleDataArr} />}
        ListFooterComponent={
          <ResultsList
            results={hairStyleDataArr}
            navigation={navigation}
            title="Latest"
          />
        }
      />
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

export default FemaleStyleScreen;
