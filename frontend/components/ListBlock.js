import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListBlock = ({ list, onPress }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity 
      style={[styles.container, expanded && styles.expandedContainer]}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{list.name}</Text>
        <TouchableOpacity onPress={onPress}>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.metadata}>
        <Text style={styles.count}>{list.entriesCount} items</Text>
        <Text style={styles.date}>
          {new Date(list.lastUpdated).toLocaleDateString()}
        </Text>
      </View>

      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.description}>{list.description}</Text>
          {/* Preview of entries could be added here */}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expandedContainer: {
    minHeight: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  expandedContent: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default ListBlock; 