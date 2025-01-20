
# Blossom
Blossom is a mobile app that incentivises users to go outside and stay active in a fun and rewarding way. We wanted to combine health and wellness with sustainability and mindfulness. Many fitness apps focus solely on personal progress, so we thought, why not create something that reflects growth not only in ourselves but also in the world around us? A virtual garden that blossoms through physical exercise was the perfect way to merge physical activity with an interactive and visually rewarding experience.

## Screenshots
![App Screenshot](/assets/screenshot1.png)



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

