import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import Carousel from '../Components/Carousel';
import ResultsList from '../Components/ResultsList';
import firestore from '@react-native-firebase/firestore';

const MaleStyleScreen = ({navigation}) => {
  const [hairStyleData, setHairStyleData] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('maleHairStyle')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((documentSnapshot) => ({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        }));
        setHairStyleData(data);
      });

    return () => subscriber(); // Clean up the listener when component unmounts
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.key}
        data={hairStyleData}
        ListHeaderComponent={<Carousel data={hairStyleData} />}
        ListFooterComponent={
          <ResultsList
            results={hairStyleData}
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
});

export default MaleStyleScreen;
