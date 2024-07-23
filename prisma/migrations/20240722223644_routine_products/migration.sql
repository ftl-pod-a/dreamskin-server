/*
  Warnings:

  - You are about to drop the column `balm` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `cleanser1` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `cleanser2` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `moisturizer1` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `moisturizer2` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `sunscreen` on the `Routine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Routine" DROP COLUMN "balm",
DROP COLUMN "cleanser1",
DROP COLUMN "cleanser2",
DROP COLUMN "moisturizer1",
DROP COLUMN "moisturizer2",
DROP COLUMN "sunscreen";

-- CreateTable
CREATE TABLE "_ProductToRoutine" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToRoutine_AB_unique" ON "_ProductToRoutine"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToRoutine_B_index" ON "_ProductToRoutine"("B");

-- AddForeignKey
ALTER TABLE "_ProductToRoutine" ADD CONSTRAINT "_ProductToRoutine_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRoutine" ADD CONSTRAINT "_ProductToRoutine_B_fkey" FOREIGN KEY ("B") REFERENCES "Routine"("routine_id") ON DELETE CASCADE ON UPDATE CASCADE;
