import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import BarberResultsDetail from './BarberResultsDetail';
import SearchBar from '../Components/SearchBar';
import {useNavigation} from '@react-navigation/native';

const BarberResultsList = ({results, hair}) => {
  const [term, setTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState(results);
  const [resultBackUp, setResultBackUp] = useState(results);
  const navigation = useNavigation();

  // Set initial results and backup when the component is mounted or when results change
  useEffect(() => {
    setFilteredResults(results);
    setResultBackUp(results);
  }, [results]);

  // Search API to filter results based on the search term
  const searchApi = (searchTerm) => {
    if (searchTerm.length === 0) {
      setFilteredResults(resultBackUp);
    } else {
      const filtered = resultBackUp.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredResults(filtered);
    }
  };

  // Ensure results exist before rendering
  if (!results) {
    console.log('Results are null');
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Search bar to filter results */}
      <SearchBar
        term={term}
        onTermChange={setTerm}
        searchApi={searchApi}
        onTermSubmit={() => searchApi(term)}
      />
      {/* Display the list of barber results */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredResults}
        keyExtractor={(item) => item.id.toString()} // Use a unique ID if available
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.touchStyle}
            onPress={() => {
              navigation.navigate('Form', {
                title: item.name,
                pic: {uri: item.url},
                disc: item.description,
                barberEmail: item.barberEmail,
                address: item.address,
                hair: hair,
              });
            }}>
            <BarberResultsDetail result={item} />
          </TouchableOpacity>
        )}
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
    borderRadius: 4,
    borderWidth: 1,
  },
  container: {
    paddingTop: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default BarberResultsList;
