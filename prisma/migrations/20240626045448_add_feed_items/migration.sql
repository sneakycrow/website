-- CreateEnum
CREATE TYPE "FeedItemType" AS ENUM ('SNEAKYCROW_BLOG_POST');

-- CreateTable
CREATE TABLE "FeedItem" (
    "id" TEXT NOT NULL,
    "type" "FeedItemType" NOT NULL,
    "userId" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "FeedItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedItem" ADD CONSTRAINT "FeedItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
