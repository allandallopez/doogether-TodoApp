import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  headerContainer: {
    height: '20%',
    backgroundColor: '#40739e',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: '700',
    marginLeft: normalize(10),
    color: '#ecf0f1',
  },
  modalContainer: {
    flexDirection: 'column',
    marginLeft: normalize(10),
    marginBottom: normalize(10),
    backgroundColor: '#40739e',
    borderRadius: 20,
    borderColor: 'black',
    width: normalize(350),
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#dcdde1',
    marginLeft: normalize(7),
  },
  modalDescription: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: normalize(15),
    color: '#dcdde1',
  },
  deleteBtn: {
    width: '13%',
    backgroundColor: '#d63031',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: normalize(40),
    borderRadius: normalize(8),
  },
  addBtn: {
    height: '9%',
    width: 60,
    backgroundColor: '#2980b9',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(30),
    marginLeft: normalize(290),
  },
});

export default styles;
