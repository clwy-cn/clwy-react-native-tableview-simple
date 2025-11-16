import React, { useContext } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ThemeContext } from './Theme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export interface SeparatorInterface {
  backgroundColor?: ViewStyle['backgroundColor'];
  tintColor?: ViewStyle['backgroundColor'];
  isHidden?: boolean;
  insetLeft?: ViewStyle['marginLeft'];
  insetRight?: ViewStyle['marginRight'];
  withSafeAreaView?: boolean;
}

const Separator: React.FC<SeparatorInterface> = ({
                                                   backgroundColor,
                                                   tintColor,
                                                   isHidden = false,
                                                   insetLeft = 15,
                                                   insetRight = 0,
                                                   withSafeAreaView = Platform.OS === 'ios'
                                                     ? parseInt(`${Platform.Version}`, 10) <= 10
                                                       ? false
                                                       : true
                                                     : true,
                                                 }) => {
  const theme = useContext(ThemeContext);
  const localStyles = {
    separator: [
      styles.separator,
      { backgroundColor: backgroundColor || theme.colors.background },
    ],
    separatorInner: [
      styles.separatorInner,
      {
        backgroundColor: isHidden
          ? 'transparent'
          : tintColor || theme.colors.separatorColor,
        marginLeft: insetLeft,
        marginRight: insetRight,
      },
    ],
  };

  if (withSafeAreaView) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={localStyles.separator}>
          <View style={localStyles.separatorInner} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  return (
    <View style={localStyles.separator}>
      <View style={localStyles.separatorInner} />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {},
  separatorInner: {
    height: 1,
  },
});

export default Separator;
