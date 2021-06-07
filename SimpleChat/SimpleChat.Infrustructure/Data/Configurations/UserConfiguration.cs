using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SimpleChat.Core.Constants.Validation;
using SimpleChat.Core;

namespace SimpleChat.Data.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .Property(e => e.Id)
                .HasMaxLength(LengthValidation.User.Id)
                .IsUnicode(false);

            builder
                .Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(LengthValidation.User.FirstName);

            builder
                .Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(LengthValidation.User.LastName);

            builder
                .Property(e => e.IsMale)
                .IsRequired();
        }
    }
}