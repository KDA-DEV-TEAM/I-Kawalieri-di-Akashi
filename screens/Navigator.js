import { GOOGLE_MAPS_API_KEY } from '../config/Key';
import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, Linking, Platform, Dimensions, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Navigator = () => {
  const textInputRef = React.useRef(null);
  const [distance, setDistance] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompassEnabled, setIsCompassEnabled] = useState(false);
  const [heading, setHeading] = useState(0);
  const [locationSubscription, setLocationSubscription] = useState(null);

  useEffect(() => {
    getCurrentLocation();
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const toggleCompass = async () => {
    try {
      if (isCompassEnabled) {
        if (locationSubscription) {
          await locationSubscription.remove();
          setLocationSubscription(null);
        }
        setIsCompassEnabled(false);
        if (mapRef) {
          await mapRef.animateCamera({
            heading: 0,
            pitch: 0,
            center: origin,
            zoom: 15,
            duration: 500
          });
        }
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permesso negato', 'La localizzazione è necessaria per la bussola.');
          return;
        }

        try {
          const subscription = await Location.watchHeadingAsync((headingData) => {
            if (headingData && typeof headingData.trueHeading === 'number') {
              setHeading(headingData.trueHeading);
              if (mapRef) {
                mapRef.animateCamera({
                  heading: headingData.trueHeading,
                  center: origin,
                  pitch: 0,
                  zoom: 18,
                  duration: 0
                });
              }
            }
          });

          setLocationSubscription(subscription);
          setIsCompassEnabled(true);
        } catch (error) {
          console.error('Compass Subscription Error:', error);
          Alert.alert('Errore', 'Impossibile attivare la bussola');
        }
      }
    } catch (error) {
      console.error('Compass Error:', error);
      Alert.alert('Errore', 'Impossibile attivare la bussola');
      setIsCompassEnabled(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permesso negato', 'La localizzazione è necessaria per il funzionamento dell\'app');
        setOrigin({
          latitude: 41.9028,
          longitude: 12.4964
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 15000,
      });

      if (location && location.coords) {
        const currentLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setOrigin(currentLocation);
      } else {
        throw new Error('Posizione non valida');
      }
    } catch (error) {
      console.error('Location Error:', error);
      Alert.alert('Errore', 'Impossibile ottenere la posizione corrente');
      setOrigin({
        latitude: 41.9028,
        longitude: 12.4964
      });
    }
  };

  const getRoute = async (startLoc, destLoc) => {
    try {
      const response = await axios.post(
        'https://routes.googleapis.com/directions/v2:computeRoutes',
        {
          origin: {
            location: {
              latLng: {
                latitude: startLoc.latitude,
                longitude: startLoc.longitude
              }
            }
          },
          destination: {
            location: {
              latLng: {
                latitude: destLoc.latitude,
                longitude: destLoc.longitude
              }
            }
          },
          travelMode: "DRIVE",
          routingPreference: "TRAFFIC_AWARE",
          computeAlternativeRoutes: false,
          routeModifiers: {
            avoidTolls: false,
            avoidHighways: false,
            avoidFerries: false
          },
          languageCode: "it",
          units: "METRIC"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
          }
        }
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];
        setDuration(Math.ceil(route.duration.seconds / 60));
        setDistance((route.distanceMeters / 1000).toFixed(1));
        const arrivalTimeMs = Date.now() + route.duration.seconds * 1000;
        setArrivalTime(new Date(arrivalTimeMs).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }));
        return decodePolyline(route.polyline.encodedPolyline);
      }
      return [];
    } catch (error) {
      console.error('Route Error:', error);
      Alert.alert('Errore', 'Impossibile calcolare il percorso');
      return [];
    }
  };

  const decodePolyline = (encoded) => {
    const points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < encoded.length) {
      let shift = 0, result = 0;
      let byte;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({
        latitude: lat * 1e-5,
        longitude: lng * 1e-5
      });
    }
    return points;
  };

  const searchLocation = async () => {
    if (!searchText.trim()) {
        Alert.alert('Errore', 'Inserisci la destinazione');
        return;
    }

    setIsLoading(true);
    try {
        const currentInput = textInputRef.current;

        if (!origin) {
            await getCurrentLocation();
        }

        if (!origin) {
            Alert.alert('Errore', 'Impossibile ottenere la posizione corrente');
            return;
        }

        const result = await Location.geocodeAsync(searchText);
        if (result.length > 0) {
            const newDestination = {
                latitude: result[0].latitude,
                longitude: result[0].longitude,
            };
            setDestination(newDestination);

            getRoute(origin, newDestination).then(routePoints => {
                setRouteCoordinates(routePoints);

                if (mapRef && routePoints && routePoints.length > 1) {
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            if (mapRef && routePoints && routePoints.length > 1) {
                                mapRef.fitToCoordinates([origin, newDestination], {
                                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                                    animated: true,
                                });
                            }
                        });
                    }, 500);
                }
            });

            if (currentInput) {
                currentInput.focus();
            }
        } else {
            Alert.alert('Errore', 'Indirizzo non trovato');
        }
    } catch (error) {
        console.error('Search Error:', error);
        Alert.alert('Errore', 'Ricerca fallita');
    } finally {
        setIsLoading(false);
    }
  };

  const openGoogleMapsNavigation = () => {
    if (!destination) {
      Alert.alert('Errore', 'Nessuna destinazione selezionata');
      return;
    }

    if (Platform.OS === 'ios') {
      Linking.canOpenURL('comgooglemaps://')
        .then((isInstalled) => {
          if (isInstalled) {
            Linking.openURL(`comgooglemaps://?daddr=${destination.latitude},${destination.longitude}&directionsmode=driving`);
          } else {
            Linking.openURL(`maps://app?daddr=${destination.latitude},${destination.longitude}&dirflg=d`);
          }
        })
        .catch(() => {
          Linking.openURL(`maps://app?daddr=${destination.latitude},${destination.longitude}&dirflg=d`);
        });
    } else {
      Linking.openURL(`google.navigation:q=${destination.latitude},${destination.longitude}`);
    }
  };

  const renderMap = () => {
    if (!origin) {
      return (
        <View style={styles.loadingMapContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

    return (
      <MapView
        ref={setMapRef}
        style={styles.map}
        initialRegion={{
          ...origin,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        userInterfaceStyle="light"
        followsUserLocation={isCompassEnabled}
        rotateEnabled={true}
        showsCompass={!isCompassEnabled}
        loadingEnabled={true}
        heading={typeof heading === 'number' ? heading : 0}
      >
        {destination && (
        <>
          <Marker coordinate={destination}>
            <View style={styles.markerContainer}>
              <Ionicons name="flag" size={34} color="#FF0000" />
            </View>
          </Marker>
          {distance && (
            <Marker
              coordinate={destination}
              anchor={{ x: -0.4, y: 0.5 }}
            >
              <View style={styles.distanceBox}>
                <Text style={styles.distanceText}>{distance} km</Text>
              </View>
            </Marker>
          )}
          {routeCoordinates && routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={3}
              strokeColor="#4A90E2"
              lineDashPattern={[0]}
            />
          )}
        </>
        )}
      </MapView>
    );
  };

  const renderRouteInfo = () => {
    return (
      <View style={styles.overlayContainer}>
        {destination && (
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={openGoogleMapsNavigation}
          >
            <Ionicons name="navigate" size={30} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.compassButton, isCompassEnabled && styles.compassButtonActive]}
          onPress={toggleCompass}
        >
          <Ionicons name="compass" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }} 
      />

      <View style={[styles.searchContainer, { top: headerHeight + 25 }]}>
        <TextInput
          ref={textInputRef}
          style={styles.searchInput}
          placeholder="Inserisci destinazione"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={searchLocation}
          returnKeyType="search"
          clearButtonMode="while-editing"
          editable={!isLoading}
        />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}
      </View>

      <View style={styles.mapContainer}>
        {renderMap()}
      </View>

      {renderRouteInfo()}

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 100,
  },
  searchInput: {
    height: 40,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingMapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
  },
  userMarkerContainer: {
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 999,
  },
  durationContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  durationText: {
    fontSize: 16,
    color: '#000',
  },
  navigationButton: {
    position: 'absolute',
    right: 30,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 3,
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#000',
  },
  distanceBox: {
    backgroundColor: '#FFD700',
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DAA520',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 70,
    marginLeft: 80,
  },
  distanceText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  compassButton: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  compassButtonActive: {
    backgroundColor: '#00FF00',
  },
});

export default Navigator;