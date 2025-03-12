import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Linking, ActivityIndicator, StyleSheet } from "react-native";
import Header from '../components/Header';  // Importa il componente Header
import NavBar from '../components/NavBar';  // Importa il componente NavBar

const FACEBOOK_GROUP_ID = "ikawalieridiakashi"; // Sostituisci con l'ID del gruppo pubblico
const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"; // Sostituisci con il tuo access token

const fetchFacebookEvents = async () => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_GROUP_ID}/events?fields=id,name,description,start_time,cover&access_token=${ACCESS_TOKEN}`
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Errore nel recupero degli eventi:", error);
    return [];
  }
};

export default function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacebookEvents().then((events) => {
      setEvents(events);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1877F2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      <View style={styles.contentContainer}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              {item.cover && (
                <Image
                  source={{ uri: item.cover.source }}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
              )}
              <Text style={styles.eventTitle}>{item.name}</Text>
              <Text numberOfLines={3} style={styles.eventDescription}>{item.description}</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`https://www.facebook.com/events/${item.id}`)}
                style={styles.viewButton}
              >
                <Text style={styles.viewButtonText}>Vedi su Facebook</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* NavBar */}
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  eventCard: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  eventDescription: {
    marginTop: 5,
    color: "gray",
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: "#1877F2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  viewButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

