import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fromLatLng, setKey, setLanguage } from 'react-geocode';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import { useMemo } from 'react';
import { GOOGLE_API_KEY } from '../../environmentVars';
import { cn } from '../../services/cn';

setKey(GOOGLE_API_KEY);
setLanguage('en');

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Props {
  setAddress: (value: string) => void;
  possition: { lat: number; lng: number } | null;
  setPossition: (value: { lat: number; lng: number } | null) => void;
  className?: string;
}

export const Map = ({ setAddress, possition, setPossition, className }: Props) => {
  const center: LatLngExpression = useMemo(() => {
    if (possition) {
      return [possition.lat, possition.lng];
    }
    return [50.4501, 30.5234];
  }, [possition]);

  const MapClickHandler = () => {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        setPossition({ lat, lng });

        try {
          const response = await fromLatLng(lat, lng);
          const address = response.results[0].formatted_address;
          setAddress(address);
        } catch (error) {
          console.error(error);
        }
      },
    });

    return null;
  };

  return (
    <div>
      <MapContainer center={center} zoom={possition ? 13 : 6} className={cn('h-[85vh] w-full', className)}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {possition && <Marker position={possition} />}
      </MapContainer>
    </div>
  );
};
