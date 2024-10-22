import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	error && console.log({ error });
	if (error) throw new Error('Cabins cound not be loaded');
	return data;
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.includes?.(supabaseUrl);
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// Create / Edit Cabin.
	let query = supabase.from('cabins');

	// A.) CREATE
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// B.) EDIT
	if (id)
		query = query
			.update({
				...newCabin,
				image: imagePath,
			})
			.eq('id', id)
			.select();

	const { data, error } = await query.select();

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
