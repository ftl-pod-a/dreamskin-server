-- CreateTable
CREATE TABLE "Article" (
    "articleId" SERIAL NOT NULL,
    "articleCategory" TEXT NOT NULL,
    "articleTitle" TEXT NOT NULL,
    "articleUrl" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("articleId")
);
