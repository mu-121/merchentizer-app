import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StoreIcon from '../assets/storeicons.png';
import CameraIcon from '../assets/cameras.png';
import greenStore from '../assets/greenstore.png';
import redStore from '../assets/redStore.png';
import orangeStore from '../assets/orangeStore.png'
const HomeScreen = () => {
    const navigation = useNavigation(); 

    const navigateToSuccessfulStores = () => {
      navigation.navigate('StoreListScreen'); 
    };
    const navigateToNcStores = () => {
        navigation.navigate('NcStoreListScreen');
      };
      const navigateToExistingStores = () => {
        navigation.navigate('ExistingStoreListScreen'); 
      };
      const navigateToRejectedStores = () => {
        navigation.navigate('RejectedStoreListScreen'); 
      };
      const navigateTonewStores = () => {
        navigation.navigate('NewStoreListScreen'); 
      };
      const navigateTooutOfStockStores = () => {
        navigation.navigate('OutOfStockListScreen'); 
      };
  const [storesData, setStoresData] = useState({
    successfulStores: 0,
    ncStores: 0,
    existingStores: 0,
    rejectedByQCStores: 0,
    newStores: 0,
    outOfStocks: 0,
  });

  return (
    <View style={styles.container}>
        <View style={styles.summarycontainer}>
      <Text style={styles.title}>Summary</Text>
      </View>

      <View style={styles.boxContainer}>
      <TouchableOpacity 
          style={[styles.box, styles.successfulStores]} 
          onPress={navigateToSuccessfulStores} // Navigate on press
        >
          <Text style={styles.boxTitle}>Successful Stores</Text>

          <Text style={styles.boxValue}>{storesData.successfulStores}</Text>
          <Image source={StoreIcon} style={styles.storeIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={navigateToNcStores}style={[styles.box, styles.ncStores]}>
          <Text style={styles.boxTitle}>NC Stores</Text>
          <Text style={styles.boxValue}>{storesData.ncStores}</Text>
          <Image source={StoreIcon} style={styles.storeIcon} />
        </TouchableOpacity>

        <TouchableOpacity  onPress={navigateToExistingStores}style={[styles.box, styles.existingStores]}>
          <Text style={styles.boxTitle}>Existing Stores</Text>
          <Text style={styles.boxValue}>{storesData.existingStores}</Text>
          <Image source={CameraIcon} style={styles.storeIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToRejectedStores} style={[styles.box, styles.rejectedByQC]}>
          <Text style={styles.boxTitle}>Rejected by QC Stores</Text>
          <Text style={styles.boxValue}>{storesData.rejectedByQCStores}</Text>
          <Image source={greenStore} style={styles.storeIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateTonewStores}style={[styles.box, styles.newStores]}>
          <Text style={styles.boxTitle}>New Stores</Text>
          <Text style={styles.boxValue}>{storesData.newStores}</Text>
          <Image source={redStore} style={styles.storeIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateTooutOfStockStores} style={[styles.box, styles.outOfStocks]}>
          <Text style={styles.boxTitle}>Out of Stocks</Text>
          <Text style={styles.boxValue}>{storesData.outOfStocks}</Text>
          <Image source={orangeStore} style={styles.storeIcon} />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Store</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Lighter background color
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap:30
  },
  summarycontainer:
  {
   backgroundColor:'#E34234',
   width:330,
   borderRadius:30,
   alignItems:'center',
   justifyContent:'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white', // Darker text for better readability
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins',
    marginTop:20
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  box: {
    width: '48%',
    height: 160,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // Slightly increased elevation for Android shadow
  },
  boxTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    fontFamily: 'Poppins',
  },
  boxValue: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'Poppins',
     marginRight:62
  },
  button: {
    backgroundColor: '#0A1126',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  storeIcon:
  {
   position:'absolute',
   right:0,
   bottom:0
  },
  successfulStores: {
    backgroundColor: '#0096FF', // Green
  },
  ncStores: {
    backgroundColor: '#6495ED', // Blue
  },
  existingStores: {
    backgroundColor: '#E49B0F', // Yellow
  },
  rejectedByQC: {
    backgroundColor:'#00AD83', // Red
  },
  newStores: {
    backgroundColor: '#E34234', // Purple
  },
  outOfStocks: {
    backgroundColor: '#FF7518', // Teal
  },
});

export default HomeScreen;
