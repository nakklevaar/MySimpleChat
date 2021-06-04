using System;
using System.Linq;
using System.Reflection;
using AutoMapper;

namespace AspNetCoreSpa.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
        }

        private void ApplyMappingsFromAssembly(Assembly assembly)
        {
            var types = assembly.GetExportedTypes()
                .Where(t => t.GetInterfaces().Any(i =>
                    i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapFrom<>)))
                .ToList();

            foreach (var type in types)
            {
                var instance = Activator.CreateInstance(type);
                var args = type.GetInterfaces()[0].GetGenericArguments();
                var methodInfo = type.GetMethod("Mapping", BindingFlags.NonPublic | BindingFlags.Instance);
                if (methodInfo == null)
                {
                    var iType = typeof(IMapFrom<>).MakeGenericType(args);
                    methodInfo = iType.GetMethod("Mapping");
                }
                methodInfo?.Invoke(instance, new object[] { this });
            }
        }
    }
}