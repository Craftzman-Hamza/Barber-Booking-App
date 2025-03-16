import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AppButton from '../Components/AppButton';
import MainButton from '../Components/MainButton';
import Input from '../Components/Input';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (email, password) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        Alert.alert('Success ✅', 'Authenticated successfully');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  GoogleSignin.configure({
    webClientId:
      '489675436750-dkdoafensp3o040rga1u03i30ice6smr.apps.googleusercontent.com',
  });

  const handleGoogleSignIn = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error(error.message);
    }
  };

  const validateInputs = () => {
    if (email === '' || password === '') {
      Alert.alert('Input Error', 'Please enter both email and password', [
        {text: 'OK'},
      ]);
    } else {
      handleSignIn(email, password);
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
          onChangeText={setEmail}
          iconName="mail"
        />
        <Input
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={setPassword}
          iconName="lock-closed"
        />
      </View>
      <View style={styles.actionButtons}>
        <AppButton
          title="Register Now"
          onPress={() => navigation.navigate('SignUpScreen')}
        />
        <AppButton title="Forgot Password?" />
      </View>
      <View style={styles.loginButtonContainer}>
        <MainButton title="Log In" onPress={validateInputs} />
      </View>
      <View style={styles.separator}>
        <View style={styles.line}></View>
        <Text style={styles.separatorText}>Log In with</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.googleSignInContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}>
          <Image
            style={styles.googleIcon}
            source={require('../Components/Pics/google.png')}
          />
          <Text style={styles.googleText}>Google</Text>
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
    alignItems: 'center',
    marginTop: '15%',
  },
  logo: {
    width: 180,
    height: 130,
    borderRadius: 360,
    alignSelf: 'center',
  },
  inputContainer: {
    marginHorizontal: 15,
    paddingTop: 50,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loginButtonContainer: {
    paddingTop: 30,
    marginHorizontal: 15,
  },
  separator: {
    paddingTop: 55,
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 120,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 20,
  },
  separatorText: {
    color: '#FDAE1D',
    fontSize: 18,
  },
  googleSignInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    height: 50,
    width: 50,
  },
  googleText: {
    fontSize: 25,
  },
});

export default LoginScreen;
