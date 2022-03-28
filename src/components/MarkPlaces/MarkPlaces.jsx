import React from 'react'; 
import {GoogleMap, useJsApiLoader, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'; 
import {formatRelative} from 'date-fns';
import mapStyles from './mapStyles';
const libraries = ['Places']
const mapContainerStyle = {
    width: '100vw', 
    height: '100vh'
}
const center = {
    lat: 43.653225,
    lng: -79.383186
}
const options = {
    styles: mapStyles, 
    disableDefaultUI: true, 
    zoomControl: true
}
export default function MarkPlaces() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'apikey'
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        options={options}
        onClick={(event) => {console.log(event)}}
        >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        </GoogleMap>
    ) : <></>
}



// const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         { /* Child components, such as markers, info windows, etc. */ }
//         <></>
//       </GoogleMap>
//   ) : <></>