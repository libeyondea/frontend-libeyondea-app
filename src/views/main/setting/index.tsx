import { FormikHelpers } from 'formik';
import _ from 'lodash';
import { useEffectOnce } from 'react-use';
import * as Yup from 'yup';

import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Form from 'src/components/Form';
import { SpinLoading } from 'src/components/Loading';
import * as settingConstant from 'src/constants/setting';
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
		theme: settingShow.data.theme || settingConstant.SETTING_THEME_LIGHT
	};

	const validationSchema = Yup.object({
		theme: Yup.string()
			.required('The theme is required.')
			.oneOf([...settingConstant.SETTING_THEME_ALL], 'The theme invalid.')
	});

	const onSubmit = (values: UpdateSettingFormik, formikHelpers: FormikHelpers<UpdateSettingFormik>) => {
		dispatch(settingUpdateLoadingRequestAction(true));
		const payload = {
			theme: values.theme
		};
		settingService
			.update(payload)
			.then((response) => {
				dispatch(settingUpdateDataRequestAction(response.data.data));
				toastify.success('Setting updated successfully.');
				_.delay(() => {
					window.location.reload();
				}, 600);
			})
			.catch(
				errorHandler((error) => {
					if (error.type === 'validation-error') {
						// formikHelpers.setErrors(error.error.response?.data?.errors);
					}
				})
			)
			.finally(() => {
				dispatch(settingUpdateLoadingRequestAction(false));
			});
	};

	useEffectOnce(() => {
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
		<div className="grid grid-cols-1 gap-4">
			<div className="col-span-1">
				<Card>
					<Card.Body>
						<Card.Title>Settings</Card.Title>
						<Card.Content>
							{settingShow.loading ? (
								<SpinLoading />
							) : (
								<Form<UpdateSettingFormik>
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={onSubmit}
									enableReinitialize
								>
									{(props) => (
										<div className="grid grid-cols-2 gap-4">
											<div className="col-span-2 md:col-span-1">
												<Form.Select
													label="Theme"
													options={[...settingConstant.SETTING_THEME_ALL]}
													error={Boolean(props.errors.theme && props.touched.theme)}
													helperText={props.errors.theme}
													{...props.getFieldProps('theme')}
												/>
											</div>
											<div className="col-span-2 flex flex-row-reverse">
												<Button type="submit" loading={settingUpdate.loading}>
													{settingUpdate.loading ? 'Updating' : 'Update'}
												</Button>
											</div>
										</div>
									)}
								</Form>
							)}
						</Card.Content>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default SettingPage;
