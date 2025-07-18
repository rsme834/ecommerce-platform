import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting to seed database...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Smartphones' }
    }),
    prisma.category.create({
      data: { name: 'Computers' }
    }),
    prisma.category.create({
      data: { name: 'Accessories' }
    })
  ]);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'iPhone 15',
        description: 'Latest smartphone from Apple',
        price: 999.99,
        stock: 50,
        isApproved: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'iPhone 15 Pro',
        description: 'Latest smartphone Pro model from Apple',
        price: 1299.99,
        stock: 20,
        isApproved: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'MacBook Pro',
        description: 'Powerful laptop for developers and designers',
        price: 1999.99,
        stock: 30,
        isApproved: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'AirPods Pro',
        description: 'Wireless earbuds with noise cancellation',
        price: 249.99,
        stock: 100,
        isApproved: true
      }
    })
  ]);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ecommerce.com',
      firstName: 'Admin',
      lastName: 'User',
      password: 'admin123',
      phone: '+1234567890',
      isActive: true
    }
  });

  console.log('✅ Successfully created:');
  console.log(`- ${categories.length} categories`);
  console.log(`- ${products.length} products`);
  console.log(`- Admin user: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });