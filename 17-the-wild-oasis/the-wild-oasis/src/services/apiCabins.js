import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	error && console.log({ error });
	if (error) throw new Error('Cabins cound not be loaded');
	return data;
}

export async function createCabin(newCabin) {
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// Create Cabin.
	const { data, error } = await supabase
		.from('cabins')
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	// Upload Image.
	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// Delete the cabin if there was an error during upload.
	if (storageError) await supabase.from('cabins').delete().eq('id', data.id);

	error && console.log({ error }, { storageError });
	if (error) throw new Error('Cabin cound not be created');
	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase.from('cabins').delete().eq('id', id);

	error && console.log({ error });
	if (error) throw new Error('Cabin cound not be deleted');
}
