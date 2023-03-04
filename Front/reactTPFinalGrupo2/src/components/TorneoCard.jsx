import '../styles/torneoCard.css'
import { useState, useEffect, useRef } from 'react'
import * as API from '../services/torneosService'
import { NombreEquipo } from './NombreEquipo'
import { v4 as uuidv4 } from 'uuid'

export function TorneoCard(props) {
  //Constructor
  let juego = props.juego;
  let fecha = props.fecha.split("T")[0];
  let localidad = props.localidad;
  let estado = false;
  let equipos = props.equipos;
  let juegos = props.juegos;
  if (props.estado == 1) {
    estado = true;
  }
  
  //Referencias
  const fechaEd = useRef();
  const id_juego = useRef();
  const id_localidad = useRef();
  const id_primerPuesto = useRef();
  const id_segundoPuesto = useRef();
  const id_tercerPuesto = useRef();

  //Estados
  const [editar, setEditar] = useState(false)

  //Utilidades
  const estadoTorneo = async(id, estado) => {
    const datos_enviar = {
        estado: estado
    };
    const respuesta = await API.estadoTorneo(props.id, datos_enviar)
    respuesta.status?
    console.log(respuesta.mensaje):
    console.log(respuesta.mensaje);;
    window.location.reload(false);
    }

  const renderEditarForm = () => {
    setEditar(!editar);
  }

  const editarTorneo = async (id) => {
    let control = false;

    const datos_enviar = {
      fecha: fechaEd.current.value,
      id_juego: id_juego.current.value,
      id_localidad: id_localidad.current.value,
      id_primerPuesto: id_primerPuesto.current.value,
      id_segundoPuesto: id_segundoPuesto.current.value,
      id_tercerPuesto: id_tercerPuesto.current.value
    };

    for (const propiedad in datos_enviar) {
      if (datos_enviar[propiedad] == "0" || datos_enviar[propiedad] == "") {
        control = true;
      }
    }

    if (control) {
      console.log("Completá el formulario y portate bien.");
      return
    } else {
      const respuesta = await (API.editarTorneo(id, datos_enviar));
      respuesta.status?
      console.log(respuesta.mensaje):
      console.log(respuesta.mensaje);;
      window.location.reload(false);
    }
  }

  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Fecha: {fecha}</h5>
            <p className="card-text">ID: {props.id}</p>
            <p className="card-text">Juego: {juego}</p>
            <p className="card-text">Localidad: {localidad}</p>
            <p className="card-text"><NombreEquipo equipos={equipos} id={props.primero} posicion={"1"}/></p>
            <p className="card-text"><NombreEquipo equipos={equipos} id={props.segundo} posicion={"2"}/></p>
            <p className="card-text"><NombreEquipo equipos={equipos} id={props.tercero} posicion={"3"}/></p>
        </div>
        <div className="cardBotonesContainer">
            <button onClick={() => renderEditarForm()} className="btn btn-primary">Editar</button>
            {estado?
            <button onClick={() => estadoTorneo(props.id, "0")} className="btn btn-success">Activo</button>:
            <button onClick={() => estadoTorneo(props.id, "1")} className="btn btn-danger">Inactivo</button>}
        </div>
        {editar?
            <form className={`editarContainer`}>
            <div>
              <label htmlFor="fechaTorneo" className="form-label mb-2 mt-3">Nueva fecha</label>
              <input type="date" className="form-control mb-3" id="fechaTorneo" 
              aria-describedby="fecha del torneo" ref={fechaEd}/>
  
              <label htmlFor="juegoTorneo" className="form-label mb-2">Juego del torneo</label>
              <select className="form-select" aria-label="Juegos activos para elegir" ref={id_juego}>
                <option className="dropdown-item" value="0">Elija un juego</option>
                {juegos.map((juego) => {
                  if (juego.estado != 0) {
                    return (
                      <option key={uuidv4()} className="dropdown-item" value={juego.id}>{juego.nombre}</option>
                    )
                  }
                  })}
              </select>
  
              <label htmlFor="localidadTorneo" className="form-label mb-2 mt-3">Localidad del torneo</label>
              <select className="form-select" aria-label="Elegir localidad del torneo" ref={id_localidad}>
                <option className="dropdown-item" value="0">Elija una localidad</option>
                <option className="dropdown-item" value="1">Posadas</option>
                <option className="dropdown-item" value="2">Garupá</option>
                <option className="dropdown-item" value="3">Fachinal</option>
                <option className="dropdown-item" value="4">Capioví</option>
                <option className="dropdown-item" value="5">Puerto Rico</option>
                <option className="dropdown-item" value="6">Garuhapé</option>
                <option className="dropdown-item" value="7">Oberá</option>
                <option className="dropdown-item" value="8">Los Helechos</option>
                <option className="dropdown-item" value="9">Campo Viera</option>
                <option className="dropdown-item" value="10">Puerto Esperanza</option>
                <option className="dropdown-item" value="11">Puerto Iguazú</option>
                <option className="dropdown-item" value="12">Puerto Libertad</option>
              </select>
  
              <label htmlFor="primerPuesto" className="form-label mb-2 mt-3">Primer puesto</label>
              <select className="form-select" aria-label="Equipos activos para elegir primer puesto" ref={id_primerPuesto}>
                <option className="dropdown-item" value="0">Elija el equipo del primer puesto</option>
                {equipos.map((equipo) => {
                  if (equipo.estado != 0) {
                    return (
                      <option key={uuidv4()} className="dropdown-item" value={equipo.id}>{equipo.nombre}</option>
                    )
                  }
                  })}
              </select>
  
              <label htmlFor="segundoPuesto" className="form-label mb-2 mt-3">Segundo puesto</label>
              <select className="form-select" aria-label="Equipos activos para elegir segundo puesto" ref={id_segundoPuesto}>
                <option className="dropdown-item" value="0">Elija el equipo del segundo puesto</option>
                {equipos.map((equipo) => {
                  if (equipo.estado != 0) {
                    return (
                      <option key={uuidv4()} className="dropdown-item" value={equipo.id}>{equipo.nombre}</option>
                    )
                  }
                  })}
              </select>
  
              <label htmlFor="tercerPuesto" className="form-label mt-3">Tercer puesto</label>
              <select className="form-select" aria-label="Equipos activos para elegir tercer puesto" ref={id_tercerPuesto}>
                <option className="dropdown-item" value="0">Elija el equipo del tercer puesto</option>
                {equipos.map((equipo) => {
                  if (equipo.estado != 0) {
                    return (
                      <option key={uuidv4()} className="dropdown-item" value={equipo.id}>{equipo.nombre}</option>
                    )
                  }
                  })}
              </select>
            </div>
            <button onClick={() => editarTorneo(props.id)} type="button" className="btn btn-primary mt-3">Confirmar edición</button>
          </form>: 
          <></>}
    </div>
  )
}
