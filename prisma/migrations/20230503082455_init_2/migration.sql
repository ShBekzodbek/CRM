-- CreateTable
CREATE TABLE "ExInfo" (
    "id" TEXT NOT NULL,
    "usage" TEXT,
    "role" TEXT,
    "membersT" TEXT,
    "membersC" TEXT,
    "hear" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlackTokenList" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "BlackTokenList_pkey" PRIMARY KEY ("id")
);
