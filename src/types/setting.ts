export interface Setting {
	id: number;
	navbar: string;
	footer: string;
	created_at: string | null;
	updated_at: string | null;
}

export interface UpdateSetting {
	navbar: string;
	footer: string;
}

export interface UpdateSettingFormik extends UpdateSetting {}
