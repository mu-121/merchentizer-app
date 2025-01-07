import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Animated,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import uploadIcon from '../assets/uploadIcon.png';
import storeIcon from '../assets/storeIcons2.png';
import CameraIcon from '../assets/camaraIcon.png';
const SuccessfulStoreScreen = ({navigation}) => {
  const [region, setRegion] = useState('');
  const [posman, setPosman] = useState('');
  const [checklist, setChecklist] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [locality, setLocality] = useState('');
  const [subLocality, setSubLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [bricksCodeName, setBricksCodeName] = useState('');
  const [popCode, setPopCode] = useState('');
  const [popName, setPopName] = useState('');
  const [popMarketName, setPopMarketName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contact, setContact] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [remarks, setRemarks] = useState('');
  const [storeLogo, setStoreLogo] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [shopFrontImage, setShopFrontImage] = useState(null); // New state for shop front image
  const [storeInsideImage, setStoreInsideImage] = useState(null); // New state for store inside image
  const [storeOutsideImage, setStoreOutsideImage] = useState(null);
  const [storeImages, setStoreImages] = useState([]);
  const [shelfImages, setShelfImages] = useState([]);
  const [focusAnim] = useState(new Animated.Value(1));
  const handleImagePick = async type => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};

        // Handling store images
        if (type === 'storeLogo') setStoreLogo(source.uri);
        if (type === 'shopFront') setShopFrontImage(source.uri);
        if (type === 'storeInside') setStoreInsideImage(source.uri);
        if (type === 'storeOutside') setStoreOutsideImage(source.uri);

        // Handling store images array with a limit of 3
        if (type === 'storeImages') {
          if (storeImages.length < 3) {
            setStoreImages(prevImages => [...prevImages, source.uri]);
          } else {
            Alert.alert(
              'Error',
              'You can upload a maximum of 3 images for the store.',
            );
          }
        }

        // Handling shelf images array with a limit of 6
        if (type === 'shelfImages') {
          if (shelfImages.length < 6) {
            setShelfImages(prevImages => [...prevImages, source.uri]);
          } else {
            Alert.alert(
              'Error',
              'You can upload a maximum of 6 images for the shelf.',
            );
          }
        }
      }
    });
  };

  const fetchLiveLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        Alert.alert(
          'Location Fetched',
          `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`,
        );
      },
      error => {
        Alert.alert('Error', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleSubmit = () => {
    if (!region || !city || !town || !supervisor || !ownerName || !contact) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    Alert.alert('Success', 'Store successfully created!');
  };
  const focusAnimNewAddress = useRef(new Animated.Value(1)).current;
  const focusAnimRemarks = useRef(new Animated.Value(1)).current;
  const focusAnimCity = useRef(new Animated.Value(1)).current;
  const focusAnimTown = useRef(new Animated.Value(1)).current;
  const focusAnimSupervisor = useRef(new Animated.Value(1)).current;
  const focusAnimLocality = useRef(new Animated.Value(1)).current;
  const focusAnimSubLocality = useRef(new Animated.Value(1)).current;
  const focusAnimLandmark = useRef(new Animated.Value(1)).current;
  const focusAnimBricksCodeName = useRef(new Animated.Value(1)).current;
  const focusAnimPopCode = useRef(new Animated.Value(1)).current;
  const focusAnimPopName = useRef(new Animated.Value(1)).current;
  const focusAnimPopMarketName = useRef(new Animated.Value(1)).current;
  const focusAnimOwnerName = useRef(new Animated.Value(1)).current;
  const focusAnimContact = useRef(new Animated.Value(1)).current;
  const focusAnimPosman = useRef(new Animated.Value(1)).current;
  const focusAnimChecklist = useRef(new Animated.Value(1)).current;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.summarycontainer}>
        <Image source={storeIcon} style={styles.storeIcon} />
        <Text style={styles.title}>Store One</Text>
      </View>
      <View style={styles.card}>
        {/* Region */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Region</Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={region}
              onValueChange={itemValue => setRegion(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Select Region" value="" />
              <Picker.Item label="Region 1" value="region1" />
              <Picker.Item label="Region 2" value="region2" />
              <Picker.Item label="Region 3" value="region3" />
            </Picker>
          </View>
        </View>

        {/* City */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimCity}]},
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter City"
              value={city}
              onChangeText={setCity}
              onFocus={() =>
                Animated.spring(focusAnimCity, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimCity, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>

        {/* Town */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Town</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimTown}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Town"
              value={town}
              onChangeText={setTown}
              onFocus={() =>
                Animated.spring(focusAnimTown, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimTown, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>

        {/* Supervisor */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Supervisor</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimSupervisor}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Supervisor"
              value={supervisor}
              onChangeText={setSupervisor}
              onFocus={() =>
                Animated.spring(focusAnimSupervisor, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimSupervisor, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>
        {/* Locality */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Locality</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimLocality}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Locality"
              value={locality}
              onChangeText={setLocality}
              onFocus={() =>
                Animated.spring(focusAnimLocality, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimLocality, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>

        {/* Sub Locality */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sub Locality</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimSubLocality}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Sub Locality"
              value={subLocality}
              onChangeText={setSubLocality}
              onFocus={() =>
                Animated.spring(focusAnimSubLocality, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimSubLocality, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>

        {/* Landmark */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Landmark</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimLandmark}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Landmark"
              value={landmark}
              onChangeText={setLandmark}
              onFocus={() =>
                Animated.spring(focusAnimLandmark, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimLandmark, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>

        {/* Bricks Code Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bricks Code Name</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimBricksCodeName}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Bricks Code Name"
              value={bricksCodeName}
              onChangeText={setBricksCodeName}
              onFocus={() =>
                Animated.spring(focusAnimBricksCodeName, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimBricksCodeName, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>
        {/* Pop Code */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pop Code</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimPopCode}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Pop Code"
              value={popCode}
              onChangeText={setPopCode}
              onFocus={() =>
                Animated.spring(focusAnimPopCode, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimPopCode, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>

        {/* Pop Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pop Name</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimPopName}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Pop Name"
              value={popName}
              onChangeText={setPopName}
              onFocus={() =>
                Animated.spring(focusAnimPopName, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimPopName, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>

        {/* Pop Market Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pop Market Name</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimPopMarketName}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Pop Market Name"
              value={popMarketName}
              onChangeText={setPopMarketName}
              onFocus={() =>
                Animated.spring(focusAnimPopMarketName, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimPopMarketName, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>

        {/* Owner Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Owner Name</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimOwnerName}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Owner Name"
              value={ownerName}
              onChangeText={setOwnerName}
              onFocus={() =>
                Animated.spring(focusAnimOwnerName, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimOwnerName, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>
        {/* Contact */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimContact}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Contact Number"
              value={contact}
              onChangeText={setContact}
              onFocus={() =>
                Animated.spring(focusAnimContact, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimContact, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Posm Deployed</Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={posman}
              onValueChange={itemValue => setPosman(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Select Posm" value="" />
              <Picker.Item label="Counter top" value="region1" />
              <Picker.Item label="Hanger" value="region2" />
              <Picker.Item label="Poster" value="region3" />
              <Picker.Item label="Bunting" value="region4" />
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Store Checklist</Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={checklist}
              onValueChange={itemValue => setChecklist(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Select Checklist" value="" />
              <Picker.Item label="Counter top" value="region1" />
              <Picker.Item label="Hanger" value="region2" />
              <Picker.Item label="Poster" value="region3" />
              <Picker.Item label="Bunting" value="region4" />
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label1}>Shop Facia/Consent Form Pictures</Text>
          
            <View style={styles.iconRow}>
            <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImagePick('storeImages')}>
              <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
              <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImagePick('storeImages')}>
              <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>  <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImagePick('storeImages')}>
              <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
            </View>
        

          <View style={styles.imagePreviewContainer}>
            {storeImages.map((image, index) => (
              <Image
                key={index}
                source={{uri: image}}
                style={styles.imagePreview}
              />
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label1}>Shelf/Posm Pictures</Text>

       
            <View style={styles.iconRow2}>
            <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImagePick('shelfImages')}>
              <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
              <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImagePick('shelfImages')}>
              <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
              <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImagePick('shelfImages')}>
              <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
              <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImagePick('shelfImages')}>
              <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
              <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImagePick('shelfImages')}>
              <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
              <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImagePick('shelfImages')}>
              <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
            </View>
         

          <View style={styles.imagePreviewContainer}>
            {shelfImages.map((image, index) => (
              <Image
                key={index}
                source={{uri: image}}
                style={styles.imagePreview}
              />
            ))}
          </View>
        </View>

        {/* New Address */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Address</Text>
          <Animated.View
            style={[styles.inputWrapper, {transform: [{scale: focusAnim}]}]}>
            <TextInput
              style={styles.input}
              placeholder="Enter New Address"
              value={newAddress}
              onChangeText={setNewAddress}
              onFocus={() =>
                Animated.spring(focusAnim, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnim, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>
        {/* Remarks */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Remarks</Text>
          <Animated.View
            style={[
              styles.inputWrapper,
              {transform: [{scale: focusAnimRemarks}]}, // Apply scaling animation
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Remarks"
              value={remarks}
              onChangeText={setRemarks}
              onFocus={() =>
                Animated.spring(focusAnimRemarks, {
                  toValue: 1.1,
                  useNativeDriver: true,
                }).start()
              }
              onBlur={() =>
                Animated.spring(focusAnimRemarks, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start()
              }
            />
          </Animated.View>
        </View>
       
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Live Location</Text>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={fetchLiveLocation}>
            <Text style={styles.buttonText}>Send Location</Text>
          </TouchableOpacity>
          {latitude && longitude && (
            <Text style={styles.locationText}>
              Latitude: {latitude}, Longitude: {longitude}
            </Text>
          )}
        </View>
        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  card: {
    backgroundColor: '#376db5',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#E34234',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  summarycontainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#7393B3',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 60,
    paddingLeft: 20,
    paddingVertical: 10,
  },
  storeIcon: {
    height: 30,
    width: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: 'transparent',
  },
  label1: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
    color: '#333',
  },
  locationButton: {
    backgroundColor: '#0A1126',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 55,
    paddingHorizontal: 10,
  },
  picker: {
    height: 55,
    width: '100%',
  },
  button: {
    backgroundColor: '#E34234',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  uploadIcon: {
    height: 20,
    width: 20,
  },
  cameraIcon: {
    height: 28,
    width: 34,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 30,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor:'white'
  },
  iconRow2: {
    flexDirection: 'row',
    gap: 30,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor:'white'
  },
  uploadButton: {
    marginVertical: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
  },
  uploadText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  imagePreview: {
    width: 70,
    height: 70,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    marginBottom: 10,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    gap: 20,
    flexWrap:'wrap'
  },
});

export default SuccessfulStoreScreen;
