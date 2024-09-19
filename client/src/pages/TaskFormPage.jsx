import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

// Importa la lista de proyectos
import { projectList } from '../projects';

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const [selectedProject, setSelectedProject] = useState('');
  const [loading, setLoading] = useState(false); // Estado de loading

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue('title', task.title);
        setValue('description', task.description);
        setSelectedProject(task.project || ''); // Cargar el proyecto actual
      }
    }
    loadTask();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true); // Iniciar el estado de loading cuando el formulario se envíe

    // Creamos FormData
    const formData = new FormData();

    // Agregamos el resto de los datos
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('date', data.date ? dayjs.utc(data.date).format() : dayjs.utc().format());
    formData.append('projectId', selectedProject); // Agregar el proyecto seleccionado

    // Agregamos el archivo si existe
    if (data.file[0]) {
      formData.append('file', data.file[0]);
    }

    try {
      if (params.id) {
        await updateTask(params.id, formData);
      } else {
        await createTask(formData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Detener el estado de loading después de que la tarea se haya creado o actualizado
      navigate('/tasks');
    }
  });

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='max-w-md p-10 rounded-md border border-zinc-500'>
        <h1 className='text-xl'>Add Task</h1>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder='Title'
            {...register('title')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            autoFocus
          />

          <textarea
            rows="3"
            placeholder='Description'
            {...register('description')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          ></textarea>

          <input
            type="file"
            {...register('file')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          >
            <option value="">Select Project</option>
            {projectList.map((projectId, index) => (
              <option key={index} value={projectId}>
                {projectId}
              </option>
            ))}
          </select>

          <div className='flex justify-between'>
            <button 
              type='submit'
              className='bg-sky-800 px-3 py-1 rounded-sm'
            >
              {loading ? "Saving..." : "Save"} {/* Muestra "loading" mientras se guarda */}
            </button>
            <Link 
              to="/tasks"
              className='bg-red-700 px-3 py-1 rounded-sm text-white'
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;