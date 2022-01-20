import ImageComponent from 'components/Image/components';
import { useState } from 'react';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	onChangeCustom: (field: string, value: File | null, shouldValidate?: boolean) => void;
	onBlurCustom: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
	name: string;
	imgUrl?: string;
}

const ImageInput: React.FC<Props> = ({ onChangeCustom, onBlurCustom, name, imgUrl, ...props }) => {
	const [previewImg, setPreviewImg] = useState(imgUrl || '');

	const onChangeFile = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: (field: string, value: File | null, shouldValidate?: boolean) => void
	) => {
		const files = e.target.files;
		if (files) {
			setPreviewImg(URL.createObjectURL(files[0]));
			setFieldValue(name, files[0]);
			e.target.value = '';
		}
	};

	const onBlurFile = (setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void) => {
		setFieldTouched(name, true);
	};

	const onRemoveFile = (setFieldValue: (field: string, value: File | null, shouldValidate?: boolean) => void) => {
		setFieldValue(name, null);
		setPreviewImg('');
	};

	return (
		<div className="flex items-start">
			{previewImg && (
				<span className="mr-4 inline-block h-20 w-20 rounded-full overflow-hidden">
					<ImageComponent src={previewImg} className="h-full w-full" />
				</span>
			)}
			<button
				type="button"
				className="relative bg-white py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				<input
					{...props}
					onChange={(e) => onChangeFile(e, onChangeCustom)}
					onBlur={() => onBlurFile(onBlurCustom)}
					type="file"
					accept=".png, .jpg, .jpeg .gif"
					className="absolute w-full inset-0 opacity-0"
				/>
				Change
			</button>
		</div>
	);
};

export default ImageInput;
