export interface Setting {
	id: number;
	fixed_navbar: boolean;
	fixed_footer: boolean;
	created_at: string | null;
	updated_at: string | null;
}

export interface UpdateSetting {
	fixed_navbar: boolean;
	fixed_footer: boolean;
}

export interface UpdateSettingFormik extends UpdateSetting {}
