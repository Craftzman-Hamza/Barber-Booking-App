import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MainButton from '../Components/MainButton';
import Input from '../Components/Input';
import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);
  const [isSelected, setSelection] = useState(false);

  const handleSignUp = () => {
    if (!email) {
      setError('Email required *');
      setValid(false);
      return;
    }
    if (!password || password.trim().length < 6) {
      setError('Weak password, minimum 6 characters');
      setValid(false);
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid Email');
      setValid(false);
      return;
    }
    createUser(email, password);
  };

  const validateEmail = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  };

  const createUser = async (email, password) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response && response.user) {
        Alert.alert('Success ✅', 'Account created successfully');
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          source={require('../Components/Pics/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter Email"
          error={isValid}
          onChangeText={(text) => {
            setError('');
            setEmail(text);
          }}
        />
        <Input
          placeholder="Password (6+ characters)"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.termsText}>
          I have read and agree to the
          <Text style={styles.termsLink}> Terms of Service</Text>
        </Text>
      </View>
      <View style={styles.privacyPolicyContainer}>
        <Text style={styles.privacyPolicyLink}>Privacy Policy</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          title="Register"
          onPress={() => {
            if (!isSelected) {
              Alert.alert(
                'Terms and Services',
                'Please agree to the terms and services',
                [{text: 'Cancel', style: 'cancel'}, {text: 'OK'}],
              );
            } else if (!validateEmail(email)) {
              Alert.alert('Invalid Email', 'Please enter a valid email', [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK'},
              ]);
            } else if (!password) {
              Alert.alert('Empty Fields', 'Please fill in all fields', [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK'},
              ]);
            } else {
              handleSignUp();
            }
          }}
        />
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
    alignItems: 'center',
    marginTop: '15%',
  },
  logo: {
    width: 100,
    height: 130,
    borderRadius: 360,
    alignSelf: 'center',
  },
  inputContainer: {
    marginHorizontal: 15,
    paddingTop: 50,
  },
  errorContainer: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  errorText: {
    color: 'red',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  termsText: {
    fontSize: 16,
  },
  termsLink: {
    color: '#9acee2',
  },
  privacyPolicyContainer: {
    marginHorizontal: 18,
  },
  privacyPolicyLink: {
    fontSize: 16,
    color: '#9acee2',
    marginLeft: 15,
  },
  buttonContainer: {
    paddingTop: 30,
    marginHorizontal: 15,
  },
});

export default SignUpScreen;
