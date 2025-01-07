import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView
} from 'react-native';
import SearchIcon from '../assets/searchIcon.png';
import DateIcon from '../assets/dateIcon.png';
import TimeIcon from '../assets/timeIcon.png';
import {useNavigation} from '@react-navigation/native';
import storeIcon from '../assets/store.jpeg';
const storeData = [
  {id: '1', name: 'Punjab Pharmacy', address: '6th road Rawalpindi'},
  {id: '2', name: 'Shaheen Chemists', address: 'Saddar Rawalpindi'},
  {id: '3', name: 'D-Watson', address: 'Blue Area Islamabad'},
  {id: '4', name: 'Ak-karim Pharmacy', address: 'Gulberg Greens Islamabad'},
  {id: '5', name: 'Punjab Pharmacy', address: '6th road Rawalpindi'},
];

const rejectionReasons = [
    'Owner Not available',
    'Stock Not available',
    'Permanently closed',
    'Temporary closed',
    'Out of city',
    'Address not found',
    'Custom Reason',
  ];
  
const StoreListScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredStores, setFilteredStores] = useState(storeData);
  const [selectedStore, setSelectedStore] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');


  const navigateToSuccessfulStores = () => {
    navigation.navigate('SuccessfullStoreFormScreen');
  };
  return (
    <View style={styles.container}>

      <View style={styles.container_store}>

        <Text style={styles.title}>Successful Stores</Text>
        <Text style={styles.merchertizername}>Muhammad Usman</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  flatlistContainer:
  {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding:20,
    borderRadius:20
  },
  flatlistContainerMain:
  {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  container_store: {
    backgroundColor: '#E34234',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  merchertizername: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '',
  },

});

export default StoreListScreen;
