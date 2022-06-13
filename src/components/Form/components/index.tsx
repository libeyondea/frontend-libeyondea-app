import { FormikConfig, FormikHelpers, FormikProps, FormikValues, useFormik } from 'formik';
import classNames from 'classnames';
import InputFormComponent from './Input';
import SelectFormComponent from './Select';
import CheckboxFormComponent from './Checkbox';
import ImageFormComponent from './Image';

type FormComponentProps<Values> = {
	className?: string;
	initialValues: Values;
	validationSchema?: any;
	onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;
	children: (props: FormikProps<Values>) => React.ReactNode;
} & FormikConfig<Values>;

const FormComponent = <Values extends FormikValues = FormikValues>({
	className,
	initialValues,
	validationSchema,
	onSubmit,
	children,
	...props
}: FormComponentProps<Values>): JSX.Element => {
	const formik: FormikProps<Values> = useFormik<Values>({
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
	Input: InputFormComponent,
	Select: SelectFormComponent,
	Checkbox: CheckboxFormComponent,
	Image: ImageFormComponent
});
