import React, { useState, useEffect } from "react";
import { Link } from "react-dom";
export function Home() {
	const style = {
		borderBottom: "1px solid green"
	};
	const styleItems = {
		borderBottom: "1px solid green"
		// borderTop: "1px solid green"
	};
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

	return (
		<div className="text-center mt-5">
			<h1 className="text-secondary">Todo List</h1>
			<form
				onSubmit={agregarTarea}
				className="d-flex justify-content-center">
				<input
					className="form-control col-5 "
					placeholder="Agregar tarea"
					onChange={e => setName(e.target.value)}
					value={name}
				/>
			</form>
			<div className="d-flex flex-column align-items-center">
				<div className="rounded bg-dark col-5">
					<div className="text-warning  ">
						{arr.map((elem, index) => {
							return (
								<div
									key={index}
									className="d-flex justify-content-between mostrarBtn"
									style={style}>
									<h4 className="p-1">{elem}</h4>
									<div>
										<button
											className={"btn a btn-primary m-2 "}
											onClick={() => eliminarName(index)}>
											X
										</button>
									</div>
								</div>
							);
						})}
					</div>
					<div
						style={styleItems}
						className="bg-dark rounded d-flex justify-content-start text-secondary">
						<h6>{arr.length} Items</h6>
					</div>
				</div>
			</div>
		</div>
		// </div>
	);
}
