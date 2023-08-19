# obs-chat
A Twitch chat viewer with a TTS integrated, made with React for use in OBS or any streaming software capable of using a browser as a source, which, in addition to using the twitch API, uses WebSockets to connect to their IRC server.

## You can use it in two ways...

### Building it

**Prerequisites**: You need to have an account on [Twitch Developers](https://dev.twitch.tv/) to use the console for register an application and get the client ID. Then on the application panel you need to register the allowed URLs to redirect in case of a OAuth login (Always you need to register the URL "http://localhost:5173/" to develop in this repo)

In order to launch or build the App you need to have an .env file like this

```
VITE_CLIENT_ID=dasdpljsadjpojsdiofgbhdfaiuogvb //the client ID given form the Twitch Developres console
VITE_CHANNEL=chrisvdev // only for development if you need to hardcode the channel to watch
VITE_DEFAULT_AVATAR=<some URL o build Path> //to change the default avatar 
VITE_REDIRECT_URI=https://obs-chat.christianvillegas.com/&scope=chat%3Aread //only for build, if you don't give it the default redirect is to http://localhost:5173/&scope=chat%3Aread
```


### Use it

in current build