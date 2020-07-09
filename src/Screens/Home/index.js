/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  TouchableOpacity,
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError,
} from 'react-native-iap';
import { NativeModules, NativeEventEmitter } from 'react-native';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import Pdf from 'react-native-pdf';
import colors from '../../style/colors';
import GlobalStyle from '../../style/globalStyle.js';
import bookList from '../../assets/books/booklist';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const itemSkus = Platform.select({
  ios: [
    'com.evetterose.metaphysical.item1',
    'com.evetterose.metaphysical.item2',
    'com.evetterose.metaphysical.item3',
    'com.evetterose.metaphysical.item4',
    'com.evetterose.metaphysical.item5',
    'com.evetterose.metaphysical.allitems',
  ],
  android: [
    'com.evetterose.metaphysical.item1',
    'com.evetterose.metaphysical.item2',
    'com.evetterose.metaphysical.item3',
    'com.evetterose.metaphysical.item4',
    'com.evetterose.metaphysical.item5',
    'com.evetterose.metaphysical.allitems',
  ],
});
let _this;

export default class AddACarMakeChoose extends React.Component {
  constructor(props) {
    super(props);
    _this = this;
    _this.state = {
      bookList: bookList,
      products: [],
      purchaseStatus: [true, false, false, false, false, false],
    };
    this.purchaseUpdateSubscription = null;
    this.purchaseErrorSubscription = null;
  }

  componentDidMount() {
    AsyncStorage.getItem('IAP_Status')
      .then((value) => {
        if (value !== null) {
          let jsonData = JSON.parse(value);
          console.log('json', jsonData);
          _this.setState({purchaseStatus: jsonData});
          console.log('value', value);
        }
      })
      .catch((_err) => {
        _this.setState({
          purchaseStatus: [true, false, false, false, false, false],
        });
      });

    // try {
    //   const value = await AsyncStorage.getItem('IAP_Status');
    //   console.log('getitem', value);

    // } catch (error) {
    //   // Error retrieving data
    //   _this.setState({
    //     purchaseStatus: [true, false, false, false, false, false],
    //   });
    // }

    // try {
    //   const products: Product[] = await RNIap.getProducts(itemSkus);
    //   console.log('products11', products);

    //   _this.setState({products});
    // } catch (err) {
    //   console.warn(err); // standardized err.code and err.message available
    // }

    RNIap.initConnection().then(() => {
      RNIap.getProducts(itemSkus).then((products) => {
        console.log('getProducts', products);
      });
    });
   
    this.purchaseUpdateSubscription = purchaseUpdatedListener(
      // (purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
        (purchase) => {
        console.log('purchaseUpdatedListener', purchase);
        const receipt = purchase.transactionReceipt;
        // console.log('receipt', receipt);
        console.log('receipt');
        if (receipt) {
          let _purchaseStatus = _this.state.purchaseStatus;
          let index = 0;
          switch (purchase.productId) {
            case 'com.evetterose.metaphysical.item1':
              index = 1;
              _purchaseStatus[index] = true;
              _this.setState({purchaseStatus: _purchaseStatus});
              break;
            case 'com.evetterose.metaphysical.item2':
              index = 2;
              _purchaseStatus[index] = true;
              _this.setState({purchaseStatus: _purchaseStatus});
              break;

            case 'com.evetterose.metaphysical.item3':
              index = 3;
              _purchaseStatus[index] = true;
              _this.setState({purchaseStatus: _purchaseStatus});
              break;
            case 'com.evetterose.metaphysical.item4':
              index = 4;
              _purchaseStatus[index] = true;
              _this.setState({purchaseStatus: _purchaseStatus});
              break;

            case 'com.evetterose.metaphysical.item5':
              index = 5;
              _purchaseStatus[index] = true;
              _this.setState({purchaseStatus: _purchaseStatus});
              break;
            case 'com.evetterose.metaphysical.allitems':
              _purchaseStatus = [true, true, true, true, true, true];
              _this.setState({purchaseStatus: _purchaseStatus});
              break;
          }
          try {
            let string = JSON.stringify(_this.state.purchaseStatus);
            console.log('string', string);
            AsyncStorage.setItem('IAP_Status', string);
          } catch (error) {}

          if (Platform.OS === 'ios') {
            // await RNIap.finishTransactionIOS(purchase.transactionId);
            RNIap.finishTransactionIOS(purchase.transactionId);
          } else if (Platform.OS === 'android') {
            // If not consumable
            // await RNIap.acknowledgePurchaseAndroid(
            //   purchase.purchaseToken,
            // );
            RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
          }
        }
      },
    );
    this.purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.warn('purchaseErrorListener', error);
      },
    );
    console.log('this.purchaseUpdateSubscription=', this.purchaseUpdateSubscription);


    // const purchaseEvent = Observable.fromEvent(
    //   new NativeEventEmitter(NativeModules.RNIapIos),
    //   'purchase-updated'
    // );
    // const purchaseSubscription = purchaseEvent.subscribe((transactionData) => {
    //   // Trigger server receipt validation here...
    //   console.log("Trigger server receipt validation here")
    // });
    // const errorEvent = Observable.fromEvent(
    //   new NativeEventEmitter(NativeModules.RNIapIos),
    //   'purchase-error'
    // );
    // const errorSubscription = errorEvent.subscribe((errorData) => {
    //   // Handle errors here...
    // });
    
  }

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
    RNIap.endConnection();
  }

  // onBuyBookItem = (productID) => {
  //   // this.getPurchases();
  //   console.log('productID123', productID);
  //   RNIap.requestPurchase(productID);
  // };
  onBuyBookItem = async (productID) => {
    try {
      // await RNIap.requestPurchase(productID);
      RNIap.requestPurchase(productID);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  getPurchases = async () => {
    console.log('purchases__');
    try {
      let purchases = await RNIap.getAvailablePurchases();
      console.log('purchases', purchases);
      const newState = {premium: false, ads: true};
      let restoredTitles = [];

      purchases.forEach((purchase) => {
        switch (purchase.productId) {
          case 'com.example.premium':
            newState.premium = true;
            restoredTitles.push('Premium Version');
            break;
          case 'com.example.no_ads':
            newState.ads = false;
            restoredTitles.push('No Ads');
            break;
        }
      });

      // Alert.alert(
      //   'Restore Successful',
      //   'You successfully restored the following purchases: ' +
      //     restoredTitles.join(', '),
      // );
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
      // Alert.alert(err.message);
    }
  };

  //   currency: "USD"
  // description: "Purchase Metaphysical Anatomy"
  // discounts: Array(0)
  // length: 0
  // __proto__: Array(0)
  // introductoryPrice: ""
  // introductoryPriceNumberOfPeriodsIOS: ""
  // introductoryPricePaymentModeIOS: ""
  // introductoryPriceSubscriptionPeriodIOS: ""
  // localizedPrice: "$12.99"
  // price: "12.99"
  // productId: "com.evetterose.metaphysical.item1"
  // subscriptionPeriodNumberIOS: "0"
  // subscriptionPeriodUnitIOS: "DAY"
  // title: "Metaphysical Anatomy"
  // type: "Do not use this. It returned sub only before"
  // __proto__: Object
  // length: 1
  // __proto__: Array(0)

  render() {
    let _this = this;
    return (
      <Container style={GlobalStyle.viewConinater}>
        <Header hasTabs style={styles.headerContainer}>
          <Left style={{flex: 1}} />
          <Body style={{flex: 3, alignItems: 'center'}}>
            <Title style={GlobalStyle.headerTitle}>Home</Title>
          </Body>
          <Right style={{flex: 1}} />
        </Header>
        <Content style={{backgroundColor: '#EEE', paddingHorizontal: 0}}>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
              paddingVertical: 5,
              paddingHorizontal: 5,
              borderRadius: 10,
              backgroundColor: '#0f7c90',
              alignSelf: 'flex-end',
            }}
            onPress={() => {
              this.onBuyBookItem('com.evetterose.metaphysical.allitems');
            }}>
            <Text
              style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>
              Get All ($49.95)
            </Text>
          </TouchableOpacity>

          <View
            style={{
              borderBottomColor: '#999',
              borderBottomWidth: 1,
            }}
          />
          <ScrollView>
            <FlatList
              data={_this.state.bookList}
              numColumns={2}
              horizontal={false}
              contentContainerStyle={{
                flex: 1,
                paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              keyExtractor={(item, index) => index}
              //   style={{backgroundColor:''}}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    backgroundColor: '#FFF',
                    // marginVertical: 10,
                  }}
                  onPress={() => {
                    // [true, false, false, false, false, false]
                    console.log(
                      '_this.state.purchaseStatus',
                      _this.state.purchaseStatus,
                    );
                    if (_this.state.purchaseStatus[index] == true) {
                      this.props.navigation.navigate('PDFReader', {
                        title: item.title,
                        bookIndex: index,
                      });
                    } else {
                      let productID =
                        'com.evetterose.metaphysical.item' + index;
                      console.log('productID=' + productID);
                      this.onBuyBookItem(productID);
                    }
                  }}>
                  <View style={{width: 'auto', height: 'auto'}}>
                    <Image
                      style={{
                        width: windowWidth * 0.45,
                        height: windowWidth * 0.45 * 1.2,
                        borderRadius: 10,
                      }}
                      resizeMethod="auto"
                      resizeMode="stretch"
                      //   source={{
                      //     uri:
                      //       item.image
                      //   }}
                      //   source={require('../../assets/images/metaphysical.png')}
                      source={item.image}
                    />
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#0f7c90',
                          fontWeight: 'bold',
                          marginBottom: 3,
                          marginHorizontal: 10,
                        }}>
                        {item.title}
                      </Text>

                      {_this.state.purchaseStatus[index] == false && (
                        <View
                          style={{
                            borderRadius: 30,
                            backgroundColor: '#0f7c90',
                            borderWidth: 0,
                            alignSelf: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFF',
                              paddingHorizontal: 10,
                              paddingVertical: 2,

                              borderRadius: 50,
                            }}>
                            {item.price}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

// function HomeScreen({navigation}) {
//   let purchaseUpdateSubscription = null;
//   let purchaseErrorSubscription = null;

//   const [appReady, setApp] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [isActivityIndicatorVisible, setActivityIndicator] = useState(false);
//   const [programmeList, setProgrammeList] = useState(false);

//   useEffect(async () => {
//     console.log('home useEffect');
//     let initStatus = await RNIap.initConnection();
//     console.log('initStatus', initStatus);
//     async function getProducts() {
//       // You can await here
//       const products = await RNIap.getProducts([
//         'com.evetterose.metaphysical.item1',
//       ]);
//       console.log('products1', products);
//       // ...
//     }
//     // getProducts();

//     RNIap.getProducts(['com.evetterose.metaphysical.item1'])
//       .then((products) => {
//         console.log('products12', products);
//         //handle success of fetch product list
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });

//     let purchaseUpdateSubscription = purchaseUpdatedListener(
//       (purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
//         // (purchase) => {
//         console.log('purchaseUpdatedListener', purchase);
//         const receipt = purchase.transactionReceipt;
//         if (receipt) {
//           yourAPI
//             .deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
//             .then(async (deliveryResult) => {
//               if (isSuccess(deliveryResult)) {
//                 // Tell the store that you have delivered what has been paid for.
//                 // Failure to do this will result in the purchase being refunded on Android and
//                 // the purchase event will reappear on every relaunch of the app until you succeed
//                 // in doing the below. It will also be impossible for the user to purchase consumables
//                 // again untill you do this.
//                 if (Platform.OS === 'ios') {
//                   await RNIap.finishTransactionIOS(purchase.transactionId);
//                 } else if (Platform.OS === 'android') {
//                   // If consumable (can be purchased again)
//                   // await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
//                   // If not consumable
//                   await RNIap.acknowledgePurchaseAndroid(
//                     purchase.purchaseToken,
//                   );
//                 }

//                 // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
//                 // If consumable (can be purchased again)
//                 // await RNIap.finishTransaction(purchase, true);
//                 // If not consumable
//                 await RNIap.finishTransaction(purchase, false);
//               } else {
//                 // Retry / conclude the purchase is fraudulent, etc...
//               }
//             });
//         }
//       },
//     );
//   }, []);

//   // const getProductList = async () => {
//   //   try {
//   //     const products: Product[] = await RNIap.getProducts(itemSkus);

//   //     console.log('products', products);

//   //     // const products = await RNIap.getProducts(itemSkus);
//   //     // this.setState({ products });
//   //     setProducts(products);
//   //   } catch (err) {
//   //     console.warn(err); // standardized err.code and err.message available
//   //   }
//   // };

//   const onBookItem = (item, index) => {
//     console.log('item', item);
//     console.log('index', index);
//     let productID = 'com.evetterose.metaphysical.item1';
//     switch (index) {
//       case 0:
//         productID = 'com.evetterose.metaphysical.item1';
//         break;
//       case 1:
//         productID = 'com.evetterose.metaphysical.item2';
//         break;
//       default:
//         productID = 'com.evetterose.metaphysical.item1';
//     }
//     console.log('productID=' + productID);
//     requestSubscription(productID);
//   };
//   return (
//     <Container style={GlobalStyle.viewConinater}>
//       <Header hasTabs style={styles.headerContainer}>
//         <Left style={{flex: 1}} />
//         <Body style={{flex: 3, alignItems: 'center'}}>
//           <Title style={GlobalStyle.headerTitle}>Home</Title>
//         </Body>
//         <Right style={{flex: 1}} />
//       </Header>
//       <Content style={{backgroundColor: '#EEE', paddingHorizontal: 0}}>
//         <TouchableOpacity
//           style={{
//             marginHorizontal: 10,
//             marginVertical: 10,
//             paddingVertical: 5,
//             paddingHorizontal: 5,
//             borderRadius: 10,
//             backgroundColor: '#0f7c90',
//             alignSelf: 'flex-end',
//             // width: 80,
//           }}>
//           <Text
//             style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>
//             $49.95 For ALL
//           </Text>
//         </TouchableOpacity>

//         <View
//           style={{
//             borderBottomColor: '#999',
//             borderBottomWidth: 1,
//           }}
//         />

//         <ScrollView>
//           <FlatList
//             data={bookList}
//             numColumns={2}
//             horizontal={false}
//             contentContainerStyle={{
//               flex: 1,
//               paddingTop: 10,
//               justifyContent: 'center',
//               alignItems: 'center',
//               //   backgroundColor: 'red',
//               // paddingBottom: 200,
//             }}
//             keyExtractor={(item, index) => index}
//             //   style={{backgroundColor:''}}
//             renderItem={({item, index}) => (
//               <TouchableOpacity
//                 key={index}
//                 style={{
//                   marginVertical: 10,
//                   marginHorizontal: 10,
//                   paddingVertical: 10,
//                   borderRadius: 10,
//                   backgroundColor: '#FFF',
//                   // marginVertical: 10,
//                 }}
//                 onPress={() => {
//                   if (index == 0) {
//                     navigation.navigate('PDFReader', {
//                       title: item.title,
//                       bookIndex: index,
//                     });
//                   } else {
//                     onBookItem(item, index);
//                   }
//                 }}>
//                 <View style={{width: 'auto', height: 'auto'}}>
//                   <Image
//                     style={{
//                       width: windowWidth * 0.45,
//                       height: windowWidth * 0.45 * 1.2,
//                       borderRadius: 10,
//                     }}
//                     resizeMethod="auto"
//                     resizeMode="stretch"
//                     //   source={{
//                     //     uri:
//                     //       item.image
//                     //   }}
//                     //   source={require('../../assets/images/metaphysical.png')}
//                     source={item.image}
//                   />
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: 'center',
//                       marginVertical: 10,
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         color: '#0f7c90',
//                         fontWeight: 'bold',
//                         marginBottom: 3,
//                         marginHorizontal: 10,
//                       }}>
//                       {item.title}
//                     </Text>

//                     <View
//                       style={{
//                         borderRadius: 30,
//                         backgroundColor: '#0f7c90',
//                         borderWidth: 0,
//                         alignSelf: 'center',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: '#FFF',
//                           paddingHorizontal: 10,
//                           paddingVertical: 2,

//                           borderRadius: 50,
//                         }}>
//                         {item.price}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         </ScrollView>
//       </Content>
//     </Container>
//   );
// }

// export default HomeScreen;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
  },
  headerContainer: {
    backgroundColor: '#0f7c90',
    borderBottomWidth: 0,
    width: '100%',
  },
  headerTitle: {
    color: '#FF0000',
  },
  headerIcons: {
    color: '#000000',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  imageIcon: {
    marginVertical: 10,
    marginRight: 20,
    width: 80,
    height: 50,
  },
});
