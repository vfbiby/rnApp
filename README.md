# How to run detox test for Android

```
export ANDROID_SDK_ROOT=/Users/wilson/Library/Android/sdk/
yarn detox:build:android
yarn detox:test:android
```

# How to run detox test for iOS

```
yarn detox:build:ios
yarn detox:test:ios
```

# How to run iOS app

```
sudo gem install cocoapods
cd ios && pod install && cd ..
yarn ios
```
