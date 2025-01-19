export function parseWeatherResponse(data: any) {

    const kelvinTemp = data.current?.temp ?? 0; 
    const celsiusTemp = kelvinTemp - 273.15;

    const now = new Date();
    const dayWithMonth = now.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  
    return {
      temperatureCelsius: celsiusTemp,
      dayWithMonth: dayWithMonth,
    };
  }

export function parseLocationResponse(data: any) {
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      speed: data.speed,
    };
  }