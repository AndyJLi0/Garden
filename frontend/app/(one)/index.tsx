import {
  ImageSourcePropType,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import RoseBlooming from "../../components/SVGs/Rose/RoseBlooming";
import { useFonts } from "expo-font";
import {
  JosefinSans_400Regular,
  JosefinSans_700Bold,
} from "@expo-google-fonts/josefin-sans";
import { FlatList, StyleSheet, Image } from "react-native";
import {
  appBeige,
  header1size,
  header2size,
  textPrimary,
  textSecondary,
} from "../../utilities/themeColors";
import { convertMinutesToHoursAndMinutes } from "../../utilities/convertMinToHandM";
import { useState } from "react";

export default function Home() {
  useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold,
  });

  const user = {
    name: "Jim",
    session: {
      walked: 4,
      time: 30,
    },
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]); // Using an array of ids for checked items

  const checklistData = [
    { id: "1", text: "Walk 1km" },
    { id: "2", text: "Stay outside for 3 mins" },
    { id: "3", text: "Item 3" },
    { id: "4", text: "Item 4" },
  ];

  // Handle toggle of checklist item
  const toggleCheckItem = (id: string) => {
    if (checkedItems.includes(id)) {
      // If item is already checked, remove it from the checkedItems array
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      // Otherwise, add it to the checkedItems array
      setCheckedItems([...checkedItems, id]);
    }
  };

  const hm = convertMinutesToHoursAndMinutes(user.session.time);
  const flower = <RoseBlooming />;

  const handleImageClick = () => {
    openLightbox();
  };

  // Function to open the modal with the selected image
  const openLightbox = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeLightbox = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View
      style={{
        height: "100%",
        paddingHorizontal: 40,
        paddingTop: 80,
        backgroundColor: appBeige,
      }}
    >
      <Text
        style={{
          fontFamily: "JosefinSans_700Bold",
          fontSize: header1size,
          color: textPrimary,
          textAlign: "center",
        }}
      >
        {user.name}'s Garden
      </Text>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 60,
        }}
      >
        <Image
          style={{
            height: 190,
            width: 190,
            marginBottom: 0,
          }}
          source={require("../../assets/big.png")}
        />
      </View>

      <Text
        style={{
          fontFamily: "JosefinSans_400Regular",
          fontSize: header2size,
          color: textPrimary,
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          marginTop: 0,
        }}
      >
        Cherry Blossom
      </Text>

      <Text
        style={{
          fontFamily: "JosefinSans_700Bold",
          fontSize: header2size,
          color: textPrimary,
        }}
      >
        Today
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "JosefinSans_700Bold",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          Km walked:{" "}
        </Text>
        <Text
          style={{
            fontFamily: "JosefinSans_400Regular",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          {user.session.walked}km
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "JosefinSans_700Bold",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          Time:{" "}
        </Text>
        <Text
          style={{
            fontFamily: "JosefinSans_400Regular",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          {hm.hours}h {hm.minutes}m
        </Text>
      </View>

      <TouchableOpacity onPress={() => handleImageClick()}>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 50,
            padding: 20,
            width: 80,
            marginLeft: 230,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "JosefinSans_700Bold",
              fontSize: header1size,
              color: textPrimary,
              textAlign: "center",
            }}
          >
            T
          </Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="inverted" />

      {/* Lightbox */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeLightbox}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={closeLightbox}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Missions</Text>

            <FlatList
              data={checklistData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => toggleCheckItem(item.id)} // Toggle item check on press
                >
                  {/* Custom visual checkbox (checkmark if item is selected) */}
                  <Text style={styles.checkboxText}>
                    {checkedItems.includes(item.id) ? "✔" : "⭕"}
                  </Text>
                  <Text style={styles.checkboxLabel}>{item.text}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />

            {/* Status Bar - showing how many items are selected */}
            <View style={styles.statusBar}>
              <Text style={styles.statusText}>
                {checkedItems.length} item(s) selected
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeLightbox}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    height: 400,
    width: 300,
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FA9768",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 20,
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  statusBar: {
    backgroundColor: textPrimary,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
