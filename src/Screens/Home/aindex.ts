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
import Pdf from 'react-native-pdf';
import colors from '../../style/colors';
import GlobalStyle from '../../style/globalStyle.js';
import bookList from '../../assets/books/booklist';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const itemSkus = Platform.select({
  ios: ['com.example.coins100'],
  android: ['com.example.coins100'],
});

function HomeScreen({navigation}) {
  let purchaseUpdateSubscription = null;
  let purchaseErrorSubscription = null;

  const [appReady, setApp] = useState(false);
  const [products, setProducts] = useState([]);
  const [isActivityIndicatorVisible, setActivityIndicator] = useState(false);
  const [programmeList, setProgrammeList] = useState(false);

  //   this.purchaseUpdateSubscription = purchaseUpdatedListener((purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase ) => {
  //     console.log('purchaseUpdatedListener', purchase);
  //     const receipt = purchase.transactionReceipt;
  //     if (receipt) {
  //       yourAPI.deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
  //       .then( async (deliveryResult) => {
  //         if (isSuccess(deliveryResult)) {
  //           // Tell the store that you have delivered what has been paid for.
  //           // Failure to do this will result in the purchase being refunded on Android and
  //           // the purchase event will reappear on every relaunch of the app until you succeed
  //           // in doing the below. It will also be impossible for the user to purchase consumables
  //           // again untill you do this.
  //           if (Platform.OS === 'ios') {
  //             await RNIap.finishTransactionIOS(purchase.transactionId);
  //           } else if (Platform.OS === 'android') {
  //             // If consumable (can be purchased again)
  //             await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
  //             // If not consumable
  //             await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
  //           }

  //           // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
  //           // If consumable (can be purchased again)
  //           await RNIap.finishTransaction(purchase, true);
  //           // If not consumable
  //           await RNIap.finishTransaction(purchase, false);
  //         } else {
  //           // Retry / conclude the purchase is fraudulent, etc...
  //         }
  //       });
  //     }
  //   });

  useEffect(() => {
    console.log('home useEffect');
    getProductList();

    let purchaseUpdateSubscription = purchaseUpdatedListener(
      //   (purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
      (purchase) => {
        console.log('purchaseUpdatedListener', purchase);
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          yourAPI
            .deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
            .then(async (deliveryResult) => {
              if (isSuccess(deliveryResult)) {
                // Tell the store that you have delivered what has been paid for.
                // Failure to do this will result in the purchase being refunded on Android and
                // the purchase event will reappear on every relaunch of the app until you succeed
                // in doing the below. It will also be impossible for the user to purchase consumables
                // again untill you do this.
                if (Platform.OS === 'ios') {
                  await RNIap.finishTransactionIOS(purchase.transactionId);
                } else if (Platform.OS === 'android') {
                  // If consumable (can be purchased again)
                  await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
                  // If not consumable
                  await RNIap.acknowledgePurchaseAndroid(
                    purchase.purchaseToken,
                  );
                }

                // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
                // If consumable (can be purchased again)
                await RNIap.finishTransaction(purchase, true);
                // If not consumable
                await RNIap.finishTransaction(purchase, false);
              } else {
                // Retry / conclude the purchase is fraudulent, etc...
              }
            });
        }
      },
    );
  }, []);

  const getProductList = async () => {
    try {
      // const products: Product[] = await RNIap.getProducts(itemSkus);
      //   const products = await RNIap.getProducts(itemSkus);
      //   // this.setState({ products });
      //   setProducts(products);
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  };

  return (
    <Container style={GlobalStyle.viewConinater}>
      <Header hasTabs style={styles.headerContainer}>
        <Left style={{flex: 1}} />
        <Body style={{flex: 3, alignItems: 'center'}}>
          <Title style={GlobalStyle.headerTitle}>Home</Title>
        </Body>
        <Right style={{flex: 1}}></Right>
      </Header>
      <View style={{backgroundColor: '#EEE', paddingHorizontal: 0}}>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            paddingVertical: 5,
            borderRadius: 10,
            backgroundColor: '#0f7c90',
            alignSelf: 'flex-end',
            width: 80,
           
          }}>
          <Text
            style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>
            Get All
          </Text>
        </TouchableOpacity>

        <View style={{
            borderBottomColor: '#999',
            borderBottomWidth: 1,}}>
        </View>

        <ScrollView>
          <FlatList
            data={bookList}
            numColumns={2}
            horizontal={false}
            contentContainerStyle={{
              flex: 1,
              paddingTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 200,
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
                  navigation.navigate('PDFReader', {
                    title: item.title,
                    bookIndex: index,
                  });
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
                        fontSize: 14,
                        color: '#0f7c90',
                        fontWeight: 'bold',
                        marginBottom: 3,
                        marginHorizontal:10,
                      }}>
                      {item.title}
                    </Text>

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
                        ${item.price}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    </Container>
  );
}

export default HomeScreen;

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
