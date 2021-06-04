﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SimpleChat.Infrustructure.Data;

namespace SimpleChat.Infrustructure.Migrations
{
    [DbContext(typeof(SimpleChatStorageContext))]
    partial class SimpleChatStorageContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SimpleChat.Core.Chat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ChatType")
                        .HasColumnType("int");

                    b.Property<string>("CreatorId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageSource")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(30)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("Id");

                    b.ToTable("Chats");
                });

            modelBuilder.Entity("SimpleChat.Core.ChatUser", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(15)");

                    b.Property<int>("ChatId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "ChatId");

                    b.HasIndex("ChatId");

                    b.ToTable("ChatUser");
                });

            modelBuilder.Entity("SimpleChat.Core.Friendship", b =>
                {
                    b.Property<string>("InitiatorUserId")
                        .HasColumnType("varchar(15)");

                    b.Property<string>("ReceiverUserId")
                        .HasColumnType("varchar(15)");

                    b.Property<int>("FriendshipStatus")
                        .HasColumnType("int");

                    b.HasKey("InitiatorUserId", "ReceiverUserId");

                    b.HasIndex("InitiatorUserId");

                    b.HasIndex("ReceiverUserId");

                    b.ToTable("Friendships");
                });

            modelBuilder.Entity("SimpleChat.Core.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ChatId")
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime");

                    b.Property<bool>("IsRead")
                        .HasColumnType("bit");

                    b.Property<string>("SenderId")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(15)");

                    b.HasKey("Id");

                    b.HasIndex("ChatId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("SimpleChat.Core.User", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(15)
                        .IsUnicode(false)
                        .HasColumnType("varchar(15)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("ImageSource")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IsMale")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SimpleChat.Core.UserProfile", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WorkPlace")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("UserProfiles");
                });

            modelBuilder.Entity("SimpleChat.Core.ChatUser", b =>
                {
                    b.HasOne("SimpleChat.Core.Chat", "Chat")
                        .WithMany("ChatUsers")
                        .HasForeignKey("ChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SimpleChat.Core.User", "User")
                        .WithMany("ChatUsers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SimpleChat.Core.Friendship", b =>
                {
                    b.HasOne("SimpleChat.Core.User", "InitiatorUser")
                        .WithMany("FriendsAsInitiator")
                        .HasForeignKey("InitiatorUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("SimpleChat.Core.User", "ReceiverUser")
                        .WithMany("FriendsAsTarget")
                        .HasForeignKey("ReceiverUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("InitiatorUser");

                    b.Navigation("ReceiverUser");
                });

            modelBuilder.Entity("SimpleChat.Core.Message", b =>
                {
                    b.HasOne("SimpleChat.Core.Chat", "Chat")
                        .WithMany("Messages")
                        .HasForeignKey("ChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SimpleChat.Core.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("SimpleChat.Core.Chat", b =>
                {
                    b.Navigation("ChatUsers");

                    b.Navigation("Messages");
                });

            modelBuilder.Entity("SimpleChat.Core.User", b =>
                {
                    b.Navigation("ChatUsers");

                    b.Navigation("FriendsAsInitiator");

                    b.Navigation("FriendsAsTarget");
                });
#pragma warning restore 612, 618
        }
    }
}
