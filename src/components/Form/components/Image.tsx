import ImageComponent from 'components/Image/components';
import { Fragment, useState } from 'react';

type onChangeFile = (field: string, value: File | null, shouldValidate?: boolean) => void;

type onBlurFile = (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;

type Props = {
	onChangeFile: onChangeFile;
	onBlurFile: onBlurFile;
	name: string;
	label: string;
	isError: boolean;
	errorMessage?: string;
	imgUrl?: string;
	canDelete?: boolean;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Image: React.FC<Props> = ({
	onChangeFile,
	onBlurFile,
	name,
	label,
	isError,
	errorMessage,
	imgUrl = '',
	canDelete = false,
	...props
}) => {
	const [previewImg, setPreviewImg] = useState(imgUrl);

	const _onChangeFile = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: onChangeFile) => {
		const files = e.target.files;
		if (files) {
			setPreviewImg(URL.createObjectURL(files[0]));
			setFieldValue(name, files[0]);
			e.target.value = '';
		}
	};

	const _onBlurFile = (setFieldTouched: onBlurFile) => {
		setFieldTouched(name, true);
	};

	const _onRemoveFile = (setFieldValue: onChangeFile) => {
		setFieldValue(name, null);
		setPreviewImg('');
	};

	return (
		<Fragment>
			<label htmlFor={name} className="inline-block font-medium text-gray-600 mb-1">
				{label}
			</label>
			<div className="relative">
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
							name={name}
							onChange={(e) => _onChangeFile(e, onChangeFile)}
							onBlur={() => _onBlurFile(onBlurFile)}
							type="file"
							accept=".png, .jpg, .jpeg .gif"
							className="absolute w-full inset-0 opacity-0"
						/>
						Change
					</button>
					{previewImg && canDelete && (
						<button
							type="button"
							className="ml-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
							onClick={() => _onRemoveFile(onChangeFile)}
						>
							Remove
						</button>
					)}
				</div>
			</div>
			{isError && <div className="text-red-700 mt-1 text-sm">{errorMessage}</div>}
		</Fragment>
	);
};

export default Image;