import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, } from 'react-native';
import MapView from 'react-native-maps';
import {
  appBeige,
  header1size,
  header2size,
  textPrimary,
  textSecondary,
} from "../../utilities/themeColors";
import { convertMinutesToHoursAndMinutes } from "../../utilities/convertMinToHandM";
import { OPEN_WEATHER_API_KEY } from "./apiKey";
import { parseWeatherResponse, parseLocationResponse } from "../../utilities/parseInfo";
import { addActivities } from "../../utilities/activityFunctions";
import GetLocation from "react-native-get-location";
//import { createUser } from "../utilities/userFunctions";
const user = {
  name: "Jim",
  session: {
    walked: 30,
    time: 150,
    steps: 200
  },
};


// var previouslat = 0;
// var previouslon = 0;

const callDuringRecord = () => {
  //
}


const INITIAL_REGION = {
  latitude: 49.31,
  longitude: -123.2,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005
};


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
  //const hm = convertMinutesToHoursAndMinutes(user.session.time);

  // NEW: State for weather data
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // for timer
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");
  var initTime = new Date();
  let interval: number | null = null; // Explicitly type interval as number | null

  const [distance, setDistance] = useState(0);

  const startActivity = () => {
    // start the timer. starts the periodic location update.
    setStart(true);
    startCountingDistance();
  }

  const startCountingDistance = () => {
    interval = setInterval(() => {
      setDistance((prevDistance) => prevDistance + 2); // Increment distance by 5 every 5 seconds
    }, 2000) as unknown as number; // 5000ms = 5 seconds
  };


  const pauseActivity = () => {
    // pauses the timer. pauses the periodic location update.
    setStart(false);

  }

  const resetDistance = () => {
    setDistance(0);
  }

  const finishActivity = () => {
    // stops timer, saves data to an activity. stops the periodic location update.
    const [minutes, seconds] = time.split(":").map(Number);

    const activityTime = minutes * 60 + seconds;
    const activity = {
      time: activityTime,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      distance: distance,
    };
    addActivities(activity);
    //createUser("bruh", "bruh@email.com");
    resetDistance(); //for new activity
    clearTime();

  }
  // how the timer should look like
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
  // sets time to zero
  const clearTime = () => {
    setTime("00:00:00");
    setCount(0);
  };

  // update timer
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
    }, 16); //10 ms
    return () => clearInterval(id);
  }, [start]);


  // somewhere in spain
  var lat = 41.40338;
  var lon = 2.17403;

  // used to get weather data
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

      <Text style={styles.title}>Map</Text>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation
      />

      <Text
        style={{
          fontFamily: "JosefinSans_700Bold",
          fontSize: header2size,
          color: textPrimary,
        }}
      >
        Today
      </Text>

      {/* <View style={styles.button}>
        <Button title="Get Weather (remove later)" onPress={requestWeather} />
      </View> */}


      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "JosefinSans_700Bold",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          Distance travelled:{" "}
        </Text>
        <Text
          style={{
            fontFamily: "JosefinSans_400Regular",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          {distance}m
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
          {time}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "JosefinSans_700Bold",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          Steps:{" "}
        </Text>
        <Text
          style={{
            fontFamily: "JosefinSans_400Regular",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          {user.session.steps} steps
        </Text>
      </View>


      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 20 }}>
        {/* Start Button */}
        {start ? (
          <TouchableOpacity style={styles.button} onPress={pauseActivity}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={startActivity}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}

        {/* Finish Button */}
        <TouchableOpacity style={[styles.button, styles.finishButton]} onPress={finishActivity}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
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
        height: '55%',
        borderRadius: 20,
        overflow: 'hidden',
    },
    title: {
      fontFamily: "JosefinSans_700Bold",
      fontSize: header1size,
      color: textPrimary,
      textAlign: "center",
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
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 20, // Rounded border
      borderWidth: 2, // Add a border
      borderColor: "#333333", // Match the color of your text
      alignItems: "center",
      flex: 1, // Make buttons take up equal space
      marginHorizontal: 5, // Add spacing between buttons
    },
    startButton: {
      backgroundColor: "transparent", // Keep it transparent to match textSecondary
    },
    finishButton: {
      backgroundColor: "transparent", // Transparent for consistent design
    },
    buttonText: {
      fontFamily: "JosefinSans_700Bold", // Match your text font
      fontSize: 18, // Match header2size
      color: "#333333", // Match textSecondary
    },
});

// import React, { useState } from "react";
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   ActivityIndicator,
// } from "react-native";

// import GetLocation from "react-native-get-location";

// import { OPEN_WEATHER_API_KEY } from "./apiKey";
// import {
//   parseWeatherResponse,
//   parseLocationResponse,
// } from "../utilities/parseInfo";

// const instructions = Platform.select({
//   ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
//   android:
//     "Double tap R on your keyboard to reload,\n" +
//     "Shake or press menu button for dev menu",
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10,
//   },
//   instructions: {
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5,
//   },
//   location: {
//     color: "#333333",
//     marginBottom: 5,
//   },
//   button: {
//     marginBottom: 8,
//   },
// });

// const requestLocation = async () => {
//   const coords = await GetLocation.getCurrentPosition({
//     enableHighAccuracy: true,
//     timeout: 30000,
//     rationale: {
//       title: "Location permission",
//       message: "The app needs the permission to request your location.",
//       buttonPositive: "Ok",
//     },
//   });
//   return parseLocationResponse(coords);
// };

// export default function Map(): JSX.Element {
//   // NEW: State for weather data
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
//   const [weatherError, setWeatherError] = useState<string | null>(null);

//   // somewhere in spain
//   var lat = 41.40338;
//   var lon = 2.17403;

//   const requestWeather = async () => {
//     try {
//       setWeatherLoading(true);
//       setWeatherData(null);
//       setWeatherError(null);

//       // TRY TO GET COORDS BEFORE WEATHER, IDK IF THIS WORKS
//       const parsedCoords = await requestLocation();
//       lat = parsedCoords.latitude ?? 41.40338;
//       lon = parsedCoords.longitude ?? 2.17403;

//       const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`;
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch weather data");
//       }

//       const data = await response.json();
//       const parsed = parseWeatherResponse(data);
//       setWeatherData(parsed);
//     } catch (err) {
//       console.log("weather fetch error");
//       setWeatherError((err as Error).message);
//     } finally {
//       setWeatherLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>Welcome to React Native!</Text>
//       <Text style={styles.instructions}>
//         To get location, press the button:
//       </Text>

//       <View style={styles.button}>
//         <Button
//           disabled={weatherLoading}
//           title="Get Location"
//           onPress={requestLocation}
//         />
//       </View>

//       <Text style={styles.instructions}>Extra functions:</Text>
//       <View style={styles.button}>
//         <Button
//           title="Open App Settings"
//           onPress={() => {
//             GetLocation.openSettings();
//           }}
//         />
//       </View>

//       <View style={styles.button}>
//         <Button title="Get Weather" onPress={requestWeather} />
//       </View>

//       {weatherLoading && <ActivityIndicator />}

//       {weatherData && (
//         <View style={{ marginTop: 10 }}>
//           <Text>
//             Temperature: {weatherData.temperatureCelsius.toFixed(1)}°C
//           </Text>
//           <Text>Date: {weatherData.dayWithMonth}</Text>
//         </View>
//       )}
//       {weatherError && (
//         <Text style={styles.location}>Error: {weatherError}</Text>
//       )}

//       <Text style={styles.instructions}>{instructions}</Text>
//     </View>
//   );
// }