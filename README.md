# AugmentOS-Cloud-Example-App

### Install AugmentOS on your phone

AugmentOS install links: [AugmentOS.org/install](https://AugmentOS.org/install)

### (Easiest way to get started) Set up ngrok

1. `brew install ngrok`

2. Make an ngrok account

3. [Use ngrok to make a static address/URL](https://dashboard.ngrok.com/)

### Register your APP with AugmentOS

<img width="181" alt="image" src="https://github.com/user-attachments/assets/36192c2b-e1ba-423b-90de-47ff8cd91318" />

1. Navigate to [console.AugmentOS.org](https://console.AugmentOS.org/)

2. Click "Sign In", and log in with the same account you're using for AugmentOS

3. Click "Create App"

4. Set a unique package name like `com.yourName.yourAppName`

5. For "Public URL", enter your Ngrok's static URL

### Get your APP running!

1. [Install bun](https://bun.sh/docs/installation)

2. Clone this repo: `git clone git@github.com:AugmentOS-Community/AugmentOS-Cloud-Example-App.git`

3. cd into your repo, then type `bun install`

4. Set up your environment variables:
   * Create a `.env` file in the root directory by copying the example: `cp .env.example .env`
   * Edit the `.env` file with your app details:
     ```
     PORT=3000
     PACKAGE_NAME=com.yourName.yourAppName
     API_KEY=your_api_key_from_console
     ```
   * Make sure the `PACKAGE_NAME` matches what you registered in the AugmentOS Console
   * Get your `API_KEY` from the AugmentOS Developer Console

5. Run your app with `bun run dev`

6. To expose your app to the internet (and thus AugmentOS) with ngrok, run: `ngrok http --url=<YOUR_NGROK_URL_HERE> 3000`
    * `3000` is the port. It must match what is in the app config. If you entered `port: 8080`, use `8080` for ngrok instead.


### Next Steps

Check out the full documentation at [docs.AugmentOS.org](https://docs.augmentos.org/core-concepts)

#### Update your `tpa_config.json`

The `tpa_config.json` file is used to configure your app. It is used to define settings and tools that your app exposes.

#### Subscribing to events

You can listen for transcriptions, translations, and other events within the onSession function.

#### Authenticated Webview

The app can provide an authenticated webview endpoint for users:

- Access the webview at `/webview`
- Authentication is handled automatically for AugmentOS users
- The current AugmentOS user is available at request.authUserId
- Create a web interface that allows users to interact with your app's functionality

#### Tool Calls

Your app can respond to tool calls via `handleToolCall` in your code:

- Define custom tools that can be called by AugmentOS
- Each tool takes specific parameters and returns a result
- Tools can perform operations on your application's data
- Properly handle authentication and validation in your tool implementations

<img width="553" alt="image" src="https://github.com/user-attachments/assets/1650f49a-6561-4341-981e-ed6edbe77b57" />

