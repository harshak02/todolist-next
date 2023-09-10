"use client";
import { ITask } from "@/types/task";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit,setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted,setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit,setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
        id : task.id,
        text : taskToEdit
    })
    setOpenModalEdit(false);
    router.refresh();
  }

  const handleDeleteTask = async (id : string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  } 

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">

        <FiEdit onClick={()=>setOpenModalEdit(true)} cursor="pointer" size={22} className="text-blue-500" />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
        <form action="" onSubmit={handleSubmitEditTodo}>
          <h3 className="font-bold text-lg">Edit Task</h3>
          <div className="modal-action">
            <input
              value = {taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn">Submit</button>
          </div>
        </form>
      </Modal>

        <FiTrash2 onClick={()=>setOpenModalDeleted(true)} cursor="pointer" size={22} className="text-red-500" />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
            <h3 className="text-lg">Are you sure wanted to delete the task?</h3>
            <div className="modal-action">
                <button className="btn" onClick={() => handleDeleteTask(task.id)}>
                    Yes
                </button>
            </div>
      </Modal>       
      </td>
    </tr>
  );
};

export default Task;
