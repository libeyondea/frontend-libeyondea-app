import { FormikConfig, FormikHelpers, FormikProps, FormikValues, useFormik } from 'formik';
import _ from 'lodash';

import CheckboxForm from './Checkbox';
import ImageForm from './Image';
import InputForm from './Input';
import SelectForm from './Select';
import ToggleForm from './Toggle';

type Props<Values> = {
	className?: string;
	initialValues: Values;
	validationSchema?: any;
	onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;
	children: (props: FormikProps<Values>) => React.ReactNode;
} & FormikConfig<Values>;

const Form = <Values extends FormikValues = FormikValues>({ className, initialValues, validationSchema, onSubmit, children, ...props }: Props<Values>) => {
	const formik: FormikProps<Values> = useFormik<Values>({
		...props,
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});
	console.log(formik);
	return (
		<form className={className} onSubmit={formik.handleSubmit}>
			{children(formik)}
		</form>
	);
};

export default _.assign(Form, {
	Input: InputForm,
	Select: SelectForm,
	Checkbox: CheckboxForm,
	Image: ImageForm,
	Toggle: ToggleForm
});
