import React from 'react';
import Menu from './Menu';
import HomeTableInsumos from './HomeTableInsumos';
import HomeTableProds from './HomeTableProds';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div className="sm:flex mb-10 sm:w-full">
			<div>
				<div
					className={` sm:h-full bg-sky-900/75 border-4 border-sky-800 sm:fixed   `}
				>
					<SideBar />
				</div>
			</div>
			<div className="max-w-full  sm:ml-80	  ">
				<h1 className="text-black text-xl font-bold pt-4 sm:flex sm:justify-center sm:text-6xl sm:font-bold  sm:pt-10 underline">
					{' '}
					Gestor de inventarios
				</h1>
				<div className=" ">
					<div className="pr-8">
						<div className="flex flex-col pt-10 pl-2 sm:pt-10   ">
							<h1 className="font-bold font-mono sm:text-xl text-blue-800 text-xl">
								Insumos
							</h1>
							<div className="">
								<Link to="/insumos">
									<HomeTableInsumos />
								</Link>
							</div>
						</div>
					</div>
					<div className="pr-8">
						<div className="flex flex-col pt-10 pl-2  sm:pt-10  ">
							<h1 className="font-bold font-mono sm:text-xl text-blue-800 text-xl ">
								Productos
							</h1>
							<Link to="/productos">
								<HomeTableProds />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
