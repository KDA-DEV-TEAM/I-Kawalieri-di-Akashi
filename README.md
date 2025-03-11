# APP I KAWALIERI DI AKASHI (EXPO CLI)
npm install -g expo-cli --force
Installare in locale EXPO CLI
Aggiornare e installare le dipendenze
npm install --force

# CONFIGURARE EAS
1.	Installare eas-cli:
npm install -g eas-cli
2.	Accedi a Expo:
eas login
3.	Inizializzare EAS Build nel progetto:
eas init
Questo comando configurerà il file eas.json per la  build.

# ESPORTARE ABB PER TEST
Una volta configurato tutto, puoi generare un APK per Android con EAS Build.
1.	Eseguire il comando per avviare la build per Android:
eas build --platform android
2.	Scaricare l'APK: Dopo aver completato la build, Expo fornirà un link per scaricare l'APK direttamente dal sito expo.dev.
   
# Installare l'APK
Per installare l'APK direttamente su un dispositivo Android per testarlo, oppure caricarlo su Google Play se è destinato alla distribuzione.  
Convertire il file con bundletool (scaricarlo su google) con questo comando:
java -jar bundletool.jar build-apks --bundle=kda.aab --output=kda.apks --mode=universal
Rinominare il file generato in .zip ed estrarre l’apk
Installarlo su device in modalità sviluppatorecon il comando:
adb install nomefile.apk

# ESPORTARE IPA PER TEST
Per generare un file .ipa per iOS con Expo CLI usando EAS Build, eseguire il seguente comando:
eas build --platform ios
Passaggi per generare un .ipa con Expo
1️ Configurare EAS Build
esegui:
eas build:configure
Questo comando crea il file eas.json con i profili di build.

2️ Eseguire la build per iOS
Lanciare il comando:
eas build --platform ios
Questo avvierà la build su EAS Build (nel cloud) e, alla fine, fornirà un link per scaricare il file .ipa.

3️ (Opzionale) Build in modalità locale
Per generare la build sul Mac (serve Xcode installato):
eas build --platform ios --local
⚠️ Nota: Questo funziona solo su macOS, perché Xcode è richiesto per compilare app iOS.

4️ Distribuzione dell'app
•	Per TestFlight/App Store: Usare il comando:
eas submit --platform ios
Questo caricherà automaticamente il .ipa su App Store Connect.
•	Per installazione manuale su iPhone:
o	Scaricare il .ipa dalla build.
o	Usare TestFlight o un tool come ios-deploy per installarlo su un dispositivo fisico.

🔹 Requisiti per la build iOS
✅ Account Apple Developer (a pagamento)
✅ Certificati e provisioning profile (EAS può generarli automaticamente)
✅ Xcode (solo per build locali)

