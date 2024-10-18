import supabase from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	error && console.log({ error });
	if (error) throw new Error('Cabins cound not be loaded');
	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase.from('cabins').delete().eq('id', id);

	error && console.log({ error });
	if (error) throw new Error('Cabin cound not be deleted');
}
