-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paper" (
    "paperID" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "presenterID" INTEGER,
    "pdfLink" TEXT NOT NULL,
    "sesID" TEXT,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Paper_sesID_fkey" FOREIGN KEY ("sesID") REFERENCES "Session" ("sesID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "accepted", "paperID", "pdfLink", "presenterID", "sesID", "title") SELECT "abstract", "accepted", "paperID", "pdfLink", "presenterID", "sesID", "title" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
