import {Platform} from 'react-native';

const merriweatherFonts = Platform.select({
  android: {
    M_Regular: 'Merriweather_36pt-Regular',
    M_Medium: 'Merriweather_36pt-Medium',
    M_SemiBold: 'Merriweather_36pt-SemiBold',
    M_Bold: 'Merriweather_36pt-Bold',
  },
  ios: {
    M_Regular: 'Merriweather36pt-Regular',
    M_Medium: 'Merriweather36pt-Medium',
    M_SemiBold: 'Merriweather36pt-SemiBold',
    M_Bold: 'Merriweather36pt-Bold',
  },
});

export const Fonts = {
  ...merriweatherFonts,
  O_Regular: 'OpenSans-Regular',
  O_Medium: 'OpenSans-Medium',
  O_SemiBold: 'OpenSans-SemiBold',
  O_Bold: 'OpenSans-Bold',
};
