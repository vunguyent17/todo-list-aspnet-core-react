import ToDoList from "./components/ToDoList"

const AppRoutes = [
    {
        index: true,
        element: <ToDoList />
    },
    {
        path: '/new',
        element: <ToDoList />
    }
];

export default AppRoutes;
