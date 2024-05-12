import React, {useEffect, useRef, useState} from 'react'
import Leaflet, {marker} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from 'react-leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet-control-geocoder'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: toAbsoluteUrl('/media/location/marker.png'),
  iconUrl: toAbsoluteUrl('/media/location/marker.png'),
  shadowUrl: markerShadow,
})

const MapComponent = ({data}) => {
  const [markers, setMarkers] = useState<any>(data)

  const mapRef = useRef<any>()
  const zoom = 7
  const containerStyle = {
    width: '100%',
    height: '500px',
  }

  const mapClicked = async (event) => {
    return 'hello'
    // getAddress(event.latlng.lat, event.latlng.lng)
    // console.log(event.latlng.lat, event.latlng.lng, getAddress(event.latlng.lat, event.latlng.lng))
  }

  const markerClicked = async (marker, index) => {
    try {
      // const result = await getAddress(marker.position.lat, marker.position.lng)
      // console.log(marker.position.lat, marker.position.lng, result)
    } catch (error) {
      throw new Error()
    }
  }

  const markerDragEnd = (event, index) => {
    console.log(event.lat, event.lng)
  }
  // const getAddress = (lat, lng) => {
  //   const geocoder = Leaflet.Control.Geocoder.nominatim()
  //   return new Promise((resolve, reject) => {
  //     geocoder.reverse({lat, lng}, mapRef.current.getZoom(), (results) =>
  //       results.length ? resolve(results[0].name) : reject(null)
  //     )
  //   })
  // }
  if (markers.length === 0) return null
  return (
    <MapContainer
      style={containerStyle}
      center={(markers.length && markers[0]?.position) || data[0]}
      zoom={zoom}
      scrollWheelZoom={true}
      ref={mapRef}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <MapContent onClick={mapClicked} />
      {markers.map((marker: any, index) => (
        <MarkerContent
          key={index}
          position={marker.position}
          draggable={marker.draggable}
          name={marker.name}
          onMarkerClick={(event) => markerClicked(marker, index)}
          onDragEnd={(event) => markerDragEnd(event, index)}
        />
      ))}
    </MapContainer>
  )
}

const MapContent = ({onClick}) => {
  const map = useMapEvents({
    click: (event) => onClick(event),
  })
  return null
}

const MarkerContent = (props) => {
  const markerRef = useRef<any>()
  const {position, name, draggable, onMarkerClick, onDragEnd} = props
  return (
    <Marker
      // center={parentMap.getCenter()}
      position={position}
      draggable={draggable}
      eventHandlers={{
        click: (event) => onMarkerClick(event),
        dragend: () => onDragEnd(markerRef.current.getLatLng()),
      }}
      ref={markerRef}
    >
      <Popup>
        <b>{name}</b>
      </Popup>
    </Marker>
  )
}

export default MapComponent
