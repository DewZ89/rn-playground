import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 24,
  },
  contentWrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    height: 48,
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  },
  heading: {
    marginBottom: 20,
  },
})

export default styles
