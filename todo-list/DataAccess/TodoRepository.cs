using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using todo_list.Models;

namespace todo_list.DataAccess
{
    public class TodoRepository : ITodoRepository
    {
        private readonly PostgreSqlContext _context;

        public TodoRepository(PostgreSqlContext context)
        {
            _context = context;
        }

        public void AddTodoRecord(ToDo todo)
        {
            _context.todos.Add(todo);
            _context.SaveChanges();
        }

        public void UpdateTodoRecord(ToDo todo)
        {
            _context.todos.Update(todo);
            _context.SaveChanges();
        }

        public void DeleteTodoRecord(string id)
        {
            var entity = _context.todos.FirstOrDefault(t => t.id == id);
            if (entity != null)
            {
                _context.todos.Remove(entity);
                _context.SaveChanges();
            }
        }

        public ToDo GetTodoSingleRecord(string id) {
            var res = _context.todos.FirstOrDefault(t => t.id == id);
            if (res == null)
                return new ToDo();
            else
                return res;
        }

        public List<ToDo> GetTodoRecords()
        {
            return _context.todos.OrderBy(todo => todo.is_done).ThenByDescending(n => n.modified_at).ToList();
        }
    }

}
