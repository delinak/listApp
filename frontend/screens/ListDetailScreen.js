import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListEntry from '../components/ListEntry';
import { LinearGradient } from 'expo-linear-gradient';

const ListDetailScreen = ({ route, navigation }) => {
  const [newEntryText, setNewEntryText] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [entries, setEntries] = useState([
    // Sample data - replace with actual data from your API
    {
      id: '1',
      name: 'Watch Inception',
      description: 'Christopher Nolan\'s mind-bending thriller',
      completed: true,
      createdAt: new Date(),
    },
    // ... more entries
  ]);

  const handleAddEntry = () => {
    if (!newEntryText.trim()) return;
    
    // Add new entry logic here
    setNewEntryText('');
  };

  const filteredEntries = showCompleted 
    ? entries.filter(entry => entry.completed)
    : entries;

  return (
    <LinearGradient
      colors={['#FF9F45', '#87CEEB']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Movies</Text>
          <Text style={styles.description}>
            My watchlist for movies and TV shows
          </Text>
        </View>
      </View>

      <ScrollView style={styles.entriesContainer}>
        {filteredEntries.map(entry => (
          <ListEntry
            key={entry.id}
            entry={entry}
            onUpdate={(updatedEntry) => {
              // Handle entry update
            }}
            onDelete={(entryId) => {
              // Handle entry deletion
            }}
          />
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.bottomBar}
      >
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => setShowCompleted(!showCompleted)}
        >
          <Icon 
            name={showCompleted ? "favorite" : "favorite-border"} 
            size={24} 
            color={showCompleted ? "#FF4081" : "#666"}
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newEntryText}
            onChangeText={setNewEntryText}
            placeholder="Add new entry..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddEntry}
          >
            <Icon name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  entriesContainer: {
    flex: 1,
    padding: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  heartButton: {
    padding: 8,
    marginRight: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingLeft: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#FF9F45',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default ListDetailScreen; 