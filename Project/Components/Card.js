import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {heightPixel, widthPixel} from './responsive';

const Card = ({val, flipped, onPress, matched}) => {
  const flip = () => {
    onPress();
  };
  return (
    <>
      {matched ? (
        <View style={[styles.cardContainer, styles.cardMatched]} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            flip();
          }}>
          <View style={[styles.cardContainer, flipped && styles.flipped]}>
            {flipped && <Text style={styles.valStyle}>{val}</Text>}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: widthPixel(85),
    height: heightPixel(150),
    borderRadius: 10,
    backgroundColor: '#CB2727',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardMatched: {
    opacity: 0.2,
  },
  flipped: {
    backgroundColor: 'white',
  },
  valStyle: {
    fontSize: heightPixel(50),
    color: 'black',
  },
});

export default Card;
