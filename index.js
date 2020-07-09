/**
 * @format
 */
// import 'react-native-gesture-handler';
import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.ignoredYellowBox = true;
console.disableYellowBox = true;
// YellowBox.ignoreWarnings([
// 	'VirtualizedLists should never be nested', // TODO: Remove when fixed
// ])
AppRegistry.registerComponent(appName, () => App);
