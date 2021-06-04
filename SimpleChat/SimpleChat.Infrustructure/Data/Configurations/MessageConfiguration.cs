using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SimpleChat.Core;

namespace SimpleChat.Data.Data.Configurations
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder
                .Property(e => e.CreateDate)
                .HasColumnType("datetime")
                .IsRequired();
            builder
                .Property(e => e.Content)
                .IsRequired();
            builder
                .Property(e => e.IsRead)
                .IsRequired();
            builder
                .Property(e => e.SenderId)
                .IsRequired()
                .IsUnicode(false);
            builder
                .Property(e => e.ChatId)
                .IsRequired();
        }
    }
}
