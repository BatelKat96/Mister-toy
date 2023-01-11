import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '1.5rem' }}>{text}</div>;
const Loc1 = ({ text }) => <div style={{ fontSize: '1.5rem' }}>{text}</div>
const Loc2 = ({ text }) => <div style={{ fontSize: '1.5rem' }}>{text}</div>

export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 31.81268, lng: 34.77566 })
    const zoom = 9

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '60vh', width: '60%', margin: 'auto' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "AIzaSyBErwZY_vUvIysCWLULkpSb2GOCclUSb7c" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    // lat={coordinates.lat}
                    // lng={coordinates.lng}
                    {...coordinates}
                    text="⭕"
                />
                <Loc1
                    lat={31.76822}
                    lng={35.21348}
                    text="📍"

                />
                <Loc2
                    lat={32.18046}
                    lng={34.91723}
                    text="📍"
                />
            </GoogleMapReact>
        </div>
    );
}