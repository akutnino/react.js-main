import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import PropTypes from 'prop-types';
import Button from './Button';
import styles from '../styles/Map.module.scss';
import { useUrlPosition } from '../hooks/useUrlPosition';

UpdateMapCenter.propTypes = {
	mapPosition: PropTypes.array,
};

const unicodeToEmoji = (flagUnicode) => {
	const FIRST_CHARACTER_UNICODE = 127462; // https://www.alt-codes.net/flags

	const flagCodeString = [...flagUnicode]
		.map((flagChar) => {
			const unicodeDifference = flagChar.codePointAt() - FIRST_CHARACTER_UNICODE;

			return String.fromCodePoint(unicodeDifference + 'A'.codePointAt());
		})
		.join('');

	return (
		<img
			src={`https://flagsapi.com/${flagCodeString}/flat/24.png`}
			alt='Flag Emoji'
		/>
	);
};

export default function Map() {
	const { citiesArray } = useCities();
	const [mapPosition, setMapPosition] = useState([0, 0]);
	const [mapLat, mapLng] = useUrlPosition();
	const [userPositionObject, getUserPosition] = useGeolocation();
	const { isLoading: isLoadingPosition, position: geolocationPosition } =
		userPositionObject;

	useEffect(() => {
		if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);

		return () => {};
	}, [mapLat, mapLng]);

	useEffect(() => {
		if (geolocationPosition)
			setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);

		return () => {};
	}, [geolocationPosition]);

	return (
		<div className={styles.mapContainer}>
			<Button
				type={'position'}
				onClick={getUserPosition}
			>
				{isLoadingPosition ? 'Loading...' : 'Use Your Location'}
			</Button>
			<MapContainer
				center={mapPosition}
				zoom={4}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<UpdateMapCenter mapPosition={mapPosition} />
				<DetectMapClick />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{citiesArray.map((cityObject) => {
					const {
						cityName,
						emoji,
						id,
						position: { lat, lng },
					} = cityObject;

					return (
						<Marker
							key={id}
							position={[lat, lng]}
						>
							<Popup>
								<span>{unicodeToEmoji(emoji)}</span> <span>{cityName}</span>
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}

function UpdateMapCenter(props) {
	const { mapPosition } = props;
	const [lat, lng] = mapPosition;
	const map = useMap();
	map.setView([lat, lng]);

	return null;
}

function DetectMapClick(props) {
	const navigate = useNavigate();

	useMapEvents({
		click: (event) => {
			const {
				latlng: { lat, lng },
			} = event;

			navigate(`form?lat=${lat}&lng=${lng}`);
		},
	});

	return null;
}
