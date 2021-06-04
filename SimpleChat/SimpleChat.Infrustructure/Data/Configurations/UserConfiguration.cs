using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SimpleChat.Core;

namespace SimpleChat.Data.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .Property(e => e.Id)
                .HasMaxLength(15)
                .IsUnicode(false);

            //builder
            //    .Property(e => e.FirstName)
            //    .IsRequired()
            //    .HasMaxLength(20);

            //builder
            //    .Property(e => e.LastName)
            //    .IsRequired()
            //    .HasMaxLength(20);


        }
    }
}