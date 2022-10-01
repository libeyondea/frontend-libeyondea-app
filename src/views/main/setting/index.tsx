import { FormikHelpers } from 'formik';
import { Fragment } from 'react';
import * as Yup from 'yup';

import Breadcrumb from 'src/components/Breadcrumb';
import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Form from 'src/components/Form';
import { SpinLoading } from 'src/components/Loading';
import useOnceEffect from 'src/hooks/useOnceEffect';
import settingService from 'src/services/settingService';
import { useDispatch, useSelector } from 'src/store';
import {
	settingShowDataRequestAction,
	settingShowLoadingRequestAction,
	settingUpdateDataRequestAction,
	settingUpdateLoadingRequestAction
} from 'src/store/setting/actions';
import { selectSettingShow, selectSettingUpdate } from 'src/store/setting/selectors';
import { UpdateSettingFormik } from 'src/types/setting';
import errorHandler from 'src/utils/errorHandler';
import toastify from 'src/utils/toastify';

const SettingPage = () => {
	const dispatch = useDispatch();
	const settingShow = useSelector(selectSettingShow);
	const settingUpdate = useSelector(selectSettingUpdate);

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
				errorHandler((error) => {
					if (error.type === 'validation-error') {
						formikHelpers.setErrors(error.error.response?.data?.errors);
					}
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
			<Breadcrumb className="mb-4">Settings</Breadcrumb>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<Card title="Settings">
						{settingShow.loading ? (
							<SpinLoading />
						) : (
							<Form<UpdateSettingFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
								{(props) => (
									<div className="grid grid-cols-2 gap-4">
										<div className="col-span-2 md:col-span-1">
											<Form.Toggle
												id="fixed_navbar"
												label="Fixed navbar"
												checked={props.values.fixed_navbar}
												error={props.errors.fixed_navbar}
												touched={props.touched.fixed_navbar}
												{...props.getFieldProps('fixed_navbar')}
											/>
										</div>
										<div className="col-span-2 md:col-span-1">
											<Form.Toggle
												id="fixed_footer"
												label="Fixed footer"
												checked={props.values.fixed_footer}
												error={props.errors.fixed_footer}
												touched={props.touched.fixed_footer}
												{...props.getFieldProps('fixed_footer')}
											/>
										</div>
										<div className="col-span-2 flex flex-row-reverse">
											<Button type="submit" loading={settingUpdate.loading} disabled={settingUpdate.loading}>
												{settingUpdate.loading ? 'Updating' : 'Update'}
											</Button>
										</div>
									</div>
								)}
							</Form>
						)}
					</Card>
				</div>
			</div>
		</Fragment>
	);
};

export default SettingPage;
