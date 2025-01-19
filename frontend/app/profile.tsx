import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
  appBeige,
  header1size,
  header2size,
  textPrimary,
  textSecondary,
} from "../utilities/themeColors";
const user = {
  name: "Jim",
  profilePic: "",
  session: {
    walked: 30,
    time: 150,
    steps: 200
  },
};

export default function Profile() {
  // Edit profile action (just logs for now)
  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    // You can add functionality here to navigate to an edit profile screen
  };

  return (
    <View style={styles.container}>
            <Text style={ styles.title }>Profile</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Picture */}
        <View style={styles.profileHeader}>
          <Image source={require("../assets/profile.png")} style={styles.profileImage} />
        </View>

        {/* User Name */}
        <Text style={styles.name}>{user.name}</Text>

        {/* Edit Button
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    //justifyContent: 'center', //vertical align
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: appBeige,
  },
  map: {
      width: '100%',
      height: '60%',
      borderRadius: 20,
      overflow: 'hidden',
  },
  title: {
    fontFamily: "JosefinSans_700Bold",
    fontSize: header1size,
    color: textPrimary,
    textAlign: "center",
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
