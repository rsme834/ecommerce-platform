// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// إنشاء متغير عام لـ Prisma لتجنب إنشاء اتصالات متعددة في التطوير
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// إنشاء Prisma Client أو استخدام الموجود
export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    log: ['query', 'error', 'warn'], // تسجيل الاستعلامات والأخطاء
    errorFormat: 'pretty',           // تنسيق جميل للأخطاء
  });

// في بيئة التطوير، احفظ الـ client في المتغير العام
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// دالة للاتصال بقاعدة البيانات
export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error);
    process.exit(1);
  }
}

// دالة لقطع الاتصال بقاعدة البيانات
export async function disconnectDB() {
  await prisma.$disconnect();
  console.log('✅ تم قطع الاتصال بقاعدة البيانات');
}

// فحص صحة قاعدة البيانات
export async function checkDBHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date() };
  } catch (error) {
    return { status: 'unhealthy', error: error, timestamp: new Date() };
  }
}

// دالة مساعدة للمعاملات
export async function runTransaction<T>(
  fn: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(fn);
}

// استعلامات شائعة
export const queries = {
  // استعلامات المستخدمين
  findUserByEmail: (email: string) =>
    prisma.user.findUnique({
      where: { email },
      include: {
        customer: true,
        business: true,
        admin: true,
      },
    }),

  // استعلامات المنتجات
  findProductsWithDetails: (filters?: {
    categoryId?: string;
    sellerId?: string;
    isApproved?: boolean;
    minPrice?: number;
    maxPrice?: number;
  }) =>
    prisma.product.findMany({
      where: {
        ...(filters?.categoryId && { categoryId: filters.categoryId }),
        ...(filters?.sellerId && { sellerId: filters.sellerId }),
        ...(filters?.isApproved !== undefined && { isApproved: filters.isApproved }),
        ...(filters?.minPrice && { price: { gte: filters.minPrice } }),
        ...(filters?.maxPrice && { price: { lte: filters.maxPrice } }),
      },
      include: {
        category: true,
        seller: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        images_rel: true,
        reviews: {
          take: 5,
          orderBy: { reviewDate: 'desc' },
          include: {
            customer: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),

  // استعلامات الطلبات
  findOrdersWithDetails: (customerId?: string) =>
    prisma.order.findMany({
      where: customerId ? { customerId } : undefined,
      include: {
        customer: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        address: true,
        orderItems: {
          include: {
            product: {
              include: {
                seller: {
                  include: {
                    user: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
                images_rel: {
                  where: { isMain: true },
                  take: 1,
                },
              },
            },
          },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    }),

  // استعلامات السلة
  findCartItems: (customerId: string) =>
    prisma.cartItem.findMany({
      where: { customerId },
      include: {
        product: {
          include: {
            seller: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
            images_rel: {
              where: { isMain: true },
              take: 1,
            },
          },
        },
      },
    }),

  // إحصائيات لوحة التحكم
  getDashboardStats: async () => {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      recentOrders,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count({ where: { isApproved: true } }),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: {
          payments: {
            some: { status: 'COMPLETED' },
          },
        },
      }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      pendingOrders,
      recentOrders,
    };
  },
};

// تصدير prisma كافتراضي
export default prisma;