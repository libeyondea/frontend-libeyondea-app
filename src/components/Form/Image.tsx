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

const ImageForm = ({ className, onChangeImage, onBlurImage, name, label, imageUrl = '', error = false, helperText, canDelete = false, ...props }: Props) => {
	const id = useId();
	const [previewImage, setPreviewImage] = useState(imageUrl);

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
		<div className={classNames('form-control w-full', className)}>
			{label && (
				<label className="label p-0 mb-2">
					<span className="label-text">{label}</span>
				</label>
			)}
			<div className="flex flex-col sm:flex-row">
				{previewImage && (
					<div className="mb-4 sm:mb-0 mr-0 sm:mr-4">
						<Avatar src={previewImage} alt="Image" size="6rem" />
					</div>
				)}
				<Button className="relative" color="secondary">
					<input
						{...props}
						className="absolute w-full inset-0 opacity-0"
						type="file"
						id={id}
						name={name}
						value=""
						onChange={_onChangeImage}
						onBlur={_onBlurImage}
						accept=".jpg, .jpeg, .png, .gif"
					/>
					Change
				</Button>
				{previewImage && canDelete && (
					<Button className="mt-4 sm:mt-0 ml-0 sm:ml-4" color="error" onClick={_onRemoveImage}>
						Remove
					</Button>
				)}
			</div>
			{error && (
				<label className="label p-0 mt-2">
					<span className="label-text-alt text-error">{helperText}</span>
				</label>
			)}
		</div>
	);
};

export default ImageForm;
