import { Formik, FormikConfig, FormikHelpers, FormikProps, FormikValues } from 'formik';
import classNames from 'classnames';
import InputFormComponent from './Input';
import SelectFormComponent from './Select';
import CheckboxFormComponent from './Checkbox';
import ImageFormComponent from './Image';

type FormProps<Values> = {
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
}: FormProps<Values>): JSX.Element => {
	return (
		<Formik {...props} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{(props) => (
				<form className={classNames('', className)} onSubmit={props.handleSubmit}>
					{children(props)}
				</form>
			)}
		</Formik>
	);
};

export default Object.assign(FormComponent, {
	Input: InputFormComponent,
	Select: SelectFormComponent,
	Checkbox: CheckboxFormComponent,
	Image: ImageFormComponent
});
