import { useEffect, useState } from "react";
import { useProjects } from "../context/ProjectsContext";
import { useAuth } from "../context/AuthContext";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ArrowPathIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

dayjs.extend(utc);
dayjs.extend(timezone);

function ProjectTable() {
    const { projects, getProjects, deleteProject } = useProjects();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            await getProjects();
            setLoading(false);
            console.log(projects);
        }
        fetchProjects();
    }, []);

    const handleDelete = (projectId) => {
        const confirmed = window.confirm("Are you sure you want to delete this project?");
        if (confirmed) {
            deleteProject(projectId);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <ArrowPathIcon className="animate-spin h-5 w-5" />
            <span className="ml-2">Loading projects...</span>
        </div>
    );

    return (
        <div className="mt-20 mx-6 md:mx-16">
            <Link
                to="/add-project"
                className="text-green-600 px-2 py-1 sm:px-2 rounded-sm text-sm sm:text-base border border-zinc-800 my-4">
                Add Project
            </Link> <br /><br />


            <div className="overflow-x-auto max-w-full  border border-zinc-800 rounded-lg">
                <table className="min-w-full text-left border-collapse bg-zinc-950">
                    <thead>
                        <tr className="border-b text-black">
                            <th className="text-white px-2 py-2 text-sm sm:text-xs">#</th>
                            <th className="text-white px-2 py-1 text-sm sm:text-xs">Project ID</th>
                            <th className="text-white px-2 py-1 text-sm sm:text-xs">Customer</th>
                            <th className="text-white px-2 py-1 text-sm sm:text-xs">Description</th>
                            <th className="text-white px-2 py-1 text-sm sm:text-xs">Start Date</th>
                            <th className="text-white px-2 py-1 text-sm sm:text-xs">End Date</th>
                            <th className="text-white px-2 py-1 text-sm sm:text-xs">Scripts</th>
                            <th className="text-white px-2 py-1 text-sm sm:text-xs">Attachments</th>
                            <th className="text-white px-2 py-1 text-sm sm:text-xs">Status</th>
                            <th className="text-white px-2 py-1 text-sm sm:text-xs">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={project._id} className="border-b border-zinc-700">
                                <td className="text-zinc-300 px-2 py-2 text-sm sm:text-xs">{index + 1}</td>
                                <td className="text-zinc-300 px-2 py-1 text-sm sm:text-xs">{project.projectId}</td>
                                <td className="text-zinc-300 px-2 py-1 text-sm sm:text-xs">{project.customerEmail}</td>
                                <td className="text-zinc-300 px-2 py-1 text-sm sm:text-xs">{project.description}</td>
                                <td className="text-zinc-300 px-2 py-1 text-sm sm:text-xs">
                                    {dayjs(project.startDate).format("DD-MMM-YYYY")}
                                </td>
                                <td className="text-zinc-300 px-2 py-1 text-sm sm:text-xs">
                                    {dayjs(project.endDate).format("DD-MMM-YYYY")}
                                </td>
                                <td className="text-zinc-300 px-2 py-1 text-sm sm:text-xs">{project.script}</td>
                                <td className="flex flex-col md:flex-row items-center gap-3 px-2 py-2 text-sm sm:text-xs">
                                    {project.file1 && (
                                        <a
                                            href={project.file1}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-200 hover:text-blue-500 hover:underline w-6 h-6"
                                        >
                                            <svg
                                                viewBox="0 0 1024 1024"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" // Hace que el icono herede el color del contenedor
                                            >
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        d="M182.52 146.2h585.14v256h73.15V73.06H109.38v877.71h256v-73.14H182.52z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M255.67 219.34h438.86v73.14H255.67zM255.67 365.63h365.71v73.14H255.67zM255.67 511.91H475.1v73.14H255.67zM775.22 458.24L439.04 794.42l-0.52 154.64 155.68 0.52L930.38 613.4 775.22 458.24z m51.72 155.16l-25.43 25.43-51.73-51.72 25.44-25.44 51.72 51.73z m-77.14 77.15L620.58 819.77l-51.72-51.72 129.22-129.22 51.72 51.72zM511.91 876.16l0.17-51.34 5.06-5.06 51.72 51.72-4.85 4.85-52.1-0.17z"
                                                        fill="currentColor"
                                                    />
                                                </g>
                                            </svg>
                                        </a>

                                    )}
                                    {project.file2 && (
                                        <a
                                            href={project.file2}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-200 hover:text-green-500 hover:underline w-6 h-6"
                                        >
                                            <svg
                                                viewBox="0 0 512 512"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" // El SVG toma el color del contenedor
                                            >
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <title>report-linechart</title>
                                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                        <g id="add" fill="currentColor" transform="translate(42.666667, 85.333333)">
                                                            <path d="M341.333333,1.42108547e-14 L426.666667,85.3333333 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L341.333333,1.42108547e-14 Z M330.666667,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,96 L330.666667,42.6666667 Z M106.666667,85.3333333 L106.666333,217.591333 L167.724208,141.269742 L232.938667,173.866667 L280.864376,130.738196 L295.135624,146.595138 L236.398693,199.458376 L173.589333,168.064 L120.324333,234.666333 L341.333333,234.666667 L341.333333,256 L85.3333333,256 L85.3333333,85.3333333 L106.666667,85.3333333 Z" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>

                                    )}
                                    {project.file3 && (
                                        <a
                                            href={project.file3}
                                            target="_blank"
                                            download="archivo descargado"
                                            // rel="noopener noreferrer"
                                            className="text-yellow-100 hover:text-yellow-500 hover:underline w-6 h-6"
                                        >
                                            <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <title>report-barchart</title>
                                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g id="add" fill="currentColor" transform="translate(42.666667, 85.333333)">
                                                            <path
                                                                d="M341.333333,1.42108547e-14 L426.666667,85.3333333 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L341.333333,1.42108547e-14 Z 
            M330.666667,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,96 L330.666667,42.6666667 Z 
            M106.666667,85.3333333 L106.666,234.666 L341.333333,234.666667 L341.333333,256 L85.3333333,256 L85.3333333,85.3333333 L106.666667,85.3333333 Z 
            M170.666667,149.333333 L170.666667,213.333333 L128,213.333333 L128,149.333333 L170.666667,149.333333 Z 
            M234.666667,106.666667 L234.666667,213.333333 L192,213.333333 L192,106.666667 L234.666667,106.666667 Z 
            M298.666667,170.666667 L298.666667,213.333333 L256,213.333333 L256,170.666667 L298.666667,170.666667 Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>

                                        </a>


                                    )}
                                    {project.file4 && (
                                        <a
                                            href={project.file4}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-300 hover:text-white hover:underline w-6 h-6"
                                        >
                                            <svg viewBox="4 2 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M4.5 6L5.25 5.25H18.75L19.5 6V18L18.75 18.75H5.25L4.5 18V6ZM6 6.75V17.25H18V6.75H6ZM10.1894 12L7.71973 9.5303L8.78039 8.46964L12.3107 12L8.78039 15.5303L7.71973 14.4696L10.1894 12ZM12 15.75H15.75V14.25H12V15.75Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </g>
                                            </svg>

                                        </a>
                                    )}
                                </td>
                                <td className={` 
                    ${project.status === "Open" ? "text-zinc-400" : ""} 
                    ${project.status === "In Progress" ? "text-blue-500" : ""} 
                    ${project.status === "Completed" ? "text-green-600" : ""} px-2 py-1 text-sm sm:text-xs`}
                                >
                                    {project.status}</td>
                                <td className="px-2 py-1 text-sm sm:text-xs flex space-x-2">
                                    <Link to={`/projects/${project._id}`} className="text-zinc-300 hover:text-slate-500">
                                        <PencilIcon className="h-5 w-5" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="text-zinc-200 hover:text-red-500"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ProjectTable;
