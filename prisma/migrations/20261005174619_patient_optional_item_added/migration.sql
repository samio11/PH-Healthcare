-- AlterTable
ALTER TABLE "patient" ALTER COLUMN "isDeleted" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL;
