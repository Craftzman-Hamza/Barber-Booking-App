import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import CarouselItem from './CarouselItem';

const {width, height} = Dimensions.get('window');

const Carousel = ({data}) => {
  const scrollX = new Animated.Value(0);
  const flatListRef = useRef(null);

  const [dataList, setDataList] = useState(data);

  // Infinite scroll functionality
  const scrollToNext = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: (Math.floor(scrollX._value / width) + 1) % dataList.length, // Cycle back to 0 when end is reached
        animated: true,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(scrollToNext, 3000); // Scroll every 3 seconds
    return () => clearInterval(interval); // Clean up on component unmount
  }, [scrollX, dataList]);

  // When the FlatList scrolls, update the scrollX value
  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  if (data) {
    return (
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={dataList}
          keyExtractor={(item, index) => 'key' + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          renderItem={({item}) => {
            return <CarouselItem item={item} />;
          }}
        />
      </View>
    );
  }

  console.log('Please provide Images');
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotView: {flexDirection: 'row', justifyContent: 'center'},
});

export default Carousel;
