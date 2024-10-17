import React, { useState, useEffect } from 'react';
import { BarsArrowDownIcon, ListBulletIcon, ChartBarIcon, UserCircleIcon, FolderIcon, ChartPieIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'; // Importa los iconos de Heroicons
import TaskTable from '../components/TaskTable';
import Chart from '../components/Chart';
import Projects from '../components/Projects';
import UsersChart from '../components/UsersChart';
import PolarChart from '../components/PolarChart';
import ProjectReport from '../components/ProjectReport';

function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar el menú hamburguesa
  const [activeComponent, setActiveComponent] = useState('ProjectReport'); // Estado para manejar el componente activo

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Cambiar el estado al hacer clic
  };

  const handleClickOutside = (event) => {
    const menu = document.getElementById('hamburger-menu');
    const button = document.getElementById('hamburger-button');
    // Cerrar el menú si el clic está fuera de él y del botón
    if (menu && !menu.contains(event.target) && button && !button.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Agregar el manejador al documento
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Limpiar el manejador al desmontar
    };
  }, []);

  return (
    <div className="flex sm:flex flex-wrap pt-16 h-screen print:pt-0">

      {/* Ícono de hamburguesa visible solo en pantallas pequeñas */}
      <div className="ml-3 z-40 fixed bg-black rounded-sm border border-green-500 print:hidden">
        <button onClick={toggleMenu} className="p-1 text-white" id="hamburger-button">
          {/* Ícono de hamburguesa */}

          <BarsArrowDownIcon className="h-6 w-6 print:hidden" />
        </button>
      </div>
      {/* Menú lateral para pantallas pequeñas (controlado por el estado isOpen) */}
      <div
        id="hamburger-menu"
        className={`flex flex-col mt-10 h-screen p-5 -ml-6 gap-5 fixed left-0 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
        <p className="bg-black p-2 border text-white border-zinc-500  flex items-center gap-2 rounded-sm cursor-pointer"
          onClick={() => setActiveComponent('ProjectReport')}>
          <ClipboardDocumentListIcon className="h-5 w-5 text-white" /><span className="sr-only">Project Report</span>
        </p>
        <p className="bg-black p-2 border text-white border-zinc-500  flex items-center gap-2 rounded-sm cursor-pointer"
          onClick={() => setActiveComponent('list')}>
          <ListBulletIcon className="h-5 w-5 text-white" /><span className="sr-only">List</span>
        </p>
        <p className="bg-black p-2 border text-white border-zinc-500 flex items-center gap-2 rounded-sm cursor-pointer"
          onClick={() => setActiveComponent('chart')}>
          <ChartBarIcon className="h-5 w-5 text-green-500" /> <span className="sr-only">Progress</span>
        </p>
        <p className="bg-black p-2 border text-white border-zinc-500 flex items-center gap-2 rounded-sm cursor-pointer"
          onClick={() => setActiveComponent('UsersChart')}>
          <UserCircleIcon className="h-5 w-5 text-blue-600" /> <span className="sr-only">Users</span>
        </p>
        <p className="bg-black p-2 border text-white border-zinc-500 flex items-center gap-2 rounded-sm cursor-pointer"
          onClick={() => setActiveComponent('PolarChart')}>
          <ChartPieIcon className="h-5 w-5 text-green-500" /> <span className="sr-only">Users</span>
        </p>
        <p className=" bg-black p-2 border text-white border-zinc-500 flex items-center gap-2 rounded- cursor-pointer"
          onClick={() => setActiveComponent('Projects')}>
          <FolderIcon className="h-5 w-5 text-yellow-500" /><span className="sr-only">Projects</span>
        </p>
      </div>


      {/* Sección derecha con scroll interno */}
      <div className="">
        {/* Footer con tu nombre y developer */}
        <footer className="w-full py-4 px-1 print:block hidden">

          <div className='flex gap-4'>
            <div className="h-14 w-14 overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}logo.svg`}
                alt="PPI"
                className="h-full w-full object-cover object-center scale-125 "
              />
            </div>
            <div>
              <p className="text-green-950 font-bold">PANAMERICAN PRIVATE INVESTMENTS</p>
              <p className="text-black">Progress Report</p>
            </div>

          </div>

        </footer>
        {/* Contenido dinámico del lado derecho */}
        <div className="flex justify-center items-center w-screen px-1">

          {activeComponent === 'ProjectReport' && (
            <div className="flex w-full max-w-screen overflow-x-auto justify-center">
              <ProjectReport />
            </div>
          )}

          {activeComponent === 'chart' && (
            <div className="lg:w-2/3 max-w-screen max-h-screen overflow-x-auto">
              <Chart />
            </div>
          )}

          {activeComponent === 'list' && (
            <div className="flex w-full max-w-screen overflow-x-auto justify-center">
              <TaskTable />
            </div>
          )}

          {activeComponent === 'Projects' && (
            <div className="flex w-full max-w-screen overflow-x-auto justify-center lg:px-28">
              <Projects />
            </div>
          )}

          {activeComponent === 'UsersChart' && (
            <div className="lg:w-2/3 max-w-screen max-h-screen overflow-y-auto">
              <UsersChart />
            </div>
          )}

          {activeComponent === 'PolarChart' && (
            <div className="lg:w-5/12 w-screen h-screen">
              <PolarChart />
            </div>
          )}
        </div>

        {/* Footer con tu nombre y developer */}
        <footer className="w-full py-4 px-1 mt-4 print:block hidden">

          <div className='flex gap-4'>
            <div className="h-14 w-14 overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}logo.svg`}
                alt="PPI"
                className="h-full w-full object-cover object-center scale-125 "
              />
            </div>
            <div>
              <p className="text-green-950 font-bold">Yosef David Giraldo Salazar</p>
              <p className="text-black">Developer</p>
            </div>

          </div>

        </footer>
      </div>

    </div>
  );
}

export default ProfilePage;

