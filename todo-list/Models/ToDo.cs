namespace todo_list.Models
{
    public class ToDo
    {
        public string? id { get; set; }
        public string? title { get; set; }
        public string? content { get; set; }
        public bool? is_done { get; set; }
        public DateTime modified_at { get; set; }
        public DateTime created_at { get; set; }
    }
}
