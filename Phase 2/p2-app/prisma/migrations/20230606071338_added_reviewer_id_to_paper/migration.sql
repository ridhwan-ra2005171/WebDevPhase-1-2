-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paper" (
    "paperID" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "presenterID" INTEGER,
    "pdfLink" TEXT NOT NULL,
    "sesID" TEXT,
    "instituteID" TEXT NOT NULL,
    "reviewerID" INTEGER,
    CONSTRAINT "Paper_sesID_fkey" FOREIGN KEY ("sesID") REFERENCES "Session" ("sesID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Paper_instituteID_fkey" FOREIGN KEY ("instituteID") REFERENCES "Institution" ("instituteID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Paper_reviewerID_fkey" FOREIGN KEY ("reviewerID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "instituteID", "paperID", "pdfLink", "presenterID", "sesID", "title") SELECT "abstract", "instituteID", "paperID", "pdfLink", "presenterID", "sesID", "title" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
