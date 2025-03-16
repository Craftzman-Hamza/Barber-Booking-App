import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          We are a team dedicated to providing the best services and experiences
          to our users. Our mission is to make it easier for individuals to find
          the best hair styling services by connecting them with top
          professionals in the industry.
        </Text>
        <Text style={styles.description}>
          We believe in providing high-quality services with a focus on customer
          satisfaction. Our app is designed to help you find the right stylist
          for your needs, book appointments, and enjoy a seamless and
          stress-free experience.
        </Text>
        <Text style={styles.footer}>Thank you for choosing our service!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  content: {
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  footer: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AboutUs;
