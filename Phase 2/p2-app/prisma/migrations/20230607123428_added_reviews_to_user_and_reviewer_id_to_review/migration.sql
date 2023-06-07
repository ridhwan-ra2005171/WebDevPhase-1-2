-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "reviewID" TEXT NOT NULL PRIMARY KEY,
    "overallEvaluation" INTEGER NOT NULL,
    "paperContribution" INTEGER NOT NULL,
    "paperStrength" TEXT NOT NULL,
    "paperWeaknesses" TEXT NOT NULL,
    "paperID" TEXT NOT NULL,
    "reviewerID" INTEGER,
    CONSTRAINT "Review_paperID_fkey" FOREIGN KEY ("paperID") REFERENCES "Paper" ("paperID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerID_fkey" FOREIGN KEY ("reviewerID") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("overallEvaluation", "paperContribution", "paperID", "paperStrength", "paperWeaknesses", "reviewID") SELECT "overallEvaluation", "paperContribution", "paperID", "paperStrength", "paperWeaknesses", "reviewID" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
