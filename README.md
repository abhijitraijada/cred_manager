# Credentials Manager
Credentials Manager is completley offile application to store and share your credentials like online accounts and credit or debit cards information
## Prerequisites
1. Ionic 4
2. Node JS
3. Cordova

## Installing prerequisites
### Node JS
- Download & install node js from this URL `https://nodejs.org/en/download/`

### Ionic 4
```
npm install -g @ionic/cli
```
### Cordova
```
npm install -g cordova
```

## Setup
2 plugins are used in this project which are needed to be installed
### sqlite
```
npm install @ionic-native/sqlite
ionic cordova plugin add cordova-sqlite-storage
```
### sqlite porter
```
npm install @ionic-native/sqlite-porter
ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter
```

### To run the project
- To run it in the browser
```
ionic serve
```

- To run it in android device
add android platform
```
ionic cordova platform add android
```
- To run in android without live reload
```
ionic cordova run android
```

- To run in android with live reload
```
ionic cordova run android -l
```
