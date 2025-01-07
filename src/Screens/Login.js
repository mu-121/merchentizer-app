import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import storeLogo from '../assets/lockIcon.png';

const LoginScreen = ({ navigation }) => {
  const [companyCode, setCompanyCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // if (!companyCode || !username || !password) {
    //   Alert.alert('Error', 'Please fill in all fields');
    //   return;
    // }
    // Alert.alert('Success', 'Logged in successfully!');
    navigation.navigate('HomePage');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.formContainer}>
      <View style={styles.logoContainer}>
        <Image source={storeLogo} style={styles.logo} />
        <Text style={styles.title}>Let's Sign You In</Text>
      </View>

        {/* Company Code Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Company Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Company Code"
            placeholderTextColor="#999"
            value={companyCode}
            onChangeText={setCompanyCode}
          />
        </View>

        {/* Username Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Merchandising</Text>
        </TouchableOpacity>

        {/* Signup Navigation */}
        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Signup')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E34234',
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    flexDirection:'row'
  },
  logo: {
    height: 50,
    width: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F9FAFC',
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#E34234',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    color: '#E34234',
    fontWeight: 'bold',
    textDecorationLine:'underline'
  },
});

export default LoginScreen;
