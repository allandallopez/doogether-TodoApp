import React from 'react';
import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: normalize(210),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Lato-Bold',
    fontWeight: '700',
    fontSize: 40,
    color: '#c8d6e5',
    marginLeft: normalize(25),
  },
  regionContainer: {
    width: normalize(350),
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: normalize(10),
    marginBottom: normalize(20)
  },
  regionTitle: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: '700'
  },
  laTitle: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: '600'
  }
});

export default styles;
