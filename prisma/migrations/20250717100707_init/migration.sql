model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  firstName String
  lastName  String
  phone     String?
  createdAt DateTime @default(now())
  isActive  Boolean  @default(true)
  orders    Order[]
  customer  Customer?
  business Business?
  admin    Admin?
}

model Customer{
  wishlist Product[]
  loyaltyPoints Int @default(0)
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Business {
  businessName String
  taxNumber String
  isVerified Boolean @default(false)

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Admin {
  permissions String[]
  lastLogin DateTime
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Review {
  id        String   @id @default(cuid())
  productId String
  customerId String
  orderId String
  rating    Int      @default(0)
  title     String
  comment   String
  pros String[]
  cons String[]
  isVerified Boolean @default(false)
  isApproved Boolean @default(false)
  helpfulCount Int @default(0)
  reviewDate DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  stock       Int
  createdAt   DateTime @default(now())
  isApproved  Boolean  @default(false)
  images      Image[]
}

model Category {
  id       String    @id @default(cuid())
  name     String
  parentId String?
  parent   Category? @relation("CategoryParent", fields: [parentId], references: [id])
  children Category[] @relation("CategoryParent")
}

model Address {
  id        String   @id @default(cuid())
  userId    String
  title     String
  firstName String
  lastName  String
  companyName String
  addressLine1 String
  addressLine2 String
  city      String
  state     String
  postalCode String
  country   String
  phone     String
  isDefault Boolean  @default(false)
  type AddressType @default(Shipping)
}

model Order {
  id          String   @id @default(cuid())
  userId      String
  orderItems  String
  totalAmount Float
  status      String   @default("PENDING")
  orderDate   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model OrderItem {
  productId String
  quantity  Int
  unitPrice Float
  totalPrice Float
}

model Image {
  id          String   @id @default(cuid())
  url         String   
  altText     String
  fileName    String
  fileSize    Int
  mimeType    String
  productId   String
  userId      String
  isMain      Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  
  product     Product? @relation(fields: [productId], references: [id], onDelete: Cascade)
  user        User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("images")
}

model Payment {
  id          String   @id @default(cuid())
  orderId     String
  amount      Float
  method      String
  transactionId String
  paymentDate DateTime @default(now())
}

model Cart {
  customerId       String   @id @default(cuid())
  items          CartItem[]          
  totalAmount        Float
  createdAt          DateTime @default(now())
}

model CartItem {
  productId          String   @id @default(cuid())
  quantity          Int
  unitPrice        Float
}