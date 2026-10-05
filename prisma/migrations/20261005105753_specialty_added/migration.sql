-- CreateTable
CREATE TABLE "specialties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specialties_id_key" ON "specialties"("id");

-- CreateIndex
CREATE UNIQUE INDEX "specialties_title_key" ON "specialties"("title");

-- CreateIndex
CREATE INDEX "idx_sp_deleted" ON "specialties"("isDeleted");

-- CreateIndex
CREATE INDEX "idx_sp_title" ON "specialties"("title");
