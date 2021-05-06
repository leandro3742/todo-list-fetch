import React, { useState, useEffect } from "react";
import { Link } from "react-dom";
export function Home() {
	const [name, setName] = useState("");
	const [arr, setArr] = useState([]);
	const [cambiar, setCambiar] = useState(false);

	const agregarTarea = e => {
		e.preventDefault();
		let aux = arr;
		aux.push(name);
		setArr(aux);
		setName("");
	};

	const eliminarName = index => {
		let aux = arr;
		while (index < aux.length - 1) {
			aux[index] = aux[index + 1];
			index++;
		}
		aux.length = index;
		setArr(aux);
		setCambiar(true);
	};

	useEffect(() => {
		if (cambiar === true) {
			setArr(arr);
			setCambiar(false);
		}
	});

	const style = {
		borderBottom: "1px solid green"
	};
	return (
		<div className="text-center mt-5">
			<h1 className="text-secondary">Todo List</h1>
			<form
				onSubmit={agregarTarea}
				className="d-flex justify-content-center">
				<input
					className="form-control col-3 "
					placeholder="Agregar tarea"
					onChange={e => setName(e.target.value)}
					value={name}
				/>
			</form>
			<div className="d-flex justify-content-center">
				<div className="bg-dark text-warning col-3 rounded">
					{arr.map((elem, index) => {
						return (
							<div
								key={index}
								className="d-flex justify-content-between"
								style={style}>
								<h2>{elem}</h2>
								<div>
									<button
										className="btn btn-primary m-2"
										onClick={() => eliminarName(index)}>
										X
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
