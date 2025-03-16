import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Noti = () => {
  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const [email, setEmail] = useState(auth().currentUser.email);

  const clearAppointmentData = async () => {
    const snapshot = await firestore()
      .collection('appointmentAnswer')
      .where('userEmail', '==', email)
      .get();

    snapshot.forEach((doc) => doc.ref.delete());
  };

  useEffect(() => {
    const fetchAppointmentData = async () => {
      const snapshot = await firestore()
        .collection('appointmentAnswer')
        .where('userEmail', '==', email)
        .get();

      snapshot.forEach((doc) => {
        setAppointmentStatus(doc.data());
      });
    };

    fetchAppointmentData();
  }, [email]);

  const renderStatusMessage = () => {
    if (!appointmentStatus) {
      return 'No Status Yet';
    }
    return appointmentStatus.Msg;
  };

  const handleClearAppointment = () => {
    console.log(appointmentStatus?.Msg);
    clearAppointmentData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{renderStatusMessage()}</Text>
      <TouchableOpacity
        style={styles.appButtonContainer}
        onPress={handleClearAppointment}>
        <Text style={styles.appButtonText}>Clear Appointment Status</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  appButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
  },
  appButtonText: {
    fontSize: 20,
    color: '#ffcc00',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default Noti;
