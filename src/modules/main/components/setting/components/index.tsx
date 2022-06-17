import { FormikHelpers } from 'formik';
import { Fragment } from 'react';
import * as Yup from 'yup';

import BreadcrumbComponent from 'src/components/Breadcrumb/components';
import ButtonComponent from 'src/components/Button/components';
import CardComponent from 'src/components/Card/components';
import FormComponent from 'src/components/Form/components';
import LoadingComponent from 'src/components/Loading/components';
import * as settingConstant from 'src/constants/setting';
import { errorHandler } from 'src/helpers/error';
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

type Props = {};

const SettingComponent: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const settingShow = useAppSelector(selectSettingShow);
	const settingUpdate = useAppSelector(selectSettingUpdate);

	const initialValues: UpdateSettingFormik = {
		navbar: settingShow.data.navbar || ''
	};

	const validationSchema = Yup.object({
		navbar: Yup.string()
			.required('The navbar is required.')
			.oneOf([settingConstant.SETTING_NAVBAR_FIXED, settingConstant.SETTING_NAVBAR_STATIC], 'The navbar invalid.')
	});

	const onSubmit = (values: UpdateSettingFormik, formikHelpers: FormikHelpers<UpdateSettingFormik>) => {
		dispatch(settingUpdateLoadingRequestAction(true));
		const payload = {
			navbar: values.navbar
		};
		settingService
			.update(payload)
			.then((response) => {
				dispatch(settingUpdateDataRequestAction(response.data.data));
				toastify.success('Setting updated successfully');
			})
			.catch(
				errorHandler(
					(axiosError) => {},
					(validationError) => formikHelpers.setErrors(validationError.data.errors),
					(stockError) => {}
				)
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
							<LoadingComponent />
						) : !Object.keys(settingShow.data).length ? (
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
											<FormComponent.Select
												id="navbar"
												label="Navbar"
												options={[
													{
														value: settingConstant.SETTING_NAVBAR_FIXED,
														label: 'Fixed'
													},
													{
														value: settingConstant.SETTING_NAVBAR_STATIC,
														label: 'Static'
													}
												]}
												error={props.errors.navbar}
												touched={props.touched.navbar}
												{...props.getFieldProps('navbar')}
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
