using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SimpleChat.Core;
using SimpleChat.Core.Constants.Validation;

namespace SimpleChat.Infrustructure.Data.Configurations
{
    public class UserProfileConfiguration : IEntityTypeConfiguration<UserProfile>
    {
        public void Configure(EntityTypeBuilder<UserProfile> builder)
        {
            builder
                .Property(e => e.Id)
                .HasMaxLength(LengthValidation.User.Id)
                .IsUnicode(false);

            builder
                .Property(e => e.City)
                .HasMaxLength(LengthValidation.UserProfile.City);

            builder
                .Property(e => e.Country)
                .HasMaxLength(LengthValidation.UserProfile.Country);
        }
    }
}
