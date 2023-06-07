/*
  Warnings:

  - You are about to drop the `_PapersReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `instituteID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reviewerID` on the `Review` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_PapersReview_B_index";

-- DropIndex
DROP INDEX "_PapersReview_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PapersReview";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "paperID" TEXT,
    "instituteID" TEXT,
    CONSTRAINT "Author_paperID_fkey" FOREIGN KEY ("paperID") REFERENCES "Paper" ("paperID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Author_instituteID_fkey" FOREIGN KEY ("instituteID") REFERENCES "Institution" ("instituteID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reviewer" (
    "reviewerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "paperID" TEXT
);
INSERT INTO "new_User" ("email", "first_name", "id", "last_name", "paperID", "password", "role") SELECT "email", "first_name", "id", "last_name", "paperID", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Review" (
    "reviewID" TEXT NOT NULL PRIMARY KEY,
    "overallEvaluation" INTEGER NOT NULL DEFAULT 0,
    "paperContribution" INTEGER NOT NULL DEFAULT 0,
    "paperStrength" TEXT NOT NULL DEFAULT '',
    "paperWeaknesses" TEXT NOT NULL DEFAULT '',
    "paperID" TEXT NOT NULL,
    "reviewerId" INTEGER,
    CONSTRAINT "Review_paperID_fkey" FOREIGN KEY ("paperID") REFERENCES "Paper" ("paperID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Reviewer" ("reviewerId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("overallEvaluation", "paperContribution", "paperID", "paperStrength", "paperWeaknesses", "reviewID") SELECT "overallEvaluation", "paperContribution", "paperID", "paperStrength", "paperWeaknesses", "reviewID" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Reviewer_email_key" ON "Reviewer"("email");
