/*
  Warnings:

  - The primary key for the `Institution` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Paper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Institution" (
    "instituteID" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL
);
INSERT INTO "new_Institution" ("code", "country", "instituteID", "name") SELECT "code", "country", "instituteID", "name" FROM "Institution";
DROP TABLE "Institution";
ALTER TABLE "new_Institution" RENAME TO "Institution";
CREATE TABLE "new_Review" (
    "reviewID" TEXT NOT NULL PRIMARY KEY,
    "overallEvaluation" INTEGER NOT NULL,
    "paperContribution" INTEGER NOT NULL,
    "paperStrength" TEXT NOT NULL,
    "paperWeaknesses" TEXT NOT NULL,
    "paperID" TEXT NOT NULL,
    "reviewerID" INTEGER NOT NULL,
    CONSTRAINT "Review_paperID_fkey" FOREIGN KEY ("paperID") REFERENCES "Paper" ("paperID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerID_fkey" FOREIGN KEY ("reviewerID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("overallEvaluation", "paperContribution", "paperID", "paperStrength", "paperWeaknesses", "reviewID", "reviewerID") SELECT "overallEvaluation", "paperContribution", "paperID", "paperStrength", "paperWeaknesses", "reviewID", "reviewerID" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_Schedule" (
    "schID" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL
);
INSERT INTO "new_Schedule" ("date", "schID") SELECT "date", "schID" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
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
CREATE TABLE "new_Location" (
    "locationID" TEXT NOT NULL PRIMARY KEY,
    "building" TEXT NOT NULL,
    "room" TEXT NOT NULL
);
INSERT INTO "new_Location" ("building", "locationID", "room") SELECT "building", "locationID", "room" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE TABLE "new_Session" (
    "sesID" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "locationID" TEXT NOT NULL,
    "presenterID" INTEGER NOT NULL,
    "fromTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "schID" TEXT NOT NULL,
    CONSTRAINT "Session_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "Location" ("locationID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_presenterID_fkey" FOREIGN KEY ("presenterID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_schID_fkey" FOREIGN KEY ("schID") REFERENCES "Schedule" ("schID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("endTime", "fromTime", "locationID", "presenterID", "schID", "sesID", "title") SELECT "endTime", "fromTime", "locationID", "presenterID", "schID", "sesID", "title" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE TABLE "new__PaperAuthors" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PaperAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "Paper" ("paperID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PaperAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__PaperAuthors" ("A", "B") SELECT "A", "B" FROM "_PaperAuthors";
DROP TABLE "_PaperAuthors";
ALTER TABLE "new__PaperAuthors" RENAME TO "_PaperAuthors";
CREATE UNIQUE INDEX "_PaperAuthors_AB_unique" ON "_PaperAuthors"("A", "B");
CREATE INDEX "_PaperAuthors_B_index" ON "_PaperAuthors"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
