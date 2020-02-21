import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fcff',
  },
  headerContainer: {
    height: '10%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },
  formTitle: {
    height: normalize(50),
    width: normalize(350),
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#c8d6e5',
    borderRadius: 20,
    marginLeft: normalize(10),
    marginBottom: normalize(20),
  },
  formBody: {
    height: normalize(100),
    width: normalize(350),
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#c8d6e5',
    borderRadius: 30,
    marginLeft: normalize(10),
    marginBottom: normalize(20),
  },
  buttonAdd: {
    borderRadius: 100,
    backgroundColor: '#ee5253',
    height: '7%',
    width: normalize(100),
    flexDirection: 'column',
    alignItems: 'center',
    left: normalize(260),
  },
  buttonTitle: {
    fontSize: normalize(17),
    fontWeight: '700',
    marginTop: normalize(13),
  },
});

export default styles;
