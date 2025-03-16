import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import MainButton from '../Components/MainButton';
import Input from '../Components/Input';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Form({route, navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [dateandtime, setDateAndTime] = useState('');
  const [email, setEmail] = useState('');
  const {title, pic, address, disc, barberEmail} = route.params;

  const Booking = async () => {
    const uID = await auth().currentUser.uid;
    const data = await firestore().collection('AppointmentReq').doc(uID).get();
    const userEmail = await auth().currentUser.email;
    setEmail(userEmail);

    if (dateandtime === '') {
      Alert.alert('Date and Time missing', 'Please Enter date and time', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK'},
      ]);
      return;
    }

    const appointmentData = {
      address,
      dateandtime,
      email: userEmail,
      barberEmail,
    };

    if (data.exists && dateandtime !== '') {
      await firestore()
        .collection('AppointmentReq')
        .doc(uID)
        .update(appointmentData);
      Alert.alert('Booking Request Sent');
    } else {
      await firestore()
        .collection('AppointmentReq')
        .doc(uID)
        .set(appointmentData);
      Alert.alert('Booking Request Sent');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={pic} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.separator} />
      </View>

      <View style={styles.descriptionContainer}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text>{disc}</Text>
          </ScrollView>
        </SafeAreaView>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>- Date and Time -</Text>
            <Text style={styles.modalSubText}>
              ( MM/DD/YYYY hh:mm Pakistan Standard Time )
            </Text>
            <Input
              placeholder="Enter Date and Time"
              onChangeText={setDateAndTime}
              type="number-pad"
              style={styles.modalInput}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(false);
                Booking();
              }}>
              <Text style={styles.textStyle}>Confirm Booking</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.bookButtonContainer}>
        <MainButton title="BOOK NOW!" onPress={() => setModalVisible(true)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 360,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  address: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  separator: {
    height: 3,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 50,
  },
  descriptionContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#222222',
  },
  textStyle: {
    color: '#ffcc00',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    color: '#555',
  },
  modalInput: {
    textAlign: 'auto',
    marginBottom: 20,
  },
  bookButtonContainer: {
    paddingTop: 20,
    marginHorizontal: 15,
  },
});

export default Form;
