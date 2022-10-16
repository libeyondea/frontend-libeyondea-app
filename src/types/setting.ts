export interface Setting {
	id: number;
	theme: string;
	created_at: string | null;
	updated_at: string | null;
}

export interface UpdateSetting {
	theme: string;
}

export interface UpdateSettingFormik extends UpdateSetting {}
