import React from 'react'; 
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'; 
import {formatRelative} from 'date-fns';

const libraries = ['Places']

export default function MarkPlaces() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey : process.env.GOOGLE_MAPS_API_KEY, 
        libraries
    });

    if(loadError) return 'Error loading maps';
    if(!isLoaded) return 'Loading map in progress';

    return <div>MAP</div>
}