import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const GenderScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi,</Text>
        <Text style={styles.headerText}>Select Your Gender</Text>
      </View>

      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('MaleStyleScreen')}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={require('../Components/Pics/qwe.png')}
          />
          <Text style={styles.optionText}>Male</Text>
        </TouchableOpacity>

        <View style={styles.divider}></View>

        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('FemaleStyleScreen')}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={require('../Components/Pics/zxc.png')}
          />
          <Text style={styles.optionText}>Female</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  selectionContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  optionContainer: {
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 120,
  },
  optionText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  divider: {
    height: 200,
    width: 5,
    backgroundColor: 'black',
  },
});

export default GenderScreen;
