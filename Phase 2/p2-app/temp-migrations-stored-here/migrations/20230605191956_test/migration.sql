/*
  Warnings:

  - Added the required column `schID` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Schedule" (
    "schID" TEXT NOT NULL PRIMARY KEY,
    "test" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
INSERT INTO "new_Session" ("endTime", "fromTime", "locationID", "presenterID", "sesID", "title") SELECT "endTime", "fromTime", "locationID", "presenterID", "sesID", "title" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
