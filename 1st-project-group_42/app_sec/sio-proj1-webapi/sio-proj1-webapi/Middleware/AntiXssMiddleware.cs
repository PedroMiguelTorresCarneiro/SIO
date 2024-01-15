using Ganss.Xss;
using System.Globalization;
using System.Text;

namespace sio_proj1_webapi.Middleware
{
    public class AntiXssMiddleware
    {
        private readonly RequestDelegate _next;

        public AntiXssMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var originalBody = context.Request.Body;
            try
            {
                var content = await ReadRequestBodyAsync(context);

                var sanitizer = new HtmlSanitizer();
                var sanitized = sanitizer.Sanitize(content);
                if (content != sanitized.Replace("&amp;", "&"))
                {
                    await RespondWithError(context);
                }
                await _next(context);
            }
            finally
            {
                context.Request.Body = originalBody;
            }
        }

        private static async Task<string> ReadRequestBodyAsync(HttpContext context)
        {
            var buffer = new MemoryStream();
            await context.Request.Body.CopyToAsync(buffer);
            context.Request.Body = buffer;
            buffer.Position = 0;

            var encoding = Encoding.UTF8;

            var requestContent = await new StreamReader(buffer, encoding).ReadToEndAsync();
            context.Request.Body.Position = 0;
            return requestContent;
        }

        private async Task RespondWithError(HttpContext context)
        {
            context.Response.Clear();
            context.Response.Headers.Add("Content-Type", "application/json; charset=utf-8");
            context.Response.StatusCode = StatusCodes.Status400BadRequest;

            await context.Response.WriteAsJsonAsync(
                new
                {
                    error = "error! HTML detected."
                }
            );
        }
    }
}
