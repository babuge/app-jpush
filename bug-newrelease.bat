@echo off
cd %cd%
set "firstdir=%cd%"
echo 移除平台中。。。
ionic platform rm android && echo 添加ionic-android平台 && ionic platform add android@5.1.1 && ionic build android --release && echo 请输入打包密匙 && jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk android.keystore && zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/babuge.apk && echo 打包成功!按任意键退出.. & pause>null exit 