using todo_list.Models;

namespace todo_list.DataAccess
{
    public interface ITodoRepository
    {
        void AddTodoRecord(ToDo todo);
        void UpdateTodoRecord(ToDo todo);
        void DeleteTodoRecord(string id);
        ToDo GetTodoSingleRecord(string id);
        List<ToDo> GetTodoRecords();
    }
}
