import { useState, useRef, useEffect } from "react"
import { PieChart } from '@rsuite/charts';
import { tasksData, sampleData } from "../utils/data"
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import profile from "../assets/profile.png"
const Dashboard = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState(tasksData)
    const [data, setData] = useState(sampleData)
    const [query, setQuery] = useState("")
    const [selectedTask, setSelectedTask] = useState({})
    const [error, setError] = useState(false)
    const modalRef = useRef(null);
    const dispatch = useDispatch()

    //   useEffect(() => {
    //     fetch("https://dev-dl.tdcx.com:3092/tasks", {
    //     method: "GET",
    //     headers: {"Authorization": `Bearer f94b01164ea17050a61e859b`}
    //   })
    //       .then(res => res.json())
    //       .then(
    //         (result) => {
    //         //   setIsLoaded(true);
    //         //   setItems(result);
    //         console.log(result)
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //         //   setIsLoaded(true);
    //         //   setError(error);
    //         }
    //       )
    //   }, [])

    useEffect(() => {
        function handler(event) {
            if(showModal && modalRef.current && !modalRef.current?.contains(event.target)) {
                setShowModal(false)
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);

    }, [showModal])
    const addTask = () => {
        if(taskName){
            const arr = [...tasks]
            arr.push({
                name: taskName,
                completed: false,
                id: arr.length
            })
            const dataTemp = {...data}
            dataTemp.totalTasks = dataTemp.totalTasks + 1
            setData(dataTemp)
            setTasks(arr)
            setTaskName("")
            setShowModal(false)
            setError(false)
        }
        else{
            setError(true)
        }
    }
    const deleteTask = (index) => {
        const arr = [...tasks]
        const dataTemp = {...data}
        dataTemp.totalTasks = dataTemp.totalTasks - 1
        if(arr[index].completed){
            dataTemp.completedTasks = dataTemp.completedTasks - 1
        }
        arr.splice(index, 1)
        setData(dataTemp)
        setTasks(arr)
    }
    const checkTasks = (index) => {
        const arr = [...tasks]
        arr[index].completed = !arr[index].completed
        const dataTemp = {...data}
        if(arr[index].completed){
            dataTemp.completedTasks = dataTemp.completedTasks + 1
        }
        else{
            dataTemp.completedTasks = dataTemp.completedTasks - 1
        }
        setData(dataTemp)
        setTasks(arr)
    }
    const selectTask = (task, index) => {
        setTaskName(task.name)
        setSelectedTask({name: task.name, index})
        setShowModal(true)
    }
    const editTask = () => {
        if(taskName){
            const arr = [...tasks]
            arr[selectedTask.index].name = taskName
            setTasks(arr)
            setTaskName("")
            setShowModal(false)
            setSelectedTask({})
            setError(false)
        }
        else{
            setError(true)
        }

    }
    const logout = () => {
        dispatch({ type: "LOGOUT" });          
    }
    const getReverse = (tasks) => {
        const arr = tasks.sort(function(a, b) {
            return b.id - a.id;
          });
        return arr
    }
    const graphData = [
        ['Completed Tasks', data.completedTasks],
        ["Incomplete Tasks", data.totalTasks - data.completedTasks]
    ]
    return (
        <div className="bg-gray-50 h-screen relative" >
            <div className="flex justify-between py-4 lg:px-28 px-12 bg-white shadow-md">
                <div className="flex">
                    {/* <></> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                    </svg> */}
                    <img src={profile} alt="profile" className="h-12 rounded-3xl"/>

                    <h2 className="text-xl text-slate-400 ml-2 mt-2">{props.user}</h2>
                </div>
                <div className="text-base mt-2 text-slate-400 font-medium cursor-pointer" onClick={() => {logout()}}>
                    Logout
                </div>
            </div>
            {
                tasks.length === 0 ? 
                <div className="lg:grid lg:place-items-center lg:h-screen mt-4 text-center">
                    <div className="bg-white lg:rounded-lg lg:w-60 p-6 shadow-md">
                        <h1 className="mb-4 font-medium text-lg text-slate-400">You have no task</h1>
                        <button className="rounded bg-blue-500 text-white text-sm py-1 px-2" onClick={() => setShowModal(true)}>+ New Task</button>
                    </div>
                </div> :
                <div className="lg:px-28 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h1 className="mb-4 font-medium text-lg text-slate-400">Task Completed</h1>
                            <div className="text-slate-400"><span className="text-7xl font-bold text-blue-500">{data.completedTasks}</span>/{data.totalTasks}</div>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h1 className="mb-4 font-medium text-lg text-slate-400">Lastest Created Task</h1>
                            <ul className="pl-6">
                                {
                                    getReverse(tasks).map((task, index) => {
                                        if(index < 3){
                                            return(
                                                <li className={task.completed ? "text-sm line-through text-slate-400 list-disc" : "text-sm text-slate-400 list-disc"} key={index}>{task.name}</li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <PieChart name="PieChart" data={graphData} legend={false} height={100}/>                        
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="lg:flex lg:justify-between">
                            <div className="mb-3 font-medium text-lg text-slate-400 text-center">Tasks</div>
                            <div className="lg:flex px-4">
                                <input placeholder="Search by task name" type={"text"} className="w-full mb-2 bg-slate-200 px-3 py-1 text-sm rounded-lg lg:mr-4 h-10" onChange={e => setQuery(e.target.value)}/>
                                <button className="rounded-lg h-10 lg:w-40 bg-blue-500 text-white w-full text-sm py-1 px-2" onClick={() => setShowModal(true)}>+ New Task</button>
                            </div>
                        </div>
                        <div className="list bg-white w-full lg:rounded-lg shadow-md px-4 mt-2">
                            {
                            tasks.filter(task => {
                                if (query === '') {
                                  return task;
                                } else if (task.name.toLowerCase().includes(query.toLowerCase())) {
                                  return task;
                                }
                              }).map((task, index) => {
                                return(
                                    <div className="item-map flex justify-between border-b border-double border-slate-200 py-4" key={index}>
                                        <div className="form-check">
                                            <input className="cursor-pointer mr-2" type="checkbox" id="flexCheckChecked" checked={task.completed} onChange={() => checkTasks(index)}/>
                                            <label className={task.completed ? "line-through text-slate-400 font-medium text-lg" : "font-medium text-lg text-blue-500"} htmlFor="flexCheckChecked">
                                                {task.name}
                                            </label>
                                        </div>
                                        <div className="flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-6 h-6 mr-2 cursor-pointer" onClick={() => selectTask(task, index)}>
                                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-6 h-6 cursor-pointer" onClick={() => deleteTask(index)}>
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                            </svg>


                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    
                </div>
            }
            <div>     
                {showModal ? (
                    <>
                        <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none px-6" 
                        >
                            <div className="relative w-auto w-full my-6 mx-auto max-w-3xl">
                                <div className="grid place-items-center h-screen">
                                    <div className="bg-white rounded-lg lg:w-72 h-48 w-full p-6 shadow-md" ref={modalRef}>
                                        <h1 className="mb-4 font-medium text-lg text-slate-400">+ New Task</h1>
                                        <div className="mb-2">
                                            <input placeholder="Task Name" type={"text"} value={taskName} onChange={(e) => setTaskName(e.target.value)} className="w-full mb-1 bg-slate-50 px-3 py-1 text-sm rounded" />
                                            {
                                                error ? 
                                                <p className="text-xs text-red-500" >Please enter a task name</p>:
                                                null
                                            }
                                        </div>
                                        <button className="rounded bg-blue-500 text-white w-full text-sm py-1 px-2" onClick={() => !selectedTask.name ? addTask() : editTask()}>{!selectedTask.name ? "+ New Task" : "Update"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>
        </div>
      )
}
const mapStateToProps = (state, props) => {
    return{
      user: state.user.userName
    }
  };
export default connect(mapStateToProps)(Dashboard)