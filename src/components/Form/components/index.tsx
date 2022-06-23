import { FormikConfig, FormikHelpers, FormikProps, FormikValues, useFormik } from 'formik';

import CheckboxFormComponent from './Checkbox';
import ImageFormComponent from './Image';
import InputFormComponent from './Input';
import SelectFormComponent from './Select';
import ToggleFormComponent from './Toggle';

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
}: FormComponentProps<Values>) => {
	const formik: FormikProps<Values> = useFormik<Values>({
		...props,
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});

	return (
		<form className={className} onSubmit={formik.handleSubmit}>
			{children(formik)}
		</form>
	);
};

export default Object.assign(FormComponent, {
	Input: InputFormComponent,
	Select: SelectFormComponent,
	Checkbox: CheckboxFormComponent,
	Image: ImageFormComponent,
	Toggle: ToggleFormComponent
});
