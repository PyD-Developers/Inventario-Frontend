import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInsumos } from '../redux/actions';
import { createProd } from '../redux/actions';
import { Link } from 'react-router-dom';
import '../styles.css';
import Menu from './Menu';

export default function CrearProd() {
	const dispatch = useDispatch();
	const allInsumos = useSelector((state) => state.allInsumos);

	const [input, setInput] = useState({
		name: '',
		img: '',
		details: '',
		stock: 0,
		min: 0,
		insumos: [],
		defaultInput: [],
		aux: {}
	});
	const [image, setImage] = useState('');
	const [link, setLink] = useState('');

	const [loading, setLoading] = React.useState(1);

	const [errors, setErrors] = React.useState({});

	const [valueIns, setValueIns] = useState('');
	const [valueCant, setValueCant] = useState('');

	useEffect(() => {
		dispatch(getInsumos('name', 'ASC'));
	}, [dispatch]);

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value.toLowerCase()
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(createProd(input));
		alert('Producto creado satisfactoriamente');
		setInput({
			name: '',
			img: '',
			details: '',
			stock: 0,
			min: 0,
			insumos: [],
			defaultInput: [],
			aux: {}
		});
		window.location.reload();
	};

	const handleSelect = (e) => {
		e.preventDefault();
		setValueIns(e.target.value);

		setInput({
			...input,
			insumos: [...new Set([...input.insumos, e.target.value])],
			aux: { insumos: e.target.value }
		});
	};

	const handleChangeCant = (e) => {
		e.preventDefault();
		setValueCant(e.target.value);
		setInput({
			...input,
			aux: { insumos: input.aux.insumos, cantidad: e.target.value }
		});
	};

	const handleSubCant = (e) => {
		e.preventDefault();
		input.defaultInput.push(input.aux);
		setInput({
			...input,
			aux: {}
		});
		setValueCant('');
		setValueIns('');
	};

	//------------------------------------------------------------
	//Cloudinary

	const handleimg = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		let size = 0; //toma valor numerico del archivo.
		if (files) {
			size += files[0].size;
		}

		data.append('file', files[0]);
		data.append('upload_preset', 'gestorDeInventario');

		try {
			const res = await fetch(
				'https://api.cloudinary.com/v1_1/dwblsrtdb/image/upload',
				{
					method: 'POST',
					body: data
				}
			);
			const file = await res.json();
			let array = file.secure_url.split('.');
			let format = array[array.length - 1];

			if (size > 2000000) {
				setErrors({
					...errors,
					img: 'El archivo es demasiado grande'
				});
			} else {
				if (format === 'jpg' || format === 'png') {
					setErrors({
						...errors,
						img: ''
					});
					setImage(file.secure_url);
					setLoading(0);
					setInput({
						...input,
						img: file.secure_url
					});
				} else {
					setErrors({
						...errors,
						img: 'Solo se admiten archivos formato jpeg o png'
					});
					setLoading(1);
				}
			}
		} catch (error) {
			setErrors({
				...errors,
				img: 'Solo se admiten archivos formato jpeg o png'
			});
			setLoading(1);
		}
	};

	//-----------------------------------------------------------------------------------------------------------------

	return (
		<div>
			<div>
				<Menu />
			</div>

			<div className="max-w-full  ">
				<Link
					to="/home"
					className="flex justify-start pt-2 pl-2 pb-2 sm:pt-10 "
				>
					<button className="text-black font-mono hover:text-white pr-2 pl-2 border-2 border-cyan-900 rounded-lg hover:bg-cyan-900 sm:py-2 sm:px-8 sm:text-xl mt-20 sm:mt-8">
						Volver
					</button>
				</Link>

				<h1 className=" flex justify-center text-black text-2xl sm:text-3xl underline font-bold pb-4 title">
					Agregar un nuevo producto
				</h1>
				<p className="flex justify-center ml-4 mr-4 pb-4 sm:pb-8">
					Agregar un nuevo producto detallando las características del mismo
				</p>
				<div className="flex justify-center ">
					<form className="flex flex-col">
						<div className="flex flex-col sm:text-xl sm:font-bold w-[90vw] sm:w-auto ml-2 sm:ml-0 ">
							<label className="">Nombre del producto: </label>
							<input
								className="border-2 border-cyan-900 rounded-xl "
								type="text"
								name="name"
								id=""
								value={input.name}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col sm:text-xl sm:font-bold w-[90vw] sm:w-auto ml-2 sm:ml-0 ">
							<label>Stock inicial:</label>
							<input
								className="border-2 border-cyan-900 rounded-xl"
								type="number"
								name="stock"
								id=""
								value={input.stock}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col sm:text-xl sm:font-bold w-[90vw] sm:w-auto ml-2 sm:ml-0 ">
							<label>Detalles del producto:</label>
							<input
								className="border-2 border-cyan-900 rounded-xl"
								type="text"
								name="details"
								id=""
								value={input.details}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col sm:text-xl sm:font-bold w-[90vw] sm:w-auto ml-2 sm:ml-0 ">
							<label>Stock minimo deseado:</label>
							<input
								className="border-2 border-cyan-900 rounded-xl"
								type="number"
								name="min"
								id=""
								value={input.min}
								onChange={handleChange}
							/>
						</div>

						<div className="flex flex-col sm:text-xl sm:font-bold w-[90vw] sm:w-auto ml-2 sm:ml-0 ">
							<label>Insumos utilizados:</label>
							<select
								className="border-2 border-cyan-900 rounded-xl"
								onChange={handleSelect}
								value={valueIns}
							>
								<option value="">Seleccione un insumo</option>
								{allInsumos?.map((i) => (
									<option value={i.name} key={i.id}>
										{i.name}
									</option>
								))}
							</select>

							<div className="flex flex-row sm:flex-row py-2	w-[90vw] sm:w-auto ml-2 sm:ml-0 ">
								<span value={valueCant}>
									<div className="flex sm:pt-4 rounded-xl">
										<input
											onChange={(e) => handleChangeCant(e)}
											type="number"
											placeholder="seleccione cantidad"
											value={valueCant}
											className="rounded-xl"
										/>
										<div className="py-2 pl-4">
											{valueIns !== '' ? (
												<button
													onClick={(e) => handleSubCant(e)}
													className="border-2 border-cyan-900 rounded-xl px-1 "
												>
													Cargar insumo
												</button>
											) : (
												<p></p>
											)}
										</div>
									</div>
								</span>
							</div>
							{input.defaultInput.map((e) => {
								return (
									<div className="flex flex-col sm:flex-row mb-4">
										<h1 className="text-xl font-thin">{e.insumos} - </h1>
										<h2 className="sm:pl-2 text-xl font-thin">
											Cantidad: {e.cantidad}
										</h2>
									</div>
								);
							})}
						</div>

						<div>
							<label className="flex flex-col sm:text-xl sm:font-bold pb-2 w-[90vw] sm:w-auto ml-2 sm:ml-0 ">
								{' '}
								Imagen del producto:
							</label>
							<input
								className="border-2 border-cyan-900 rounded-xl w-[90vw] sm:w-auto ml-2 sm:ml-0 "
								id="inputFile"
								type="file"
								name="image"
								onChange={(e) => handleimg(e)}
							/>

							{loading === 0 ? (
								<div>
									<br />
									<img
										src={image}
										alt=""
										className="border-2 border-cyan-900 rounded-xl w-32 h-32 sm:w-64 sm:h-56"
									/>
									<br />
								</div>
							) : (
								false
							)}
							{errors.img ? errors.img : false}
							<br />
							<div className="pt-2 pb-8 flex justify-center">
								{input.name ? (
									<button
										onClick={(e) => handleSubmit(e)}
										className=" border-2 border-cyan-900 py-2 px-4 rounded-xl hover:bg-cyan-900 hover:text-white font-bold"
									>
										Guardar cambios
									</button>
								) : (
									<p className="text-red-400">
										Debe ingresar el nombre del producto
									</p>
								)}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
