
const GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = process.env.GOOGLE_MAP_API_KEY;

export async function geocodeAddr(address) {
	const result = await fetch(`${GEOCODE_URL}?address=${encodeURIComponent(address)}&key=${API_KEY}`);
	const data = await result.json();

	if (data.status !== "OK" || !data.results.length) {
		throw new Error(`Geocoding failed ${data.status}`);
	}

	return data.results[0].formatted_address;
}
