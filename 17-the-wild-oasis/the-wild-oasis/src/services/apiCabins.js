import supabase from './supabase';

export async function getCabins() {
	try {
		const { data, error } = await supabase.from('cabins').select('*');
		if (error) throw new Error('Cabins cound not be loaded');
		return data;
	} catch (error) {
		console.log({ error });
	}
}
