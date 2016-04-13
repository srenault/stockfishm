# stockfishm

Stockfishm is a cordova application that demonstrate how to use the [cordova stockfish plugin](https://github.com/veloce/cordova-plugin-stockfish).

## Requirements

* [node](http://nodejs.org) v4.2.x
* [gulp](http://gulpjs.com/) version 3.9.x
* [tarifa](http://tarifa.tools) version 0.16.x

**Android:**

* the [android SDK](http://developer.android.com/sdk/index.html)
* [SDK packages](http://developer.android.com/sdk/installing/adding-packages.html) API 23
* last version of Android SDK tools and platform tools
* make sure the `sdk/tools/` directory is in your path, so you can use `android`
  command everywhere.
* [ndk](http://developer.android.com/tools/sdk/ndk/index.html)

**iOS:**

* OS X and [Xcode](https://developer.apple.com/xcode/download/) version 7.x

## Init project after checkout

```
tarifa check --force
```

This will recreate the cordova folder with android and iOS platforms and also
install plugins.

## Install all web app dependencies

```
cd project
npm install
```

## Build android

Build the native code using:

```
ndk-build -C app/platforms/android
```

Build the apk using:

```
tarifa build android
```

## Build IOS

Through XCode, in the build settings menu:
  * Set `C++ Language Dialect` option to `C++11` value.
  * Set `C++ Standard Library` option to `lib++` value.

Finally, build the ios app using:

```
tarifa build ios
```
