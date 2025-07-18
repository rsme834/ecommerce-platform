// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Create global variable for Prisma to avoid multiple connections in development
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Create Prisma Client or use existing one
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query', 'error', 'warn'], // Log queries and errors
        errorFormat: 'pretty',           // Pretty error formatting
    });

// In development environment, save the client in global variable
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

// Function to connect to database
export async function connectDB() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
}

// Function to disconnect from database
export async function disconnectDB() {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
}

// Database health check
export async function checkDBHealth() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return { status: 'healthy', timestamp: new Date() };
    } catch (error) {
        return { status: 'unhealthy', error: error, timestamp: new Date() };
    }
}

// Helper function for transactions
export async function runTransaction<T>(
    fn: (tx: PrismaClient) => Promise<T>
): Promise<T> {
    return await prisma.$transaction(fn);
}

// Common queries
export const queries = {
    // User queries
    findUserByEmail: (email: string) =>
        prisma.user.findUnique({
            where: { email },
            include: {
                customer: true,
                business: true,
                admin: true,
            },
        }),

    // Product queries
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

    // Order queries
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

    // Cart queries
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

    // Dashboard statistics
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

// Export prisma as default
export default prisma;