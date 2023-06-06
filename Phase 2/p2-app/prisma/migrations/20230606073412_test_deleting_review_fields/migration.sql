/*
  Warnings:

  - You are about to drop the column `overallEvaluation` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `paperContribution` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `paperStrength` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `paperWeaknesses` on the `Review` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "reviewID" TEXT NOT NULL PRIMARY KEY,
    "paperID" TEXT NOT NULL,
    "reviewerID" INTEGER NOT NULL,
    CONSTRAINT "Review_paperID_fkey" FOREIGN KEY ("paperID") REFERENCES "Paper" ("paperID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerID_fkey" FOREIGN KEY ("reviewerID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("paperID", "reviewID", "reviewerID") SELECT "paperID", "reviewID", "reviewerID" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
