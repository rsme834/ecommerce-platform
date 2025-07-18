// types/api.ts
import { Prisma, Category } from '@prisma/client';

// User Types
export type UserWithRelations = Prisma.UserGetPayload<{
<<<<<<< HEAD
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
=======
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
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}>;

// Product Types
export type ProductWithDetails = Prisma.ProductGetPayload<{
<<<<<<< HEAD
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
=======
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
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}>;

// Order Types
export type OrderWithDetails = Prisma.OrderGetPayload<{
<<<<<<< HEAD
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
=======
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
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}>;

// Cart Types
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
<<<<<<< HEAD
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
=======
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
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}>;

// Review Types
export type ReviewWithDetails = Prisma.ReviewGetPayload<{
<<<<<<< HEAD
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
=======
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
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}>;

// API Response Types
export interface ApiResponse<T = any> {
<<<<<<< HEAD
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
=======
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
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}

// Request Types
export interface LoginRequest {
<<<<<<< HEAD
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
=======
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
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}

// Dashboard Types
export interface DashboardStats {
<<<<<<< HEAD
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
=======
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
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}

// Error Types
export interface ValidationError {
<<<<<<< HEAD
  field: string;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ValidationError[];
=======
    field: string;
    message: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: ValidationError[];
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}

// Utility Types
export type CreateInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateInput<T> = Partial<CreateInput<T>> & { id: string };

// Session Types
export interface UserSession {
<<<<<<< HEAD
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'business' | 'admin';
  customerId?: string;
  businessId?: string;
  adminId?: string;
=======
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'customer' | 'business' | 'admin';
    customerId?: string;
    businessId?: string;
    adminId?: string;
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}

// File Upload Types
export interface UploadedFile {
<<<<<<< HEAD
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  size: number;
=======
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
    size: number;
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}

// Notification Types
export interface NotificationData {
<<<<<<< HEAD
  type: 'order_placed' | 'order_shipped' | 'order_delivered' | 'review_added' | 'product_approved';
  title: string;
  message: string;
  userId: string;
  data?: Record<string, any>;
=======
    type: 'order_placed' | 'order_shipped' | 'order_delivered' | 'review_added' | 'product_approved';
    title: string;
    message: string;
    userId: string;
    data?: Record<string, any>;
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}

// Search Types
export interface SearchResult {
<<<<<<< HEAD
  products: ProductSummary[];
  categories: Category[];
  total: number;
}

export interface SearchFilters extends ProductFilters {
  query: string;
=======
    products: ProductSummary[];
    categories: Category[];
    total: number;
}

export interface SearchFilters extends ProductFilters {
    query: string;
>>>>>>> 321dd2ea830f438b8ef0e7fb29b5bdc75ba2c834
}