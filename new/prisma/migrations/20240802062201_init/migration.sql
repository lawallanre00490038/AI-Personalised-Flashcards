-- CreateTable
CREATE TABLE "ALXSchool" (
    "id" SERIAL NOT NULL,
    "studentClass" TEXT NOT NULL,
    "studentDetails" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ALXSchool_pkey" PRIMARY KEY ("id")
);
