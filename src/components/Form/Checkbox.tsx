import classNames from 'classnames';
import { useId } from 'react';

type Props = {
	className?: string;
	name: string;
	error?: boolean;
	helperText?: string;
	sizeType?: 'lg' | 'md' | 'sm' | 'xs';
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'input'>;

const CheckboxForm = ({ className, name, error = false, helperText, sizeType = 'md', children, ...props }: Props) => {
	const id = useId();

	return (
		<div className={classNames('form-control', className)}>
			<label className="label p-0">
				<input
					{...props}
					id={id}
					name={name}
					className={classNames('checkbox', {
						'checkbox-lg': sizeType === 'lg',
						'checkbox-md': sizeType === 'md',
						'checkbox-sm': sizeType === 'sm',
						'checkbox-xs': sizeType === 'xs'
					})}
					type="checkbox"
				/>
				<span className="label-text ml-2">{children}</span>
			</label>
			{error && (
				<label className="label">
					<span className="label-text-alt text-error">{helperText}</span>
				</label>
			)}
		</div>
	);
};

export default CheckboxForm;
