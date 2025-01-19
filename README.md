
# Blossom



## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Features

- Light/dark mode based on time
- Live foreground and background location tracking
- Social feature to visit your friend's gardens


## Environment Variables

To run this project there are a couple of things you need to configure:
- Go to `config.ts` and fill in your IPv4 address
- Go to `apiKey.ts` and fill in your OpenWeather API apiKey
- jim do something here.

## Run Locally
In `/backend`, run:

```bash
pip install -r requirements.txt
```

To deploy the backend server `cd` to `/backend/app` and run:

```bash
  python mainApp.py
```

For the front end, first run `npm install`. Go to the Expo page and follow the instructions on the Expo documentation to install. Go to `/frontend` and run:
```bash
    npx expo prebuild --clean
```
```bash
    npx expo run:[android|ios] --device
```
Make sure your phone is plugged into your machine and you should be able to demo!

## Authors

- Andy Li, Jim Gen, Sophie Rao, Steven Huang

