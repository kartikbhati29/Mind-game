import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Card from './Card';
import {heightPixel} from './responsive';
import {cardData} from '../Utils/cardData';
import {shuffle} from '../Utils/shuffle';

const Home = () => {
  const [cardsData, setCardsData] = useState(shuffle(cardData));
  const [pairCount, setPairCount] = useState(0);
  const [match, setMatch] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [prevCardValue, setPrevCardValue] = useState({});

  const cardFlipLogic = data => {
    setPairCount(pairCount + 1);

    const newCardData = cardsData.map(val => {
      return data.id === val.id ? {...val, flipped: !val.flipped} : val;
    });

    setCardsData(newCardData);

    if (pairCount === 2) {
      const updData = cardsData.map(val => {
        return data.id === val.id
          ? {...val, flipped: !val.flipped}
          : {...val, flipped: false};
      });
      setPrevCardValue(data);
      setCardsData(updData);
      setPairCount(1);
    }
  };

  const handleFlip = data => {
    if (pairCount === 0) {
      setPrevCardValue(data);
    }
    cardFlipLogic(data);
    if (pairCount === 1) {
      setAttempt(attempt + 1);
      if (prevCardValue.letter === data.letter) {
        setMatch(match + 1);
        const updatedData = cardsData.map(val => {
          return data.letter === val.letter ||
            prevCardValue.letter === val.letter ||
            data.matched ||
            val.matched
            ? {...val, matched: true}
            : {...val, matched: false};
        });
        setCardsData(updatedData);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.center}>
            <Text style={styles.headingStyle}>Matches</Text>
            <Text style={styles.scoreStyle}>{match}</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.headingStyle}>Attempts</Text>
            <Text style={styles.scoreStyle}>{attempt}</Text>
          </View>
        </View>
        {cardsData.map(data => {
          return (
            <Card
              key={data.id}
              val={data.letter}
              flipped={data.flipped}
              matched={data.matched}
              onPress={() => handleFlip(data)}
            />
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topContainer: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    fontSize: heightPixel(50),
  },
  center: {
    alignItems: 'center',
  },
  headingStyle: {
    fontSize: heightPixel(30),
    color: '#2D82B7',
  },
  scoreStyle: {
    fontSize: heightPixel(50),
    color: 'white',
  },
});

export default Home;
