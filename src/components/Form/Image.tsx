import classNames from 'classnames';
import { useId, useState } from 'react';

import Button from 'src/components/Button';
import Image from 'src/components/Image';

type Props = {
	className?: string;
	onChangeFile: (field: string, value: File | null, shouldValidate?: boolean) => void;
	onBlurFile: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
	name: string;
	label?: string;
	imgUrl?: string;
	error?: boolean;
	helperText?: string;
	canDelete?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

const ImageForm = ({ className, onChangeFile, onBlurFile, name, label, imgUrl = '', error = false, helperText, canDelete = false, ...props }: Props) => {
	const id = useId();
	const [previewImg, setPreviewImg] = useState(imgUrl);

	const _onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			setPreviewImg(URL.createObjectURL(files[0]));
			onChangeFile(name, files[0]);
			event.target.value = '';
		}
	};

	const _onBlurFile = () => {
		onBlurFile(name, true);
	};

	const _onRemoveFile = () => {
		onChangeFile(name, null);
		setPreviewImg('');
	};

	return (
		<div className={classNames('form-control w-full', className)}>
			{label && (
				<label className="label p-0 mb-2">
					<span className="label-text">{label}</span>
				</label>
			)}
			<div className="flex items-start">
				{previewImg && (
					<span className="mr-4 inline-block h-20 w-20 rounded-full overflow-hidden">
						<Image className="h-full w-full" src={previewImg} alt="Image" />
					</span>
				)}
				<Button className="relative" colorType="secondary">
					<input
						{...props}
						id={id}
						name={name}
						value=""
						onChange={_onChangeFile}
						onBlur={_onBlurFile}
						accept=".png, .jpg, .jpeg .gif"
						className="absolute w-full inset-0 opacity-0"
						type="file"
					/>
					Change
				</Button>
				{previewImg && canDelete && (
					<Button className="ml-4" colorType="danger" onClick={_onRemoveFile}>
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
