import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import StandaloneEntry from '../components/StandaloneEntry';
import ListBlock from '../components/ListBlock';
import AddButton from '../components/AddButton';
import AddModal from '../components/AddModal';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [entries, setEntries] = useState([]);
  const [lists, setLists] = useState([]);

  const handleNewItem = (type, item) => {
    if (type === 'entry') {
      setEntries(prevEntries => [item, ...prevEntries]);
    } else {
      setLists(prevLists => [item, ...prevLists]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Standalone Entries Section */}
        <View style={styles.entriesSection}>
          <StandaloneEntry 
            entry={{
              name: 'send email',
              description: 'Send project update to team',
              createdAt: new Date(),
              completed: false,
            }}
          />
          <StandaloneEntry 
            entry={{
              name: 'sign up for classes',
              description: 'Register for next semester',
              createdAt: new Date(),
              completed: false,
            }}
          />
        </View>

        {/* Lists Section */}
        <View style={styles.listsSection}>
          <ListBlock 
            list={{
              name: 'movies',
              entriesCount: 12,
              lastUpdated: new Date('2024-01-10'),
              description: 'Movies to watch',
            }}
            onPress={() => navigation.navigate('ListDetail')}
          />
          {/* Add more ListBlocks */}
        </View>
      </ScrollView>

      <AddButton onPress={() => setModalVisible(true)} />
      <AddModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onSuccess={handleNewItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9F45', // Orange gradient start
  },
  scrollView: {
    flex: 1,
  },
  entriesSection: {
    padding: 16,
    marginTop: 60, // Space for status bar
  },
  listsSection: {
    padding: 16,
  },
});

export default HomeScreen; 