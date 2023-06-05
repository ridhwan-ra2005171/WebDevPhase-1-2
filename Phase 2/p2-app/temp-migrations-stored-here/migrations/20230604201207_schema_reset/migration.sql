/*
  Warnings:

  - The primary key for the `Institution` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `InstituteID` on the `Institution` table. All the data in the column will be lost.
  - Added the required column `instituteID` to the `Paper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituteID` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paper" (
    "paperID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "presenterID" INTEGER NOT NULL,
    "pdfLink" TEXT NOT NULL,
    "sesID" INTEGER,
    "instituteID" INTEGER NOT NULL,
    CONSTRAINT "Paper_sesID_fkey" FOREIGN KEY ("sesID") REFERENCES "Session" ("sesID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Paper_instituteID_fkey" FOREIGN KEY ("instituteID") REFERENCES "Institution" ("instituteID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "paperID", "pdfLink", "presenterID", "sesID", "title") SELECT "abstract", "paperID", "pdfLink", "presenterID", "sesID", "title" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
CREATE TABLE "new_Institution" (
    "instituteID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL
);
INSERT INTO "new_Institution" ("code", "country", "name") SELECT "code", "country", "name" FROM "Institution";
DROP TABLE "Institution";
ALTER TABLE "new_Institution" RENAME TO "Institution";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
