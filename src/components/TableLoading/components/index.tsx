type Props = {};

const TableLoadingComponent: React.FC<Props> = () => {
	return (
		<div className="flex flex-col animate-pulse">
			<div className="align-middle inline-block min-w-full">
				<div className="overflow-hidden border-2 border-gray-200 rounded-md">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th scope="col" className="px-2 py-2 text-left text-sm font-medium text-gray-500 tracking-wider">
									<div className="h-6 bg-slate-200 rounded-md"></div>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							<tr>
								<td className="px-2 py-2 whitespace-nowrap">
									<div className="h-6 bg-slate-200 rounded-md"></div>
								</td>
							</tr>
							<tr>
								<td className="px-2 py-2 whitespace-nowrap">
									<div className="h-6 bg-slate-200 rounded-md"></div>
								</td>
							</tr>
							<tr>
								<td className="px-2 py-2 whitespace-nowrap">
									<div className="h-6 bg-slate-200 rounded-md"></div>
								</td>
							</tr>
							<tr>
								<td className="px-2 py-2 whitespace-nowrap">
									<div className="h-6 bg-slate-200 rounded-md"></div>
								</td>
							</tr>
							<tr>
								<td className="px-2 py-2 whitespace-nowrap">
									<div className="h-6 bg-slate-200 rounded-md"></div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default TableLoadingComponent;
