import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonLoading = ({ loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Skeleton Card */}
      <View style={styles.skeletonCard}>
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonText} />
        <View style={styles.skeletonText} />
        <View style={styles.skeletonText} />
      </View>
      <View style={styles.skeletonCard}>
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonText} />
        <View style={styles.skeletonText} />
        <View style={styles.skeletonText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a semi-transparent background
  },
  skeletonCard: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  skeletonImage: {
    backgroundColor: '#f0f0f0',
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonText: {
    backgroundColor: '#f0f0f0',
    height: 15,
    width: '80%',
    marginBottom: 5,
  },
});

export default SkeletonLoading;
