import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const wp = (val: number) => widthPercentageToDP(val);
export const hp = (val: number) => heightPercentageToDP(val);
export const fontSize = (val: number) => RFValue(val, 812);