import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
	const queryClient = useQueryClient();

	const { mutate: editCabin, isPending: isEditing } = useMutation({
		mutationFn: ({ newCabinDate, id }) => createEditCabin(newCabinDate, id),
		onSuccess: () => {
			toast.success('Cabin successfully edited');

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (error) => toast.error(error.message),
	});

	return { editCabin, isEditing };
}
