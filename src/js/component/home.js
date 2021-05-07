import React, { useState, useEffect } from "react";

export function Home() {
	// const [lista, setLista] = useState([{ label: "", done: false }]);
	const [name, setName] = useState("");
	const [arr, setArr] = useState([]);
	const [cambiar, setCambiar] = useState(false);
	const [agregar, setAgregar] = useState(false);
	const [lista, setLista] = useState([]);

	const llamar = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/lmarrero"
			);
			const data = await res.json();
			console.log("GET: " + data);
			setLista(data);
			console.log("GET lista: ", lista);
		} catch (error) {
			console.log(error);
		}
	};
	const enviar = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/lmarrero",
				{
					method: "PUT",
					body: JSON.stringify(arr),
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			const data = await res.json();
			console.log("PUT: ", data);
			setAgregar(true);
		} catch (error) {
			console.log("Error: ", error);
		}
	};

	const agregarTarea = e => {
		e.preventDefault();
		console.log("LISTAAA:  " + lista.label);
		let aux = arr;
		let obj = { label: name, done: false };
		aux.push(obj);
		setArr(aux);
		setName("");
		enviar();
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

	useEffect(() => {
		llamar();
	}, []);

	useEffect(() => {
		if (agregar) {
			llamar();
		}
		setAgregar(false);
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
						{lista.map((elem, index) => {
							return (
								<div
									key={index}
									className="d-flex justify-content-between mostrarBtn"
									style={{ borderBottom: "1px solid green" }}>
									<h4 className="p-1">{elem.label}</h4>
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
						style={{ borderBottom: "1px solid green" }}
						className="bg-dark rounded d-flex justify-content-start text-secondary">
						<h6>{arr.length} Items</h6>
					</div>
				</div>
			</div>
		</div>
		// </div>
	);
}
