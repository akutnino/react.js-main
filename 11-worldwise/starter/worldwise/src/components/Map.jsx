import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import styles from '../styles/Map.module.scss';

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

	const handleMapClick = () => {
		navigate('form');
	};

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
