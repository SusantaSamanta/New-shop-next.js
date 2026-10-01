-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "sortOrder";

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "numberOfTimesBuy" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalSold" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalRevenue" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "averageRating" DECIMAL(3,2) NOT NULL DEFAULT 0,
ADD COLUMN     "numberOfReviews" INTEGER NOT NULL DEFAULT 0;