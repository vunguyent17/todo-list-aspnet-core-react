using Microsoft.EntityFrameworkCore;
using todo_list.DataAccess;

namespace todo_list
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.  
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            Configuration["PostgreSqlConnectionString"] = "Server=127.0.0.1;Port=5432;Database=ToDoList;User Id=postgres;Password=vunguyen;";

            var sqlConnectionString = Configuration["PostgreSqlConnectionString"];
            
            services.AddDbContext<PostgreSqlContext>(options => options.UseNpgsql(sqlConnectionString));

            services.AddScoped<ITodoRepository, TodoRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.  
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
