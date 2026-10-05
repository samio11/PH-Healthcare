-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'SUPER_ADMIN', 'ADMIN', 'DOCTOR');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('BLOCKED', 'DELETED', 'ACTIVE');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PATIENT',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
