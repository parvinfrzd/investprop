import React from 'react'; 
import {GoogleMap, useLoadScript,useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api'; 
import {formatRelative} from 'date-fns';
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption,ComboboxOptionText,} from "@reach/combobox";
import usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete"; 
import "@reach/combobox/styles.css";
import mapStyles from './mapStyles';

import InvestForm from '../../components/forms/InvestForm/InvestForm'

const libraries = ['places']

const mapContainerStyle = {
    width: '900px', 
    height: '500px'
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
    const { isLoaded, loadError } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, 
        libraries,
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

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat,lng}); 
        mapRef.current.setZoom(14);
    }, []);

    return isLoaded ? (
            <div className="card" >
                 <div class="card-body">
                    <Search panTo={panTo}/>
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
                    {selected ? (<InfoWindow position= {{lat: selected.lat, lng: selected.lng}} onCloseClick={() => {
                        setSelected(null);
                    }}>
                        <InvestForm/>
                    </InfoWindow>) : null }
                    </GoogleMap>
                </div>
            </div>
    ) : <></>
}

function Search({ panTo }) {
        const {
          ready,
          value,
          suggestions: { status, data },
          setValue,
          clearSuggestions,
        } = usePlacesAutoComplete();

    return (
        <div>
            <Combobox onSelect={async (address) =>{
                setValue(address, false);
                clearSuggestions();
                try{
                    const results = await getGeocode({address});
                    const {lat, lng} = await getLatLng(results[0]);
                    panTo({lat, lng});
                }catch(err){
                    console.log('error',err);
                }
            }}>
                <ComboboxInput value={value} onChange= {(e) => {
                    setValue(e.target.value);}}
                    disabled={!ready}
                    placeholder='enter an address'/>
                    <ComboboxPopover >
                        {status === 'OK' &&  data.map(({id, description}) => 
                        <ComboboxOption key={id} value={description}></ComboboxOption>
                        )}
                    </ComboboxPopover>
                    
                    
            </Combobox>
        </div>
    )
    
}

