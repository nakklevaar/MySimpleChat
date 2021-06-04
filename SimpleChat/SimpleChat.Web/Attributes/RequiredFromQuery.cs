using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace SimpleChat.Web.Attributes
{
    public class RequiredQueryActionConstraint : IActionConstraint
    {
        private readonly string _parameter;

        public RequiredQueryActionConstraint(string parameter)
        {
            _parameter = parameter;
        }

        public int Order => 999;

        public bool Accept(ActionConstraintContext context) =>
            context.RouteContext.HttpContext.Request.Query.ContainsKey(_parameter);
    }

    public class RequiredQueryHttpGetAttribute : HttpGetAttribute, IActionModelConvention
    {
        private readonly string _withQuery;

        public RequiredQueryHttpGetAttribute(string WithQuery)
        {
            _withQuery = WithQuery;
        }

        public void Apply(ActionModel action)
        {
            if (action.Selectors is not null && action.Selectors.Any())
            {
                action.Selectors.Last().ActionConstraints.Add(new RequiredQueryActionConstraint(_withQuery));
            }
        }
    }
}
