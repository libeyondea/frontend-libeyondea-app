export interface Setting {
	id: number;
	navbar: string;
	created_at: string | null;
	updated_at: string | null;
}

export interface UpdateSetting {
	navbar: string;
}

export interface UpdateSettingFormik extends UpdateSetting {}
