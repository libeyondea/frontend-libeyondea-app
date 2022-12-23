import _ from 'lodash';

import Button from '../Button';
import Form from 'src/components/Form';
import { AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon } from 'src/components/Icon';

type Props = {
	page: number;
	pageSize: number;
	total: number;
	disabled?: boolean;
	onChangePage: (page: number) => void;
	onChangePageSize: (pageSize: number) => void;
};

const Pagination = ({ page, pageSize, total, disabled = false, onChangePage, onChangePageSize }: Props) => {
	const totalPages = _.ceil(total / pageSize);

	const _onChangePage = (page: number) => {
		onChangePage(page);
	};

	const _onChangePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChangePageSize(Number(event.target.value));
	};

	return (
		<div className="mt-4 flex items-center justify-start overflow-x-auto md:justify-end">
			<div className="mr-4 flex flex-none items-center">
				<span>
					<Form.Select
						size="sm"
						focusOutline={false}
						name="page_size"
						value={pageSize}
						onChange={(event) => _onChangePageSize(event)}
						options={[10, 20, 50, 100]}
						disabled={disabled}
					/>
				</span>
				<span className="mx-2"> | </span>
				<span>
					<span className="font-semibold">{pageSize * page - pageSize + 1}</span> &#8211; <span className="font-semibold">{pageSize * page}</span> of{' '}
					<span className="font-semibold">{total}</span>
				</span>
			</div>
			<div className="flex flex-none items-center">
				<nav className="btn-group">
					<Button color="primary" variant="outlined" onClick={() => _onChangePage(1)} disabled={page <= 1 || disabled}>
						<AngleDoubleLeftIcon className="h-4 w-4" />
					</Button>
					<Button color="primary" variant="outlined" onClick={() => _onChangePage(page - 1)} disabled={page <= 1 || disabled}>
						<AngleLeftIcon className="h-4 w-4" />
					</Button>
					<Button color="primary" variant="outlined" onClick={() => _onChangePage(page + 1)} disabled={page >= totalPages || disabled}>
						<AngleRightIcon className="h-4 w-4" />
					</Button>
					<Button color="primary" variant="outlined" onClick={() => _onChangePage(totalPages)} disabled={page >= totalPages || disabled}>
						<AngleDoubleRightIcon className="h-4 w-4" />
					</Button>
				</nav>
			</div>
		</div>
	);
};

export default Pagination;
