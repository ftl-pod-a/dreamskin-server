-- CreateTable
CREATE TABLE "Routine" (
    "routine_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cleanser1" TEXT NOT NULL,
    "cleanser2" TEXT NOT NULL,
    "balm" TEXT NOT NULL,
    "moisturizer1" TEXT NOT NULL,
    "moisturizer2" TEXT NOT NULL,
    "sunscreen" TEXT NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("routine_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Routine_user_id_key" ON "Routine"("user_id");

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
