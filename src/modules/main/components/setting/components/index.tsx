import { FormikHelpers } from 'formik';
import { Fragment } from 'react';
import * as Yup from 'yup';

import BreadcrumbComponent from 'src/components/Breadcrumb/components';
import ButtonComponent from 'src/components/Button/components';
import CardComponent from 'src/components/Card/components';
import FormComponent from 'src/components/Form/components';
import { SpinLoadingComponent } from 'src/components/Loading/components';
import errorHandler from 'src/helpers/errorHandler';
import toastify from 'src/helpers/toastify';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useOnceEffect from 'src/hooks/useOnceEffect';
import settingService from 'src/services/settingService';
import {
	settingShowDataRequestAction,
	settingShowLoadingRequestAction,
	settingUpdateDataRequestAction,
	settingUpdateLoadingRequestAction
} from 'src/store/setting/actions';
import { selectSettingShow, selectSettingUpdate } from 'src/store/setting/selectors';
import { UpdateSettingFormik } from 'src/types/setting';

const SettingComponent = () => {
	const dispatch = useAppDispatch();
	const settingShow = useAppSelector(selectSettingShow);
	const settingUpdate = useAppSelector(selectSettingUpdate);

	const initialValues: UpdateSettingFormik = {
		fixed_navbar: settingShow.data.fixed_navbar,
		fixed_footer: settingShow.data.fixed_footer
	};

	const validationSchema = Yup.object({
		fixed_navbar: Yup.boolean(),
		fixed_footer: Yup.boolean()
	});

	const onSubmit = (values: UpdateSettingFormik, formikHelpers: FormikHelpers<UpdateSettingFormik>) => {
		dispatch(settingUpdateLoadingRequestAction(true));
		const payload = {
			fixed_navbar: values.fixed_navbar,
			fixed_footer: values.fixed_footer
		};
		settingService
			.update(payload)
			.then((response) => {
				dispatch(settingUpdateDataRequestAction(response.data.data));
				toastify.success('Setting updated successfully.');
				setTimeout(() => {
					window.location.reload();
				}, 666);
			})
			.catch(
				errorHandler(undefined, (validationError) => {
					formikHelpers.setErrors(validationError.response?.data?.errors);
				})
			)
			.finally(() => {
				dispatch(settingUpdateLoadingRequestAction(false));
			});
	};

	useOnceEffect(() => {
		dispatch(settingShowLoadingRequestAction(true));
		settingService
			.show()
			.then((response) => {
				dispatch(settingShowDataRequestAction(response.data.data));
			})
			.catch(errorHandler())
			.finally(() => {
				dispatch(settingShowLoadingRequestAction(false));
			});
	});

	return (
		<Fragment>
			<BreadcrumbComponent className="mb-4">Settings</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent title="Settings">
						{settingShow.loading ? (
							<SpinLoadingComponent />
						) : !settingShow.data.id ? (
							<div className="flex justify-center">Not found.</div>
						) : (
							<FormComponent<UpdateSettingFormik>
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
								enableReinitialize
							>
								{(props) => (
									<div className="grid grid-cols-2 gap-4">
										<div className="col-span-2 md:col-span-1">
											<FormComponent.Toggle
												id="fixed_navbar"
												label="Fixed navbar"
												checked={props.values.fixed_navbar}
												error={props.errors.fixed_navbar}
												touched={props.touched.fixed_navbar}
												{...props.getFieldProps('fixed_navbar')}
											/>
										</div>
										<div className="col-span-2 md:col-span-1">
											<FormComponent.Toggle
												id="fixed_footer"
												label="Fixed footer"
												checked={props.values.fixed_footer}
												error={props.errors.fixed_footer}
												touched={props.touched.fixed_footer}
												{...props.getFieldProps('fixed_footer')}
											/>
										</div>
										<div className="col-span-2 flex flex-row-reverse">
											<ButtonComponent type="submit" loading={settingUpdate.loading} disabled={settingUpdate.loading}>
												{settingUpdate.loading ? 'Updating' : 'Update'}
											</ButtonComponent>
										</div>
									</div>
								)}
							</FormComponent>
						)}
					</CardComponent>
				</div>
			</div>
		</Fragment>
	);
};

export default SettingComponent;
