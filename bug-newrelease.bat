@echo off
cd %cd%
set "firstdir=%cd%"
echo �Ƴ�ƽ̨�С�����
ionic platform rm android && echo ���ionic-androidƽ̨ && ionic platform add android@5.1.1 && ionic build android --release && echo ���������ܳ� && jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk android.keystore && zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/babuge.apk && echo ����ɹ�!��������˳�.. & pause>null exit 