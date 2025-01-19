import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity, StatusBar } from 'react-native';

const imageData = [
  { id: '1', uri: 'https://via.placeholder.com/150' },
  { id: '2', uri: 'https://via.placeholder.com/150' },
  { id: '3', uri: 'https://via.placeholder.com/150' },
];

const imageData2 = [
  { id: '4', uri: 'https://via.placeholder.com/150' },
  { id: '5', uri: 'https://via.placeholder.com/150' },
  { id: '6', uri: 'https://via.placeholder.com/150' },
];

export default function Gacha() {
  // Handle click event for each image
  const handleImageClick = (id: string) => {
    console.log('Image clicked:', id);
  };

  return (
    <View style={styles.container}>
      <Text>Collection</Text>
      <View style={styles.imageShelf}>
        {imageData.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleImageClick(item.id)}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.rectangle}></View>
      <View style={styles.imageShelf}>
        {imageData2.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleImageClick(item.id)}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.rectangle}></View>
      <View style={styles.imageShelf}>
        {imageData.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleImageClick(item.id)}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.rectangle}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center', //vertical align
    alignItems: 'center',
  },
  shelfTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rectangle: {
    width: '90%',       // Rectangle width
    height: 25,      // Rectangle height
    borderRadius: 10,
    backgroundColor: '#7B5A5A', // Blue color for the rectangle
  },
  imageShelf: {
    flexDirection: 'row',      // Align items horizontally
    flexWrap: 'wrap',          // Allow wrapping of items when they overflow
    justifyContent: 'center',  // Center images horizontally
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,                // Add space between images
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
