import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import PropTypes from 'prop-types';
import styles from '../styles/Map.module.scss';

UpdateMapCenter.propTypes = {
	positionArray: PropTypes.array,
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
	const navigate = useNavigate();
	const { citiesArray } = useCities();
	const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
	const [searchParams] = useSearchParams();
	const mapLat = searchParams.get('lat');
	const mapLng = searchParams.get('lng');

	const handleMapClick = () => {
		navigate('form');
	};

	useEffect(() => {
		if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);

		return () => {};
	}, [mapLat, mapLng]);

	return (
		<div
			className={styles.mapContainer}
			onClick={handleMapClick}
		>
			<MapContainer
				center={mapPosition}
				zoom={4}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<UpdateMapCenter positionArray={mapPosition} />
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
	const { positionArray } = props;
	const [lat, lng] = positionArray;
	const map = useMap();
	map.setView([lat, lng]);

	return null;
}
