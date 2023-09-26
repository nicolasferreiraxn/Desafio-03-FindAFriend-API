-- CreateTable
CREATE TABLE "requisites" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "requisites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requisites" ADD CONSTRAINT "requisites_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
