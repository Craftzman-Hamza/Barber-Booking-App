import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroImage,
  ViroConstants,
  ViroARSceneNavigator,
} from 'react-viro';

const HelloWorldSceneAR = (props) => {
  const {hair} = props;
  console.log(hair);

  // Function to handle tracking updates
  function onInitialized(status, reason) {
    if (status === ViroConstants.TRACKING_NORMAL) {
      console.log('Tracking initialized');
    } else if (status === ViroConstants.TRACKING_NONE) {
      console.log('Tracking lost');
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroImage
        source={{uri: hair}} // Assuming 'hair' is the image URI
        position={[0, 0, -2]} // Place the image 2 meters in front of the camera
        scale={[1, 1, 1]} // Adjust scale as needed
        style={styles.imageStyle}
      />
    </ViroARScene>
  );
};

const ARScreen = ({route}) => {
  const {hair} = route.params; // Retrieve the 'hair' image from route params
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
        passProps: {
          hair: hair.src, // Assuming 'hair' object has the 'src' field for image URL
        },
      }}
      style={{flex: 1}}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 3, // Set the appropriate height and width for the AR image
    width: 3,
  },
});

export default ARScreen;
