import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
  appBeige,
  header1size,
  header2size,
  textPrimary,
  textSecondary,
} from "../../utilities/themeColors";
import { AntDesign } from '@expo/vector-icons'; // For the "X" icon
import { Link } from 'expo-router';

const user = {
  name: "Andy",
  profilePic: "",
  session: {
    walked: 30,
    time: 150,
    steps: 200
  },
};

const imageData = [
  { id: '1', uri: require("../../assets/profile.png") },
  { id: '2', uri: require("../../assets/profile.png") },
  { id: '3', uri: require("../../assets/profile.png") },
];

const recordData = [
  { id: '1', uri: require("../../assets/flower.png"), text: "01.19.2025              4km" },
  { id: '2', uri: require("../../assets/flower.png"), text: "12.23.2024              6km" },
  { id: '3', uri: require("../../assets/flower.png"), text: "10.15.2024              3km" },
  { id: '4', uri: require("../../assets/flower.png"), text: "09.03.2024              5km" },
];

export default function Profile() {
  // Handle click event for each image
  const handleImageClick = () => {
    console.log('Image clicked');
  };

  // Edit profile action (just logs for now)
  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    // You can add functionality here to navigate to an edit profile screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1, 
        }} >
        <Link href="../profile">
            <AntDesign name="close" size={30} color="black" />
        </Link>
      </TouchableOpacity>

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
            <TouchableOpacity key={item.id} onPress={() => handleImageClick()}>
              <Link href="../friend">
                <Image source={item.uri} style={styles.image} />
              </Link>
            </TouchableOpacity>
          ))}
        </View>

        {/* Records */}
        <Text style={styles.friendsName}>Records</Text>
        <View style={styles.imageShelf}>
          {recordData.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleImageClick()}>
              <View style={styles.record}>
                <Text style={styles.recordText}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Edit Button */}
        {/* <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity> */}
      </ScrollView>
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
  },
  recordText: {
    fontFamily: "JosefinSans_700Bold",
    fontSize: header2size,
    color: textPrimary,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
    marginLeft: 20,
  },
  scrollViewContent: {
    alignItems: 'center', // Center content inside ScrollView
    paddingTop: 20,       // Optional, adds padding to the top of the ScrollView
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