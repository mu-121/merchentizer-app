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
  {id: '1', name: 'Store One', address: '123 Main St, City A'},
  {id: '2', name: 'Store Two', address: '456 High St, City B'},
  {id: '3', name: 'Store Three', address: '789 Park Ave, City C'},
  {id: '4', name: 'Store Four', address: '321 Maple Rd, City D'},
  {id: '5', name: 'Store Five', address: '654 Oak St, City E'},
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
  
const ExistingStoreScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredStores, setFilteredStores] = useState(storeData);
  const [selectedStore, setSelectedStore] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const handleSearch = text => {
    setSearchText(text);
    const filtered = storeData.filter(store =>
      store.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredStores(filtered);
  };
  const handleStorePress = (store) => {
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
    const finalReason = selectedReason === 'Custom Reason' ? customReason : selectedReason;
    console.log(`Store ${selectedStore.name} rejected for reason: ${finalReason}`);
    setSelectedReason('');
    setCustomReason('');
  };


  const navigateToSuccessfulStores = () => {
    navigation.navigate('existingStoreFormScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.container_store}>
        <Text style={styles.title}>Existing Stores</Text>
        <Text style={styles.merchertizername}>Jimmy Carter</Text>
        <View style={styles.footerContainer}>
          <View style={styles.infoRow}>
            <Image source={DateIcon} style={styles.infoIcon} />
            <Text style={styles.infoText}> 2024-08-15</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={TimeIcon} style={styles.infoIcon} />
            <Text style={styles.infoText}>10:00 AM</Text>
          </View>
        </View>
        {/* Search Bar */}
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleStorePress(item)}
            style={styles.storeCard}
          >
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

      {/* Modal for Store Actions */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Stock Available or Not</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.acceptButton]}
                onPress={handleAccept}
              >
                <Text style={styles.buttonText}>Available</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.rejectButton]}
                onPress={handleReject}
              >
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
            onPress={() => setSelectedReason(reason)}
          >
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
          !selectedReason || (selectedReason === 'Custom Reason' && !customReason)
            ? styles.confirmButtonDisabled // Disabled state styling
            : null,
        ]}
        onPress={handleConfirmRejection}
        disabled={!selectedReason || (selectedReason === 'Custom Reason' && !customReason)}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text> {/* Updated class name */}
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
    backgroundColor: 'white',
    padding: 20,
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
    color: 'black',
  },
  merchertizername: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
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
  listContainer: {
    paddingBottom: 20,
  },
  storeCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    color: '#333',
    marginBottom: 5,
  },
  storeAddress: {
    fontSize: 14,
    color: '#555',
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 0,
  },
  infoRow: {
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    padding: 5,
    marginBottom: 20,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: 'w',
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
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
  reasonItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  reasonItemSelected: { backgroundColor: '#ddd' },
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
    backgroundColor:'green'
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
    justifyContent:'center',
    height:40
  },
  buttonText:
{
    color: 'black',
    fontSize: 16,

},

  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default ExistingStoreScreen;
