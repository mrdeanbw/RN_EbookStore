/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';

import {
  Container,
  Left,
  Body,
  Right,
  Title,
  Header,
  Button,
  Icon,
  Content,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pdf from 'react-native-pdf';
import colors from '../../style/colors';
import GlobalStyle from '../../style/globalStyle.js';
import bookList from '../../assets/books/booklist';
import booklist from '../../assets/books/booklist';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function PDFReader({route, navigation}) {
  const [isActivityIndicatorVisible, setActivityIndicator] = useState(false);
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };

  const {bookIndex} = route.params;
  console.log('title=' + bookIndex);

  useEffect(() => {
    console.log('home useEffect');
  }, []);

  return (
    <View style={styles.container}>
      <Header style={styles.headerContainer}>
        <Left>
          <Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="chevron-back" size={20} color="#FFF" />
          </Button>
        </Left>
        <Body style={{flex: 10, alignItems: 'center'}}>
          <Title style={GlobalStyle.headerTitle}>
            {bookList[bookIndex].titlePDF}
          </Title>
        </Body>
        <Right style={{flex: 1}} />
      </Header>
      {/* <Content>
        <Pdf
          source={booklist[bookIndex].bookPath}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      </Content> */}

      <View style={styles.container}>
        <Pdf
          source={booklist[bookIndex].bookPath}
          // source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </View>
  );
}

export default PDFReader;

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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
