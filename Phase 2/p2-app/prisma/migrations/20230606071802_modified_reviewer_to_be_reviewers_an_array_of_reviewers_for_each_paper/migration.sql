/*
  Warnings:

  - You are about to drop the column `reviewerID` on the `Paper` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_PaperReviewer" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PaperReviewer_A_fkey" FOREIGN KEY ("A") REFERENCES "Paper" ("paperID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PaperReviewer_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    CONSTRAINT "Paper_sesID_fkey" FOREIGN KEY ("sesID") REFERENCES "Session" ("sesID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Paper_instituteID_fkey" FOREIGN KEY ("instituteID") REFERENCES "Institution" ("instituteID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "instituteID", "paperID", "pdfLink", "presenterID", "sesID", "title") SELECT "abstract", "instituteID", "paperID", "pdfLink", "presenterID", "sesID", "title" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_PaperReviewer_AB_unique" ON "_PaperReviewer"("A", "B");

-- CreateIndex
CREATE INDEX "_PaperReviewer_B_index" ON "_PaperReviewer"("B");
