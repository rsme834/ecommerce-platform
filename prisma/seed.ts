// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed database...');

  // Create hashed password
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Ahmad',
      lastName: 'Administrator',
      phone: '+905551234567',
      admin: {
        create: {
          permissions: ['MANAGE_USERS', 'MANAGE_PRODUCTS', 'MANAGE_ORDERS'],
        }
      }
    },
    include: {
      admin: true
    }
  });

  // Create business user
  const businessUser = await prisma.user.create({
    data: {
      email: 'seller@example.com',
      password: hashedPassword,
      firstName: 'Mohammed',
      lastName: 'Merchant',
      phone: '+905551234568',
      business: {
        create: {
          businessName: 'Tech Store',
          taxNumber: '1234567890',
          isVerified: true,
        }
      }
    },
    include: {
      business: true
    }
  });

  // Create customer user
  const customerUser = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      password: hashedPassword,
      firstName: 'Fatima',
      lastName: 'Customer',
      phone: '+905551234569',
      customer: {
        create: {
          loyaltyPoints: 100,
        }
      }
    },
    include: {
      customer: true
    }
  });

  // Create categories
  const electronicsCategory = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'All electronic devices'
    }
  });

  const phonesCategory = await prisma.category.create({
    data: {
      name: 'Smartphones',
      description: 'Smartphones and tablets',
      parentId: electronicsCategory.id
    }
  });

  const clothingCategory = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'Men and women clothing'
    }
  });

  // Create address
  const customerAddress = await prisma.address.create({
    data: {
      customerId: customerUser.customer.id,
      userId: customerUser.id,
      title: 'Home',
      firstName: 'Fatima',
      lastName: 'Customer',
      addressLine1: 'Independence Street No 123',
      city: 'Antalya',
      state: 'Antalya',
      postalCode: '07000',
      country: 'Turkey',
      phone: '+905551234569',
      isDefault: true,
      type: 'SHIPPING'
    }
  });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone from Apple with advanced camera',
      price: 35000.00,
      stock: 50,
      images: ['https://example.com/iphone15-1.jpg'],
      sellerId: businessUser.business.id,
      categoryId: phonesCategory.id,
      isApproved: true,
      rating: 4.5
    }
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Samsung Galaxy S24',
      description: 'New Samsung phone with AI technology',
      price: 28000.00,
      stock: 30,
      images: ['https://example.com/galaxy-s24-1.jpg'],
      sellerId: businessUser.business.id,
      categoryId: phonesCategory.id,
      isApproved: true,
      rating: 4.3
    }
  });

  // Create order
  const order = await prisma.order.create({
    data: {
      customerId: customerUser.customer.id,
      addressId: customerAddress.id,
      totalAmount: 35000.00,
      status: 'CONFIRMED',
      orderItems: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            unitPrice: 35000.00,
            totalPrice: 35000.00
          }
        ]
      }
    }
  });

  // Create payment
  await prisma.payment.create({
    data: {
      orderId: order.id,
      amount: 35000.00,
      method: 'CREDIT_CARD',
      status: 'COMPLETED',
      transactionId: 'TXN_123456789',
      paymentDate: new Date()
    }
  });

  // Create review
  await prisma.review.create({
    data: {
      customerId: customerUser.customer.id,
      productId: product1.id,
      rating: 5,
      title: 'Amazing Product',
      comment: 'High quality and excellent performance',
      pros: ['High quality', 'Fast performance'],
      cons: ['Price is high'],
      isVerified: true,
      isApproved: true,
      helpfulCount: 5
    }
  });

  console.log('Database seeded successfully!');
  console.log(`- Admin: ${adminUser.email}`);
  console.log(`- Seller: ${businessUser.email}`);
  console.log(`- Customer: ${customerUser.email}`);
  console.log(`- Password for all users: 123456`);
  console.log(`- Created ${await prisma.product.count()} products`);
  console.log(`- Created ${await prisma.order.count()} orders`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });