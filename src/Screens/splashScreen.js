import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import calpolIcon from '../assets/calpol.png'; 
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
     
      
      <Text style={styles.headerText}>Home</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Retail Button Pressed')}>
        <Text style={styles.buttonText}>Retail. Tech</Text>
      </TouchableOpacity>
      <Image source={calpolIcon} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dc3545', 
    alignItems: 'center',
    justifyContent: 'center',
    gap: 100,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop:50
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,         
    borderColor: '#000',     
    shadowColor: '#654EA3',  
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,      
    shadowRadius: 5,         
    elevation: 6,            
  },
  
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SplashScreen;
