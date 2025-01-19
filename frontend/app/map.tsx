import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';

import GetLocation, {
  Location,
  LocationErrorCode,
  isLocationError,
} from 'react-native-get-location';

import { OPEN_WEATHER_API_KEY } from './apiKey'; 
import { parseWeatherResponse , parseLocationResponse} from '../utilities/parseInfo';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  location: {
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginBottom: 8,
  },
});

function App(): JSX.Element {

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<LocationErrorCode | null>(null);

  // NEW: State for weather data
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const requestLocation = () => {
    setLoading(true);
    setLocation(null);
    setError(null);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(newLocation => {
        setLoading(false);
        const parsed = parseLocationResponse(newLocation);
        setLocation(newLocation);
      })
      .catch(ex => {
        if (isLocationError(ex)) {
          const { code, message } = ex;
          console.warn(code, message);
          setError(code);
        } else {
          console.warn(ex);
        }
        setLoading(false);
        setLocation(null);
      });
  };

  // somewhere in spain
  var lat = 41.40338;
  var lon = 2.17403;

  const requestWeather = async () => {
    try {
      setWeatherLoading(true);
      setWeatherData(null);
      setWeatherError(null);
      
      // TRY TO GET COORDS BEFORE WEATHER, IDK IF THIS WORKS
      requestLocation();
      lat = location?.latitude ?? 41.40338;
      lon = location?.longitude ?? 2.17403;

      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      const parsed = parseWeatherResponse(data);
      setWeatherData(parsed);
    } catch (err) {
      console.log('weather fetch error');
      setWeatherError((err as Error).message);
    } finally {
      setWeatherLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>
        To get location, press the button:
      </Text>

      <View style={styles.button}>
        <Button
          disabled={loading}
          title="Get Location"
          onPress={requestLocation}
        />
      </View>

      {loading ? <ActivityIndicator /> : null}
      {location ? (
        <Text style={styles.location}>{JSON.stringify(location, null, 2)}</Text>
      ) : null}
      {error ? <Text style={styles.location}>Error: {error}</Text> : null}

      <Text style={styles.instructions}>Extra functions:</Text>
      <View style={styles.button}>
        <Button
          title="Open App Settings"
          onPress={() => {
            GetLocation.openSettings();
          }}
        />
      </View>

      <View style={styles.button}>
        <Button title="Get Weather" onPress={requestWeather} />
      </View>

      {weatherLoading && <ActivityIndicator />}

      {weatherData && (
        <View style={{marginTop: 10}}>
          <Text>Temperature: {weatherData.temperatureCelsius.toFixed(1)}°C</Text>
          <Text>Date: {weatherData.dayWithMonth}</Text>
        </View>
      )}
      {weatherError && <Text style={styles.location}>Error: {weatherError}</Text>}

      <Text style={styles.instructions}>{instructions}</Text>
    </View>
  );
}

export default App;


// export default function Map() {
//   return (
//     <View style={styles.container}>
//       <Text>Map</Text>
//       <MapView
//         style={styles.map}
//         initialRegion={INITIAL_REGION}
//         showsUserLocation
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   map: {
//     width: '100%',
//     height: '60%',
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
// });

