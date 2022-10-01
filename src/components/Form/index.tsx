import { FormikConfig, FormikHelpers, FormikProps, FormikValues, useFormik } from 'formik';

import CheckboxForm from './Checkbox';
import ImageForm from './Image';
import InputForm from './Input';
import SelectForm from './Select';
import ToggleForm from './Toggle';

type FormComponentProps<Values> = {
	className?: string;
	initialValues: Values;
	validationSchema?: any;
	onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;
	children: (props: FormikProps<Values>) => React.ReactNode;
} & FormikConfig<Values>;

const Form = <Values extends FormikValues = FormikValues>({
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

export default Object.assign(Form, {
	Input: InputForm,
	Select: SelectForm,
	Checkbox: CheckboxForm,
	Image: ImageForm,
	Toggle: ToggleForm
});
