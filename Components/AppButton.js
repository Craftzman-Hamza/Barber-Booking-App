import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const AppButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    backgroundColor: '#222222', // Darker background color for contrast
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 5, // Adds shadow for elevation
  },
  appButtonText: {
    fontSize: 20,
    color: '#ffcc00', // Button text color
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'notoserif',
  },
});

export default AppButton;
