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
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  stock       Int
  createdAt   DateTime @default(now())
  isApproved  Boolean  @default(false)
  images      Image[]  // علاقة مع جدول الصور
}

model Category {
  id       String    @id @default(cuid())
  name     String
  parentId String?
  parent   Category? @relation("CategoryParent", fields: [parentId], references: [id])
  children Category[] @relation("CategoryParent")
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

// جدول الصور الجديد
model Image {
  id          String   @id @default(cuid())
  url         String   
  altText     String?  //
  fileName    String   // 
  fileSize    Int?     // حجم الملف بالبايت
  mimeType    String?  // نوع الملف (image/jpeg, image/png, etc.)
  productId   String?  // ربط مع المنتج (اختياري)
  userId      String?  // ربط مع المستخدم (اختياري)
  isMain      Boolean  @default(false) // هل هي الصورة الرئيسية
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  
  product     Product? @relation(fields: [productId], references: [id], onDelete: Cascade)
  user        User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("images")
}