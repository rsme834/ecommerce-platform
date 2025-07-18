// types/api.ts
import { Prisma, Category } from '@prisma/client';

// User Types
export type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        customer: true;
        business: true;
        admin: true;
    };
}>;

export type CustomerWithUser = Prisma.CustomerGetPayload<{
    include: {
        user: {
            select: {
                firstName: true;
                lastName: true;
                email: true;
                phone: true;
            };
        };
    };
}>;

// Product Types
export type ProductWithDetails = Prisma.ProductGetPayload<{
    include: {
        category: true;
        seller: {
            include: {
                user: {
                    select: {
                        firstName: true;
                        lastName: true;
                    };
                };
            };
        };
        images_rel: true;
        reviews: {
            include: {
                customer: {
                    include: {
                        user: {
                            select: {
                                firstName: true;
                                lastName: true;
                            };
                        };
                    };
                };
            };
        };
        _count: {
            select: {
                reviews: true;
            };
        };
    };
}>;

export type ProductSummary = Prisma.ProductGetPayload<{
    include: {
        images_rel: {
            where: { isMain: true };
            take: 1;
        };
        seller: {
            include: {
                user: {
                    select: {
                        firstName: true;
                        lastName: true;
                    };
                };
            };
        };
        _count: {
            select: {
                reviews: true;
            };
        };
    };
}>;

// Order Types
export type OrderWithDetails = Prisma.OrderGetPayload<{
    include: {
        customer: {
            include: {
                user: {
                    select: {
                        firstName: true;
                        lastName: true;
                        email: true;
                    };
                };
            };
        };
        address: true;
        orderItems: {
            include: {
                product: {
                    include: {
                        seller: {
                            include: {
                                user: {
                                    select: {
                                        firstName: true;
                                        lastName: true;
                                    };
                                };
                            };
                        };
                        images_rel: {
                            where: { isMain: true };
                            take: 1;
                        };
                    };
                };
            };
        };
        payments: true;
    };
}>;

// Cart Types
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: {
        product: {
            include: {
                seller: {
                    include: {
                        user: {
                            select: {
                                firstName: true;
                                lastName: true;
                            };
                        };
                    };
                };
                images_rel: {
                    where: { isMain: true };
                    take: 1;
                };
            };
        };
    };
}>;

// Review Types
export type ReviewWithDetails = Prisma.ReviewGetPayload<{
    include: {
        customer: {
            include: {
                user: {
                    select: {
                        firstName: true;
                        lastName: true;
                    };
                };
            };
        };
        product: {
            select: {
                name: true;
                images_rel: {
                    where: { isMain: true };
                    take: 1;
                };
            };
        };
    };
}>;

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Request Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    userType: 'customer' | 'business';
    businessName?: string;
    taxNumber?: string;
}

export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    images: string[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
    id: string;
}

export interface CreateOrderRequest {
    addressId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
}

export interface CreateReviewRequest {
    productId: string;
    rating: number;
    title?: string;
    comment?: string;
    pros?: string[];
    cons?: string[];
}

export interface UpdateCartRequest {
    productId: string;
    quantity: number;
}

export interface ProductFilters {
    categoryId?: string;
    sellerId?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: 'price' | 'rating' | 'createdAt' | 'name';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export interface OrderFilters {
    status?: string;
    customerId?: string;
    sellerId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

// Dashboard Types
export interface DashboardStats {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    recentOrders: OrderWithDetails[];
}

export interface SellerDashboardStats {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    averageRating: number;
    recentOrders: OrderWithDetails[];
}

export interface CustomerDashboardStats {
    totalOrders: number;
    totalSpent: number;
    loyaltyPoints: number;
    wishlistCount: number;
    recentOrders: OrderWithDetails[];
}

// Error Types
export interface ValidationError {
    field: string;
    message: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: ValidationError[];
}

// Utility Types
export type CreateInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateInput<T> = Partial<CreateInput<T>> & { id: string };

// Session Types
export interface UserSession {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'customer' | 'business' | 'admin';
    customerId?: string;
    businessId?: string;
    adminId?: string;
}

// File Upload Types
export interface UploadedFile {
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
    size: number;
}

// Notification Types
export interface NotificationData {
    type: 'order_placed' | 'order_shipped' | 'order_delivered' | 'review_added' | 'product_approved';
    title: string;
    message: string;
    userId: string;
    data?: Record<string, any>;
}

// Search Types
export interface SearchResult {
    products: ProductSummary[];
    categories: Category[];
    total: number;
}

export interface SearchFilters extends ProductFilters {
    query: string;
}