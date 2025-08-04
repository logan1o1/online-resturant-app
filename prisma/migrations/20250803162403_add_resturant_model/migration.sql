-- CreateTable
CREATE TABLE "Resturant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Resturant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resturant" ADD CONSTRAINT "Resturant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
