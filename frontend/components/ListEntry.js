import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListEntry = ({ entry, onUpdate, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
    }).start();
  };

  const expandedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [70, 200],
  });

  const handleComplete = () => {
    onUpdate({ ...entry, completed: !entry.completed });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { height: expandedHeight },
        entry.completed && styles.completedContainer,
      ]}
    >
      <TouchableOpacity
        style={styles.mainContent}
        onPress={toggleExpand}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{entry.name}</Text>
          <TouchableOpacity onPress={handleComplete}>
            <Icon 
              name={entry.completed ? "check-circle" : "radio-button-unchecked"} 
              size={24} 
              color={entry.completed ? "#4CAF50" : "#666"}
            />
          </TouchableOpacity>
        </View>

        {expanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.description}>{entry.description}</Text>
            <Text style={styles.date}>
              Created: {new Date(entry.createdAt).toLocaleDateString()}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => onDelete(entry.id)}
              >
                <Icon name="delete" size={20} color="#FF5252" />
                <Text style={[styles.actionText, { color: '#FF5252' }]}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {/* Handle edit */}}
              >
                <Icon name="edit" size={20} color="#2196F3" />
                <Text style={[styles.actionText, { color: '#2196F3' }]}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
    backdropFilter: 'blur(10px)', // Note: This only works on iOS
  },
  completedContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  expandedContent: {
    marginTop: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginLeft: 16,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ListEntry; 