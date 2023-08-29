import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyState = () => {
  return (
    <View style={styles.emptyStateContainer}>
      <Text>No items to display</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
 
});

export default EmptyState;
