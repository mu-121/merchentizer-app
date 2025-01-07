import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  Image 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import storeLogo from '../assets/storeLogo1.jpg';

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [region, setRegion] = useState('');
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 


  const handleSignup = () => {
    if (!firstName || !lastName || !email || !contactNumber || !region || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    Alert.alert('Success', 'Account created successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image source={storeLogo} style={styles.logo} /> */}
      <Text style={styles.title}>Sign Up</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Contact Number"
          keyboardType="phone-pad"
          value={contactNumber}
          onChangeText={setContactNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Region</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={region}
            onValueChange={(itemValue) => setRegion(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Region" value="" />
            <Picker.Item label="Region 1" value="region1" />
            <Picker.Item label="Region 2" value="region2" />
            <Picker.Item label="Region 3" value="region3" />
          </Picker>
        </View>
      </View>

      
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.loginLink } onPress={() => navigation.navigate('Login')}>Login</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    height: 120,
    width: 120,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
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
  dropdown: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft:8
  },
  picker: {
    height: 52,
    fontSize: 16,

  },
  button: {
    backgroundColor: '#E34234',
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 15,
    fontSize: 14,
    color: '#0A1126',
  },
  loginLink: {
    color: '#E34234',
    fontWeight: 'bold',
    textDecorationLine:'underline'
  },
});

export default SignupScreen;
