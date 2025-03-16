import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ResultsDetail from './ResultsDetail';
import {useNavigation} from '@react-navigation/native';

const ResultsList = ({title, results}) => {
  const navigation = useNavigation();
  if (!results) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        numColumns={2} // Set number of columns
        columnWrapperStyle={styles.row} // Space them out evenly
        data={results}
        keyExtractor={(result) => result.id.toString()} // Ensure proper keyExtractor
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BarberList', {hair: item});
              }}
              style={styles.touchStyle}>
              <ResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    paddingTop: 5,
    color: 'white',
  },
  touchStyle: {
    backgroundColor: 'white',
    marginBottom: 5,
    elevation: 2,
    borderRadius: 10,
    borderWidth: 1,
  },
  container: {
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  containerHeader: {
    flexDirection: 'row',
  },
  CountStyle: {
    fontSize: 18,
    color: '#CCCCCC',
    paddingTop: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default ResultsList;
