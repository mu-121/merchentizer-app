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
  ScrollView,
} from 'react-native';
import SearchIcon from '../assets/searchIcon.png';
import profileIcon from '../assets/profileImage.jpg';
import DateIcon from '../assets/dateIcon.png';
import TimeIcon from '../assets/timeIcon.png';
import {useNavigation} from '@react-navigation/native';
import storeIcon from '../assets/store.jpeg';
import StoreIcon1 from '../assets/storeIcons2.png';
import homeIcon1 from '../assets/homeIcon.png';
import logoutIcon from '../assets/logout.png';
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
const tabs = [
  {label: 'Existing Stores', route: 'ExistingStoreListScreen'},
  {label: 'NC Stores', route: 'NcStoreListScreen'},
  {label: 'New Stores', route: 'NewStoreListScreen'},
  {label: 'Successful Stores', route: 'StoreListScreen'},
  {label: 'Rejected Stores', route: 'RejectedStoreListScreen'},
  {label: 'Out Of Stocks', route: 'OutOfStockListScreen'},
];
const ExistingStoresScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredStores, setFilteredStores] = useState(storeData);
  const [selectedStore, setSelectedStore] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [activeStore, setActiveStore] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Existing Stores');
  const [customReason, setCustomReason] = useState('');
  const [hoveredButton, setHoveredButton] = useState(null);
  const handleSearch = text => {
    setSearchText(text);
    const filtered = storeData.filter(store =>
      store.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredStores(filtered);
  };
  const handleStorePress = store => {
    setSelectedStore(store);
    setModalVisible(true);
  };

  const handleAccept = () => {
    setModalVisible(false);
    console.log(`Store ${selectedStore.name} accepted.`);
    navigateToSuccessfulStores();
  };

  const handleReject = () => {
    setModalVisible(false);
    setRejectModalVisible(true);
  };

  const handleConfirmRejection = () => {
    setRejectModalVisible(false);
    const finalReason =
      selectedReason === 'Custom Reason' ? customReason : selectedReason;
    console.log(
      `Store ${selectedStore.name} rejected for reason: ${finalReason}`,
    );
    setSelectedReason('');
    setCustomReason('');
  };
  const handleTabPress = tab => {
    setSelectedTab(tab);
    navigation.navigate(tab.route);
    // Logic to filter or fetch stores based on the selected tab
  };

  const navigateToSuccessfulStores = () => {
    navigation.navigate('existingStoreFormScreen');
  };
  const navigateToStores = () => {
    navigation.navigate('HomeScreen');
  };
  const navigateToHome = () => {
    navigation.navigate('HomePage');
  };
  const navigateToLogout = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.container__inner}>
        <View style={styles.container_store}>
          <Image source={profileIcon} style={styles.profileImage} />
          <Text style={styles.title}>Muhammad Usman</Text>
          <Text style={styles.merchertizername}>Punjab(Rawalpindi)</Text>
        </View>
      </View>
      <View style={styles.searchContainer__main}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <Image source={SearchIcon} style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by store name"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={filteredStores}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              handleStorePress(item);
              setActiveStore(item.id); // Set the active store
            }}
            style={[
              styles.storeCard,
              activeStore === item.id && styles.activeCard, // Apply red border when active
            ]}>
            <View style={styles.storeRow}>
              <Image source={storeIcon} style={styles.storeImage} />
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{item.name}</Text>
                <Text style={styles.storeAddress}>{item.address}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.noResult}>No stores match your search.</Text>
        }
      />
      <View style={styles.buttonContainer}>
        {/* Home Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToHome()}
          onPressIn={() => setHoveredButton('home')}
          onPressOut={() => setHoveredButton(null)}>
          <Image source={homeIcon1} style={styles.storeIcon} />
          <Text
            style={[
              styles.buttonText,
              hoveredButton === 'home' && styles.hoveredText,
            ]}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Stores Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToStores()}
          onPressIn={() => setHoveredButton('stores')}
          onPressOut={() => setHoveredButton(null)}>
          <Image source={StoreIcon1} style={styles.storeIcon} />
          <Text
            style={[
              styles.buttonText,
              hoveredButton === 'stores' && styles.hoveredText,
            ]}>
            Stores
          </Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToLogout()}
          onPressIn={() => setHoveredButton('logout')}
          onPressOut={() => setHoveredButton(null)}>
          <Image source={logoutIcon} style={styles.storeIcon} />
          <Text
            style={[
              styles.buttonText,
              hoveredButton === 'logout' && styles.hoveredText,
            ]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      {/* Modal for Store Actions */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Stock Available or Not</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.acceptButton]}
                onPress={handleAccept}>
                <Text style={styles.buttonText}>Available</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.rejectButton]}
                onPress={handleReject}>
                <Text style={styles.buttonText}>Not Available</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Rejection Reasons */}
      <Modal visible={rejectModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Rejection Reason</Text>
            <ScrollView>
              {rejectionReasons.map(reason => (
                <TouchableOpacity
                  key={reason}
                  style={[
                    styles.reasonItem,
                    selectedReason === reason && styles.reasonItemSelected,
                  ]}
                  onPress={() => setSelectedReason(reason)}>
                  <Text style={styles.reasonText}>{reason}</Text>
                </TouchableOpacity>
              ))}
              {selectedReason === 'Custom Reason' && (
                <TextInput
                  style={styles.customInput}
                  placeholder="Enter custom reason"
                  value={customReason}
                  onChangeText={setCustomReason}
                />
              )}
            </ScrollView>
            <TouchableOpacity
              style={[
                styles.confirmButton, // New class name
                !selectedReason ||
                (selectedReason === 'Custom Reason' && !customReason)
                  ? styles.confirmButtonDisabled // Disabled state styling
                  : null,
              ]}
              onPress={handleConfirmRejection}
              disabled={
                !selectedReason ||
                (selectedReason === 'Custom Reason' && !customReason)
              }>
              <Text style={styles.confirmButtonText}>Confirm</Text>{' '}
              {/* Updated class name */}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    gap: 0,
  },
  container__inner: {
    backgroundColor: '#E34234',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: 0,
    borderRadius: 20,
  },
  flatlistContainerMain: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    paddingLeft: 20,
    paddingRight: 20,
  },
  container_store: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    borderRadius: 20,
    marginBottom: 20,
    top: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  merchertizername: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  profileImage: {
    borderRadius: 50,
    height: 60,
    width: 60,
    position: 'absolute',
    transform: [{translateX: 0}, {translateY: -75}],
  },
  searchContainer__main: {
    padding: 20,
    marginTop: 60,
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
  storeCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: 'white',
  },
  storeCardHovered: {
    backgroundColor: '#CCCCFF',
  },

  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 5,
  },
  storeAddress: {
    fontSize: 14,
    color: 'black',
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
    marginTop: 5,
  },
  hoveredText: {
    color: '#E34234',
  },
  storeIcon: {
    height: 30,
    width: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalValue: {
    fontSize: 16,
    color: '#555',
  },
  reasonItem: {padding: 10, borderBottomWidth: 1, borderColor: '#ccc'},
  reasonItemSelected: {backgroundColor: '#ddd'},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'green',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  confirmButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },

  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
    gap: 10,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tab: {
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 5,
    paddingRight: 10,
    width: 96,
  },
  tabActive: {
    backgroundColor: '#E34234',
  },
  tabText: {
    fontSize: 10,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  tabTextActive: {
    color: 'white',
  },
  footer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    gap: 70,
  },
  button: {
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
    marginTop: 5,
  },
  hoveredText: {
    color: '#E34234',
  },
  storeIcon: {
    height: 26,
    width: 26,
  },
});

export default ExistingStoresScreen;
