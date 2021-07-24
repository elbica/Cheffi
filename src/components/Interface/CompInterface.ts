import {NativeSyntheticEvent, NativeTouchEvent} from 'react-native';

export interface ButtonsProps {
  title?: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  width: string;
  height: string;
}
