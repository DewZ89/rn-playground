import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  positionBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderRadius: 50,
  },
})

export default styles
