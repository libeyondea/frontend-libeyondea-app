import classNames from 'classnames';
import { useId, useState } from 'react';

import Avatar from '../Avatar';
import Button from 'src/components/Button';

type Props = {
	className?: string;
	onChangeImage: (field: string, value: File | null, shouldValidate?: boolean) => void;
	onBlurImage: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
	name: string;
	label?: string;
	imageUrl?: string;
	error?: boolean;
	helperText?: string;
	canDelete?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

const ImageForm = ({ className, onChangeImage, onBlurImage, name, label, imageUrl, error = false, helperText, canDelete = false, ...props }: Props) => {
	const id = useId();
	const [previewImage, setPreviewImage] = useState(imageUrl || '');

	const _onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			setPreviewImage(URL.createObjectURL(files[0]));
			onChangeImage(name, files[0]);
			event.target.value = '';
		}
	};

	const _onBlurImage = () => {
		onBlurImage(name, true);
	};

	const _onRemoveImage = () => {
		onChangeImage(name, null);
		setPreviewImage('');
	};

	return (
		<div className={classNames('w-full', className)}>
			{label && (
				<label htmlFor={id} className="mb-1 inline-block font-medium text-gray-600">
					{label}
				</label>
			)}
			<div className="flex flex-col sm:flex-row sm:items-start">
				{previewImage && (
					<div className="mb-4 mr-0 sm:mb-0 sm:mr-4">
						<Avatar className="h-20 w-20" src={previewImage} alt="Image" />
					</div>
				)}
				<Button className="relative" color="secondary">
					<input
						{...props}
						className="absolute inset-0 w-full opacity-0"
						id={id}
						name={name}
						value=""
						type="file"
						accept=".jpg, .jpeg, .png, .gif"
						onChange={_onChangeImage}
						onBlur={_onBlurImage}
					/>
					Change
				</Button>
				{previewImage && canDelete && (
					<Button className="mt-4 ml-0 sm:mt-0 sm:ml-4" color="danger" onClick={_onRemoveImage}>
						Remove
					</Button>
				)}
			</div>
			{error && <div className="mt-1 text-sm text-red-500">{helperText}</div>}
		</div>
	);
};

export default ImageForm;
