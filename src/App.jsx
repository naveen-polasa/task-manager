import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEdit, setIsEDit] = useState({ flag: false, id: null });

  const addToList = (e) => {
    e.preventDefault();
    if (!task) {
      setIsEDit({ flag: false, id: null });
      return;
    }
    let newTaskList = [];
    if (!isEdit.flag) newTaskList = [...taskList, task];
    if (isEdit.flag) {
      newTaskList = taskList.map((item, index) => {
        if (isEdit.id === index) {
          item = task;
          setIsEDit({ flag: false, id: null });
          return item;
        } else {
          return item;
        }
      });
    }
    setTaskList(newTaskList);
    localStorage.setItem("tasklist", JSON.stringify(newTaskList));
    setTask("");
  };

  useEffect(() => {
    const localData = localStorage.getItem("tasklist")
      ? JSON.parse(localStorage.getItem("tasklist"))
      : [];
    setTaskList(localData);
  }, []);

  const removeItem = (id) => {
    const newTasks = taskList.filter((_, index) => index !== id);
    localStorage.setItem("tasklist", JSON.stringify(newTasks));
    setTaskList(newTasks);
    setIsEDit({ flag: false, id: null });
  };

  const editItem = (id) => {
    setIsEDit({ flag: true, id });
    const task = taskList.find((task, index) => index === id);
    setTask(task);
  };

  return (
    <div className="text-center p-12 min-h-screen bg-orange-200">
      <form className="my-3">
        <input
          type="text"
          className="sm:w-96 border-2 h-10 px-3 rounded-md"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type="submit"
          className="py-2 px-4 font-bold border mx-4 rounded-md bg-red-300"
          onClick={addToList}
        >
          {isEdit.flag && task ? "Edit" : "Add"}
        </button>
      </form>
      <div
        className={`py-3 px-6 my-8 sm:w-[27rem] mx-auto rounded-lg ${
          taskList.length > 0 && "border-2 bg-lime-100"
        }`}
      >
        {taskList.map((task, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center border-b-2"
            >
              <h3 className="text-2xl my-2 mx-3 break-all text-start">
                {task}
              </h3>
              <div className="flex-shrink-0">
                <button className="mx-3 " onClick={() => editItem(index)}>
                  <FaEdit />
                </button>
                <button
                  className="mx-3 text-red-600 "
                  onClick={() => removeItem(index)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
