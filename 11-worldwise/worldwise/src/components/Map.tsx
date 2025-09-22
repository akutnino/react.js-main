import { useNavigate, useSearchParams, type NavigateFunction } from 'react-router';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext.tsx';
import type { CitiesContextValue } from '../types/contexts/types.ts';
import type { CityDataType, UseSearchParamsType } from '../types/components/types.ts';
import type { LatLngExpression, Map as MapType } from 'leaflet';
import styles from '../styles/components/Map.module.scss';

function ChangeMapPosition({ cityPosition }: { cityPosition: number[] }) {
	const map: MapType = useMap();
	const position: number[] = Object.values(map.getCenter());
	const isNull: number[] | null =
		!cityPosition[0] && !cityPosition[1] ? null : cityPosition;

	useMap().setView((isNull as LatLngExpression) ?? (position as LatLngExpression));
	return null;
}

function Map() {
	const navigate: NavigateFunction = useNavigate();
	const { cities }: CitiesContextValue = useCities();
	const [searchParams]: UseSearchParamsType = useSearchParams();
	const mapLatitude: string | null = searchParams.get('lat');
	const mapLongitude: string | null = searchParams.get('lng');

	const handleClick = () => {
		navigate('form');
	};

	return (
		<div
			className={styles.mapContainer}
			onClick={handleClick}
		>
			<MapContainer
				className={styles.map}
				center={[Number(mapLatitude), Number(mapLongitude)] as LatLngExpression}
				zoom={6}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>

				{cities.map((cityObj: CityDataType) => (
					<Marker
						position={Object.values(cityObj.position) as LatLngExpression}
						key={cityObj.id}
					>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				))}

				<ChangeMapPosition cityPosition={[Number(mapLatitude), Number(mapLongitude)]} />
			</MapContainer>
		</div>
	);
}

export default Map;
