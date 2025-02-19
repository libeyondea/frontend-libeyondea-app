import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { DefaultValues, FieldValues, SubmitHandler, UseFormProps, UseFormReturn, useForm } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

import CheckboxForm from './Checkbox';
import ImageForm from './Image';
import InputForm from './Input';
import SelectForm from './Select';
import ToggleForm from './Toggle';

type Props<Values extends FieldValues> = UseFormProps<Values> & {
	className?: string;
	initialValues: DefaultValues<Values>;
	validationSchema?: AnyObjectSchema;
	onSubmit: SubmitHandler<Values>;
	children: (props: UseFormReturn<Values>) => React.ReactNode;
};

const Form = <Values extends FieldValues>({ className, initialValues, validationSchema, onSubmit, children, ...props }: Props<Values>) => {
	const formMethods = useForm<Values>({
		...props,
		defaultValues: initialValues,
		resolver: validationSchema ? yupResolver(validationSchema) : undefined
	});

	useEffect(() => {
		formMethods.reset(initialValues);
	}, [initialValues, formMethods]);

	return (
		<form className={className} onSubmit={formMethods.handleSubmit(onSubmit)}>
			{children(formMethods)}
		</form>
	);
};

Form.Input = InputForm;
Form.Select = SelectForm;
Form.Checkbox = CheckboxForm;
Form.Image = ImageForm;
Form.Toggle = ToggleForm;

export default Form;
