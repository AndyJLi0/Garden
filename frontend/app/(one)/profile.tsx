import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
  appBeige,
  header1size,
  header2size,
  textPrimary,
} from "../../utilities/themeColors";
import { Link } from 'expo-router';
import { Modal } from 'react-native';
const user = {
  name: "Jim",
  profilePic: "",
  session: {
    walked: 30,
    time: 150,
    steps: 200
  },
};
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react'
import { ImageSourcePropType } from 'react-native';
import { getActivities } from '../../utilities/activityFunctions';

const imageData = [
  { id: '1', uri: require("../../assets/profile.png") },
  { id: '2', uri: require("../../assets/profile.png") },
  { id: '3', uri: require("../../assets/profile.png") },
];

const recordData = [
  { id: '1', uri: require("../../assets/ss1.png"), text: "01.19.2025           0.02km" },
  { id: '2', uri: require("../../assets/ss2.png"), text: "12.23.2024              1km" },
  { id: '3', uri: require("../../assets/flower.png"), text: "10.15.2024              3km" },
  { id: '4', uri: require("../../assets/flower.png"), text: "09.03.2024              5km" },
];

type Activity = {
  time: number;
  date: string;
  distance: number;
  id: number;
}

export default function Profile() {
  // Edit profile action (just logs for now)
  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    // You can add functionality here to navigate to an edit profile screen
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Handle click event for each image
  const handleImageClick = (uri: ImageSourcePropType) => {
    openLightbox(uri)
  };

  // Function to open the modal with the selected image
  const openLightbox = (uri: ImageSourcePropType) => {
    setSelectedImage(uri);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeLightbox = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  // Function to handle fetching and setting activities
  const fetchActivities = async () => {
    try {
      const data = await getActivities(); // ACITIVTY[]
      setActivities(data); // Update state with the fetched activities
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]); // Ensure activities is always an array, even on error
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Profile</Text>
        {/* Profile Picture */}
        <View style={styles.profileHeader}>
          <Image source={require("../../assets/profile.png")} style={styles.profileImage} />
        </View>

        {/* User Name */}
        <Text style={styles.name}>{user.name}</Text>

        {/* Friends */}
        <Text style={styles.friendsName}>Friends</Text>
        <View style={styles.imageShelf}>
          {imageData.map((item) => (
            <TouchableOpacity key={item.id}>
              <Link href="../friend">
                <Image source={item.uri} style={styles.image} />
              </Link>
            </TouchableOpacity>
          ))}
        </View>

        {/* records in formate time as numebr, date as string, distance as number */}
        {/* Records */}
        <Text style={styles.friendsName}>Records</Text>

        <View style={styles.imageShelf}>
          {activities.map((item) => (
            <TouchableOpacity key={item.id}>
              <View style={styles.record}>
                <Text style={styles.recordText}>ID: {item.id}</Text>
                <Text style={styles.recordText}>Time: {item.time}s</Text>
                <Text style={styles.recordText}>Date: {item.date}</Text>
                <Text style={styles.recordText}>Distance: {item.distance} meters</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Edit Button */}
        {/* <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity> */}
      </ScrollView>

      {/* Lightbox */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeLightbox}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={closeLightbox}>
          <View style={styles.modalContent}>
            {selectedImage && (
              <Image source={selectedImage} style={styles.modalImage} />
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeLightbox}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                      // Ensures the container takes up the full screen
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: appBeige,
    paddingTop: 80,
    paddingBottom: 80,
  },
  title: {
    fontFamily: "JosefinSans_700Bold",
    fontSize: header1size,
    color: textPrimary,
    textAlign: "center",
    marginVertical: 20,
  },
  profileHeader: {
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontFamily: "JosefinSans_700Bold",
    fontSize: header2size,
    color: textPrimary,
  },
  friendsName: {
    fontFamily: "JosefinSans_400Regular",
    fontSize: header2size,
    color: textPrimary,
    marginTop: 20,
  },
  imageShelf: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  record: {
    backgroundColor: "#FFFFFF",
    width: 320,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
  },
  recordText: {
    fontFamily: "JosefinSans_700Bold",
    fontSize: 16,
    color: textPrimary,
    justifyContent: "center",
    alignContent: "center",
    // marginTop: 30,
    // marginLeft: 20,

  },
  scrollViewContent: {
    alignItems: 'center', // Center content inside ScrollView
    paddingTop: 20,       // Optional, adds padding to the top of the ScrollView
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FA9768",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // editButton: {
  //   backgroundColor: '#3498db',
  //   paddingVertical: 10,
  //   paddingHorizontal: 30,
  //   borderRadius: 5,
  //   marginTop: 20,
  // },
  // editButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});