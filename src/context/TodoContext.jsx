import { useState, useContext, createContext, useEffect } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
	const getFormattedDateTime = (date = new Date()) => {
		const d = date.toLocaleString('en-US', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
		return `Task created at ${d.replace(',', ' -').replace(',', ' at')}`;
	};

	const [tasks, setTasks] = useState(() => {
		const stored = localStorage.getItem('Tasks');
		return JSON.parse(stored) || [];
	});

	const getTaskById = (id) => {
		return tasks.find((task) => task.id === id);
	};

	const deleteTask = (id) => {
		const confirm = window.confirm('Are you sure you want to Delete Task?');
		if (confirm) {
			setTasks(tasks.filter((task) => task.id !== id));
		}
	};

	const addTask = (taskForm) => {
		const newTask = {
			...taskForm,
			id: crypto.randomUUID(),
			createdAt: getFormattedDateTime(),
			dateCreated: Date.now(),
		};

		setTasks((prev) => [...prev, newTask]);
	};

	const updateTask = (id, updates) => {
		setTasks((prev) =>
			prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
		);
	};

	const toggleComplete = (id) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const getPriorityDisplay = (priority) => {
		const map = {
			Low: '🟢 Low',
			Medium: '🟠 Medium',
			High: '🔴 High',
		};
		return map[priority] || priority;
	};

	const getCategoryDisplay = (category) => {
		const map = {
			Work: '📁 Work',
			Personal: '🏠 Personal',
			Shopping: '🛒 Shopping',
			Health: '🧑🏻‍⚕️ Health',
			Ideas: '💡 Ideas',
			Others: '💭 Others',
		};

		return map[category] || category;
	};

	const getTodosByDate = (date) => {
		const dateStr = date.toISOString().split('T')[0];

		return tasks.filter((task) => {
			if (!task.dueDate) return false;
			return task.dueDate === dateStr;
		});
	};

	const getOverdueTodos = () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const todayStr = today.toISOString().split('T')[0];

		return tasks.filter((task) => {
			if (!task.dueDate) return false;
			if (task.completed) return false;
			if (task.dueDate < todayStr) return true;
		});
	};

	const getUpcomingTodos = () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const todayStr = today.toISOString().split('T')[0];

		const sevenDaysFromNow = new Date();
		sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
		const sevenDaysStr = sevenDaysFromNow.toISOString().split('T')[0];

		return tasks.filter((task) => {
			if (!task.dueDate) return false;
			if (task.completed) return false;
			return task.dueDate >= todayStr && task.dueDate <= sevenDaysStr;
		});
	};

	useEffect(() => {
		localStorage.setItem('Tasks', JSON.stringify(tasks));
	}, [tasks]);

	return (
		<TodoContext.Provider
			value={{
				tasks,
				setTasks,
				getFormattedDateTime,
				deleteTask,
				toggleComplete,
				getPriorityDisplay,
				getCategoryDisplay,
				getTaskById,
				addTask,
				updateTask,
				getTodosByDate,
				getOverdueTodos,
				getUpcomingTodos,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodos = () => {
	return useContext(TodoContext);
};
