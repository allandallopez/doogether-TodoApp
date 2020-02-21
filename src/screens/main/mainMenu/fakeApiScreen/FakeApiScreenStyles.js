import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fcff',
    flexDirection: 'column',
  },
  loadingContainer: {
    marginTop: normalize(200),
  },
  headerContainer: {
    height: '20%',
    backgroundColor: '#34495e',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(10)
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: '700',
    marginLeft: normalize(10),
    color: '#ecf0f1',
  },
  buttonAdd: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#1abc9c',
    height: '7%',
    width: normalize(100),
    flexDirection: 'column',
    alignItems: 'center',
    right: normalize(40),
    top: normalize(50),
  },
  titleButtonAdd: {
    fontSize: normalize(17),
    fontWeight: '700',
    marginTop: normalize(13),
  },
});

export default styles;
