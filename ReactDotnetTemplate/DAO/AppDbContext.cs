using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ReactDotnetTemplate.Models;

namespace ReactDotnetTemplate.DAO
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Sales> Sales { get; set; }
        public virtual DbSet<Store> Store { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Address).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Price).HasMaxLength(50);
            });

            modelBuilder.Entity<Sales>(entity =>
            {
                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sales_Customer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sales_Product");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.StoreId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sales_Store");
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.Property(e => e.Address).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
