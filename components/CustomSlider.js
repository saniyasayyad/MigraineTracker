import React from 'react';
import {View, StyleSheet, PanResponder, TouchableOpacity} from 'react-native';

const CustomSlider = ({
  minimumValue = 0,
  maximumValue = 10,
  value = 5,
  onValueChange,
  step = 1,
  minimumTrackTintColor = '#ff4444',
  maximumTrackTintColor = '#e0e0e0',
  thumbTintColor = '#ff4444',
}) => {
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const sliderRef = React.useRef(null);

  const getValueFromPosition = (x) => {
    if (sliderWidth === 0) return value;
    const percentage = Math.max(0, Math.min(1, x / sliderWidth));
    const rawValue = minimumValue + percentage * (maximumValue - minimumValue);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(minimumValue, Math.min(maximumValue, steppedValue));
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        if (sliderRef.current) {
          sliderRef.current.measure((fx, fy, width) => {
            const x = evt.nativeEvent.locationX;
            const newValue = getValueFromPosition(x);
            if (onValueChange) {
              onValueChange(newValue);
            }
          });
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (sliderRef.current) {
          sliderRef.current.measure((fx, fy, width) => {
            const x = gestureState.moveX - fx;
            const newValue = getValueFromPosition(x);
            if (onValueChange) {
              onValueChange(newValue);
            }
          });
        }
      },
    }),
  ).current;

  const handleLayout = (event) => {
    const {width} = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  const handlePress = (evt) => {
    const x = evt.nativeEvent.locationX;
    const newValue = getValueFromPosition(x);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const percentage = (value - minimumValue) / (maximumValue - minimumValue);
  const fillWidth = sliderWidth > 0 ? percentage * sliderWidth : 0;

  return (
    <View
      ref={sliderRef}
      style={styles.container}
      onLayout={handleLayout}
      {...panResponder.panHandlers}>
      <TouchableOpacity
        style={styles.trackContainer}
        activeOpacity={1}
        onPress={handlePress}>
        <View style={[styles.track, {backgroundColor: maximumTrackTintColor}]}>
          <View
            style={[
              styles.fill,
              {
                width: fillWidth,
                backgroundColor: minimumTrackTintColor,
              },
            ]}
          />
          <View
            style={[
              styles.thumb,
              {
                left: Math.max(0, Math.min(fillWidth - 10, sliderWidth - 10)),
                backgroundColor: thumbTintColor,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
  },
  trackContainer: {
    width: '100%',
  },
  track: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
    width: '100%',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
    position: 'absolute',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: -8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default CustomSlider;

