import { FormikConfig, FormikHelpers, FormikProps, useFormik } from 'formik';
import classNames from 'classnames';
import Input from './Input';
import Select from './Select';
import Image from './Image';
import Checkbox from './Checkbox';

type FormProps<TFormValues> = {
	className?: string;
	initialValues: TFormValues;
	validationSchema?: any;
	onSubmit: (values: TFormValues, formikHelpers: FormikHelpers<TFormValues>) => void | Promise<any>;
	children: (formik: FormikProps<TFormValues>) => React.ReactNode;
} & FormikConfig<TFormValues>;

const FormComponent = <TFormValues extends Record<string, any> = Record<string, any>>({
	className,
	initialValues,
	validationSchema,
	onSubmit,
	children,
	...props
}: FormProps<TFormValues>) => {
	const formik: FormikProps<TFormValues> = useFormik<TFormValues>({
		...props,
		initialValues,
		validationSchema,
		onSubmit
	});

	return (
		<form className={classNames('', className)} onSubmit={formik.handleSubmit}>
			{children(formik)}
		</form>
	);
};

export default Object.assign(FormComponent, {
	Input: Input,
	Select: Select,
	Checkbox: Checkbox,
	Image: Image
});
