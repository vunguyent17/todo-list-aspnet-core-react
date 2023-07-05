using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Diagnostics;
using System.Collections.ObjectModel;
using todo_list.Models;
using todo_list.DataAccess;
using System.Numerics;
using System.Reflection;

namespace todo_list.Controllers
{
    [ApiController]
    [Route("api/todo")]
    public class ToDoController : ControllerBase
    {
        private readonly ITodoRepository _dataAccessProvider;

        public ToDoController(ITodoRepository dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        [HttpGet]
        public IEnumerable<ToDo> Get()
        {
            return _dataAccessProvider.GetTodoRecords();
        }

        [HttpPost]
        public IActionResult Create([FromBody] ToDo todo)
        {
            if (ModelState.IsValid)
            {
                Guid obj = Guid.NewGuid();
                todo.id = obj.ToString();
                todo.is_done = false;
                todo.created_at = DateTime.Now;
                todo.modified_at = todo.created_at;
                _dataAccessProvider.AddTodoRecord(todo);
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("{id}")]  
        public ToDo Details(string id)
        {
            return _dataAccessProvider.GetTodoSingleRecord(id);
        }

        [HttpPut]
        public IActionResult Edit([FromBody] ToDo todo)
        {
            if (ModelState.IsValid)
            {
                var target_id = todo.id;
                if (target_id != null)
                {
                    var target_task = _dataAccessProvider.GetTodoSingleRecord(target_id);
                    List<string> attrs = new List<string>() { "title", "content", "is_done" };
                    attrs.ForEach((attr) =>
                    {
                        PropertyInfo? prop_attr_info = typeof(ToDo).GetProperty(attr);
                        if (prop_attr_info != null && prop_attr_info.GetValue(todo) != null) {
                            prop_attr_info.SetValue(target_task, prop_attr_info.GetValue(todo));
                        }
                    });
                    target_task.modified_at = DateTime.Now;
                    _dataAccessProvider.UpdateTodoRecord(target_task);
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteConfirmed(string id)
        {
            var data = _dataAccessProvider.GetTodoSingleRecord(id);
            if (data == null)
            {
                return NotFound();
            }
            _dataAccessProvider.DeleteTodoRecord(id);
            return Ok();
        }
    }
}
