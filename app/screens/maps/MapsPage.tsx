import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Platform, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { check, PERMISSIONS, request } from 'react-native-permissions'
import Geolocation, { type GeoPosition } from 'react-native-geolocation-service'
import Icon, { FA5Style } from 'react-native-vector-icons/FontAwesome5'
import { FAB, Text } from 'react-native-paper'
import BottomSheet from '@gorhom/bottom-sheet'

import styles from './maps.style'

const screen = Dimensions.get('window')

const ASPECT_RATIO = screen.width / screen.height
const LATITUDE_DELTA = 0.003
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

async function requestLocationPermission() {
  try {
    let status
    if (Platform.OS === 'android') {
      status = await requestLocationPermissionAndroid()
    }

    if (Platform.OS === 'ios') {
      status = await requestLocationPermissionIOS()
    }
    console.log(status)
    return status === 'granted'
  } catch (error) {
    console.log(error)
    return false
  }
}

async function requestLocationPermissionIOS() {
  const currentStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

  if (currentStatus === 'denied')
    return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
}

async function requestLocationPermissionAndroid() {
  const rationale = {
    title: 'Geolocation Permission',
    message: 'Can we access your location?',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  }
  return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, rationale)
}

function getLocationFromPosition(position: GeoPosition | null): Region {
  if (!position) return defaultLocation

  const { coords } = position
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }
}

const defaultLocation: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
}

const MapsPage = () => {
  const [canRequestLocation, setCanRequestLocation] = useState(false)
  const [currentPosition, setCurrentPosition] = useState<GeoPosition | null>(
    null,
  )
  const [userMarkerImageSource, setUserMarkerImageSource] = useState()

  const mapRef = useRef<MapView>(null)
  const sheetRef = useRef<BottomSheet>(null)

  const userMarkerCoords = {
    latitude: currentPosition?.coords.latitude ?? 0,
    longitude: currentPosition?.coords.longitude ?? 0,
  }

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentPosition(position)
        if (mapRef.current)
          mapRef.current.animateToRegion(
            getLocationFromPosition(currentPosition),
          )
      },
      console.error,
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 },
    )
  }

  useEffect(() => {
    requestLocationPermission().then(setCanRequestLocation)
    Icon.getImageSource('circle', 20, 'red', FA5Style.solid).then(source =>
      setUserMarkerImageSource(source.uri),
    )
  }, [])

  useEffect(() => {
    if (canRequestLocation) {
      Geolocation.getCurrentPosition(setCurrentPosition, console.error, {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 15000,
      })
    }
  }, [canRequestLocation])

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={defaultLocation}
        region={getLocationFromPosition(currentPosition)}
        ref={mapRef}>
        {currentPosition ? (
          <Marker
            image={{ uri: userMarkerImageSource }}
            coordinate={userMarkerCoords}
            title="You're here"
            description='The driver will see your position and come pick you there'
          />
        ) : null}
      </MapView>
      <FAB
        mode='flat'
        variant='primary'
        size='medium'
        icon={() => <Icon name='location-arrow' size={20} light />}
        onPress={getCurrentLocation}
        style={styles.positionBtn}
      />
      <BottomSheet
        ref={sheetRef}
        index={2}
        snapPoints={['90%', '50%', '25%', '10%']}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,

          elevation: 15,
        }}>
        <View
          style={{
            flex: 1,
            padding: 24,
            backgroundColor: 'white',
          }}>
          <Text>Swipe down to close</Text>
        </View>
      </BottomSheet>
    </View>
  )
}

export default MapsPage
