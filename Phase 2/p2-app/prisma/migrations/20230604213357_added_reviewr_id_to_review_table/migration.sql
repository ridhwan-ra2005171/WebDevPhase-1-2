/*
  Warnings:

  - Added the required column `reviewerID` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "reviewID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "overallEvaluation" INTEGER NOT NULL,
    "paperContribution" INTEGER NOT NULL,
    "paperStrength" TEXT NOT NULL,
    "paperWeaknesses" TEXT NOT NULL,
    "paperID" INTEGER NOT NULL,
    "reviewerID" INTEGER NOT NULL,
    CONSTRAINT "Review_paperID_fkey" FOREIGN KEY ("paperID") REFERENCES "Paper" ("paperID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerID_fkey" FOREIGN KEY ("reviewerID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("overallEvaluation", "paperContribution", "paperID", "paperStrength", "paperWeaknesses", "reviewID") SELECT "overallEvaluation", "paperContribution", "paperID", "paperStrength", "paperWeaknesses", "reviewID" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
