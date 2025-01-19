import { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  ImageSourcePropType,
} from "react-native";
import {
  appBeige,
  header1size,
  header2size,
  textPrimary,
  textSecondary,
} from "../../utilities/themeColors";

const user = {
  name: "Jim",
  collected: 17,
  session: {
    walked: 30,
    time: 150,
    steps: 200,
  },
};

const imageData = [
  { id: '1', uri: require("../../assets/sakuragood.png") },
  { id: '2', uri: require("../../assets/moonflowergood.png") },
  { id: '3', uri: require("../../assets/cactusgood.png") },
];

const imageData2 = [
  { id: '4', uri: require("../../assets/lily.png") },
  { id: '5', uri: require("../../assets/sunflowerbad.png") },
  { id: '6', uri: require("../../assets/flower.png") },
];

const imageData3 = [
  { id: '4', uri: require("../../assets/daisy.png") },
  { id: '5', uri: "https://google.ca" },
  { id: '6', uri: "https://google.ca" },
];

export default function Gacha() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType | null>(null);

  // Handle click event for each image
  const handleImageClick = (id: string, uri: ImageSourcePropType) => {
    console.log("Image clicked:", id);
    openLightbox(uri);
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

  const total = 50;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collection</Text>
      <View style={styles.rectangles}>
        <View style={styles.imageShelf}>
          {imageData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleImageClick(item.id, item.uri)}
            >
              <Image source={item.uri} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.rectangle}></View>
        <View style={styles.imageShelf}>
          {imageData2.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleImageClick(item.id, item.uri)}
            >
              <Image source={item.uri} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.rectangle}></View>
        <View style={styles.imageShelf}>
          {imageData3.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleImageClick(item.id, item.uri)}>
              <Image source={item.uri} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.rectangle}></View>
      </View>

      <Text
        style={{
          fontFamily: "JosefinSans_700Bold",
          fontSize: header2size,
          color: textPrimary,
          marginTop: 20
        }}
      >
        Spring Set
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "JosefinSans_700Bold",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          Total Collected:{" "}
        </Text>
        <Text
          style={{
            fontFamily: "JosefinSans_400Regular",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          {user.collected}/{total}
        </Text>
      </View>

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
            {selectedImage && (
              <Image source={selectedImage} style={styles.modalImage} />
            )}
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
  container: {
    //justifyContent: 'center', //vertical align
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: appBeige,
  },
  shelfTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  rectangles: {
    alignItems: "center",
  },
  rectangle: {
    width: "90%", // Rectangle width
    height: 25, // Rectangle height
    borderRadius: 10,
    backgroundColor: "#7B5A5A", // Blue color for the rectangle
  },
  imageShelf: {
    flexDirection: "row", // Align items horizontally
    flexWrap: "wrap", // Allow wrapping of items when they overflow
    justifyContent: "center", // Center images horizontally
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: "JosefinSans_700Bold",
    fontSize: header1size,
    color: textPrimary,
    textAlign: "center",
  },
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
});
