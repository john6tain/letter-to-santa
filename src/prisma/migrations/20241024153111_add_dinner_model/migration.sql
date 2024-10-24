-- CreateTable
CREATE TABLE "Dinner" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,

    CONSTRAINT "Dinner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dinner_userId_title_key" ON "Dinner"("userId", "title");

-- AddForeignKey
ALTER TABLE "Dinner" ADD CONSTRAINT "Dinner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
