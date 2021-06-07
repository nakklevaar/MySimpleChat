using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SimpleChat.Core;

namespace SimpleChat.Data.Data.Configurations
{
    public class FriendShipConfiguration : IEntityTypeConfiguration<Friendship>
    {
        public void Configure(EntityTypeBuilder<Friendship> builder)
        {
            builder
                .HasKey(e => new { e.InitiatorUserId, e.ReceiverUserId });

            builder
                .HasIndex(e => e.InitiatorUserId);

            builder
                .HasIndex(e => e.ReceiverUserId);

            builder
                .Property(e => e.FriendshipStatus)
                .HasConversion(new EnumToNumberConverter<FriendshipStatus, int>());

            builder
                .HasOne(e => e.InitiatorUser).WithMany(e => e.FriendsAsInitiator).OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(e => e.ReceiverUser).WithMany(e => e.FriendsAsTarget).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
