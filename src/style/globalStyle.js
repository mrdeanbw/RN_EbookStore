import {StyleSheet} from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  viewConinater: {
    flex: 1,
    // backgroundColor: '#888888',
    // backgroundColor: 'black',
  },
  containerView: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  headerContainer: {
    borderBottomWidth: 0,
    width: '100%',
    backgroundColor: colors.headerContainerDark,
  },
  headerTitle: {
    color: colors.white,
  },
  headerIcons: {
    // color: '#2846FF',
  },

  FooterContainer:{
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor:'#EEE',
  },

  tabBarUnderlineStyle: {
    backgroundColor: '#00B9AA',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
