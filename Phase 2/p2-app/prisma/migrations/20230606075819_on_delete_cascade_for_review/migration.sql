-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "reviewID" TEXT NOT NULL PRIMARY KEY,
    "overallEvaluation" INTEGER,
    "paperContribution" INTEGER,
    "paperStrength" TEXT,
    "paperWeaknesses" TEXT,
    "paperID" TEXT NOT NULL,
    "reviewerID" INTEGER NOT NULL,
    CONSTRAINT "Review_paperID_fkey" FOREIGN KEY ("paperID") REFERENCES "Paper" ("paperID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerID_fkey" FOREIGN KEY ("reviewerID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("overallEvaluation", "paperContribution", "paperID", "paperStrength", "paperWeaknesses", "reviewID", "reviewerID") SELECT "overallEvaluation", "paperContribution", "paperID", "paperStrength", "paperWeaknesses", "reviewID", "reviewerID" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
