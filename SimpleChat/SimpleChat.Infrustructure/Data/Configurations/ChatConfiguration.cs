using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SimpleChat.Core.Constants.Validation;
using SimpleChat.Core;

namespace SimpleChat.Data.Data.Configurations
{
    public class ChatConfiguration : IEntityTypeConfiguration<Chat>
    {
        public void Configure(EntityTypeBuilder<Chat> builder)
        {
            builder
                .Property(e => e.Name)
                .IsUnicode(true)
                .HasMaxLength(LengthValidation.Chat.Name);

            var converter = new ValueConverter<ChatType, bool>(
                v => v == ChatType.Duo ? false : true,
                v => v == false ? ChatType.Duo : ChatType.Group);

            builder
                .Property(e => e.ChatType)
                .IsRequired()
                .HasConversion(converter);

            builder
                .Property(e => e.CreatorId)
                .IsRequired();
        }
    }
}
