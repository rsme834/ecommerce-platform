-- AlterTable
ALTER TABLE "_CustomerToProduct" ADD CONSTRAINT "_CustomerToProduct_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CustomerToProduct_AB_unique";
