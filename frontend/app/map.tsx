import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";

import GetLocation from "react-native-get-location";

import { OPEN_WEATHER_API_KEY } from "./apiKey";
import {
  parseWeatherResponse,
  parseLocationResponse,
} from "../utilities/parseInfo";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  location: {
    color: "#333333",
    marginBottom: 5,
  },
  button: {
    marginBottom: 8,
  },
});

// var previouslat = 0;
// var previouslon = 0;

const callDuringRecord = () => {
  //
}



const requestLocation = async () => {
  const coords = await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 30000,
    rationale: {
      title: "Location permission",
      message: "The app needs the permission to request your location.",
      buttonPositive: "Ok",
    },
  });
  return parseLocationResponse(coords);
};

export default function Map(): JSX.Element {
  // NEW: State for weather data
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // for timer
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");
  var initTime = new Date();


  const startActivity = () => {
    // start the timer. starts the periodic location update.
    setStart(true);
  }
  
  const pauseActivity = () => {
    // pauses the timer. pauses the periodic location update.
    setStart(false);

  }

  const finishActivity = () => {
    // stops timer, saves data to an activity. stops the periodic location update.
    clearTime();
  }
  const showTimer = (ms: number) => {
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");
    const second = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor((ms / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    setTime(
      minute + ":" + second + ":" + milliseconds
    );
  };

  const clearTime = () => {
    setTime("00:00:00");
    setCount(0);
  };

  useEffect(() => {
    if (!start) {
      return;
    }
    var id = setInterval(() => {
      var left = count + (new Date().getTime() - initTime.getTime());
      setCount(left);
      showTimer(left);
      if (left <= 0) {
        setTime("00:00:00:00");
        clearInterval(id);
      }
    }, 10); //10 ms
    return () => clearInterval(id);
  }, [start]);


  // somewhere in spain
  var lat = 41.40338;
  var lon = 2.17403;

  const requestWeather = async () => {
    try {
      setWeatherLoading(true);
      setWeatherData(null);
      setWeatherError(null);

      // TRY TO GET COORDS BEFORE WEATHER, IDK IF THIS WORKS
      const parsedCoords = await requestLocation();
      lat = parsedCoords.latitude ?? 41.40338;
      lon = parsedCoords.longitude ?? 2.17403;

      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      const parsed = parseWeatherResponse(data);
      setWeatherData(parsed);
    } catch (err) {
      console.log("weather fetch error");
      setWeatherError((err as Error).message);
    } finally {
      setWeatherLoading(false);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Map/ Image goes here</Text>

      <View style={styles.button}>
        <Button
          disabled={weatherLoading}
          title="Get Location (remove later)"
          onPress={requestLocation}
        />
      </View>


      <View style={styles.button}>
        <Button
          title="Open Location Settings"
          onPress={() => {
            GetLocation.openSettings();
          }}
        />
      </View>

      <View style={styles.button}>
        <Button title="Get Weather (remove later)" onPress={requestWeather} />
      </View>

      {weatherLoading && <ActivityIndicator />}

      {weatherData && (
        <View style={{ marginTop: 10 }}>
          <Text>
            Temperature: {weatherData.temperatureCelsius.toFixed(1)}°C
          </Text>
          <Text>Date: {weatherData.dayWithMonth}</Text>
        </View>
      )}
      {weatherError && (
        <Text style={styles.location}>Error: {weatherError}</Text>
      )}


      <Text>Time:  {time} </Text>
      <Text>Distance (km): 0.00 </Text>
      <View>
        <Button title="Finish Activity" onPress={finishActivity}></Button>
      </View>

      <View style={styles.button}>
      {start ? (
        <Button
          title="Pause"
          onPress={pauseActivity}
        />
      ) : (
        <Button
          title="Start Activity"
          onPress={startActivity}
        />
      )}
    </View>

    </View>
  );
}
