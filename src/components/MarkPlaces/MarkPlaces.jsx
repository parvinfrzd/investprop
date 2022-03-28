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
        googleMapsApiKey: 'AIzaSyD25nhSCknaFgEaGulYOroERSuD87NWVeI'
    })
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onMapClick = React.useCallback ((event) => {setMarkers(current => [...current, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(), 
        time: new Date(),
    }])}, []);

    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    return isLoaded ? (
        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        >
        { /* Child components, such as markers, info windows, etc. */ }
        {markers.map((marker) => (
        <Marker 
            key={marker.time.toISOString()} 
            position = {{lat: marker.lat, lng: marker.lng}}
            onClick={() => {
                setSelected(marker);
            }}
            />
        ))}
        <></>
        </GoogleMap>
    ) : <></>
}

