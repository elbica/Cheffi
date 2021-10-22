import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { vw, vh } from '../../assets/styles/theme';
import { WebView as WebView } from 'react-native-webview';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export const OpenLinkModal = ({
  isOpen,
  setIsOpen,
  URL,
}: OpenLinkModalProps) => {
  const overlay = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isOpen) {
      Animated.timing(overlay, {
        toValue: 1,
        duration: 500,
        easing: Easing.quad,
        useNativeDriver: true,
      }).start();
      if (translateY) translateY.setValue(0);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    Animated.timing(overlay, {
      toValue: 0,
      duration: 500,
      easing: Easing.quad,
      useNativeDriver: true,
    }).start();
  };

  const handleGestureEvent = ({
    nativeEvent: { translationY },
  }: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (translationY > 0) translateY.setValue(translationY);
    if (translationY > 150) handleClose();
  };

  const renderHeader = () => (
    <PanGestureHandler onGestureEvent={handleGestureEvent}>
      <View style={s.header}>
        <TouchableOpacity
          style={s.header__close}
          onPress={handleClose}
          activeOpacity={0}
        />
      </View>
    </PanGestureHandler>
  );
  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[
          s.handle,
          {
            opacity: overlay.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      />
      <Modal
        visible={isOpen}
        transparent
        onRequestClose={handleClose}
        animationType="slide">
        <Animated.View style={{ transform: [{ translateY: translateY }] }}>
          <View style={s.content}>
            {renderHeader()}
            <WebView
              source={{
                uri: URL,
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={s.modal_radius}
            />
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

const s = StyleSheet.create({
  header: {
    height: 16,
    width: 30 * vw,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  header__close: {
    width: '100%',
    height: '100%',
  },
  handle: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    zIndex: 22,
    height: 200 * vh,
    width: 100 * vw,
    top: -50 * vh,
    alignSelf: 'center',
  },
  content: {
    paddingTop: 10 * vh,
    height: 100 * vh,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 25,
  },
  modal_radius: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
interface OpenLinkModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  URL: string;
}
