import React from 'react';
import { View, Text, Image, StyleSheet, StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { SHOP_ITEMS } from '../data/items';

interface DrPsyAvatarProps {
  emoji?: string;
  persona?: 'default' | 'killer' | 'philosopher' | 'sherlock' | 'mystic' | 'mastermind' | 'manipulator';
  size?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const personaEmojis = {
  default: '🐱',
  killer: '💀',
  philosopher: '📜',
  sherlock: '🕵️‍♂️',
  mystic: '🔮',
  mastermind: '🕴️',
  manipulator: '⛓️',
};

const DrPsyAvatar: React.FC<DrPsyAvatarProps> = ({ 
  emoji, 
  persona = 'default',
  size = 40,
  style,
  textStyle,
}) => {
  const displayEmoji = emoji || personaEmojis[persona];
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }, style]}>
      <Text style={[{ fontSize: size * 0.6 }, textStyle]}>{displayEmoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default DrPsyAvatar;
