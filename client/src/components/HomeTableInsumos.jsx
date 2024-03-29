import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInsumosHome } from '../redux/actions';
import { Link } from 'react-router-dom';
import { RiEdit2Line } from 'react-icons/ri';
import { RiDeleteBin5Line } from 'react-icons/ri';

export default function HomeTableInsumos() {
	const homeInsumos = useSelector((state) => state.insumosHome);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getInsumosHome());
	}, [dispatch]);

	return (
		<div className="sm:w-max">
			<table className="hover:shadow-2xl hover:shadow-black delay-75 sm:w-[60vw] bg-slate-300">
				<thead>
					<tr className="text-black border-2 border-black ">
						<th className="px-2 border-2 border-black sm:w-56">Insumo</th>
						<th className="px-2 border-2 border-black sm:w-28">Stock </th>
						<th className="px-2 border-2 border-black sm:w-28">Min. deseado</th>
						<th className="px-2 border-2 border-black sm:w-28">Diferencia</th>
						<th className="px-2 border-2 border-black sm:w-28">
							Editar/Borrar
						</th>
					</tr>
				</thead>
				<tbody>
					{homeInsumos?.map((i) => {
						return (
							<tr className="text-black border-2 border-black " key={i.id}>
								<td className="px-2 border-2 border-black">{i.name}</td>
								<td className="px-2 border-2 border-black">{i.stock}</td>
								<td className="px-2 border-2 border-black">{i.min}</td>

								{i.difference > 0 ? (
									<td className="px-2 border-2 border-black">{i.difference}</td>
								) : (
									<td className="px-2 border-2 border-black bg-red-500">
										{i.difference}
									</td>
								)}

								<td className="px-2  flex justify-center">
									<Link to={`/insumo/${i.id}`} className="flex justify-center">
										<RiEdit2Line />
										<RiDeleteBin5Line className="text-red-800 font-bold ml-3" />
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
