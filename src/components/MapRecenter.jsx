import { useMap } from 'react-leaflet';

export default function MapRecenter({ center }) {
  const map = useMap();
  map.setView(center, 11);
  return null;
}