/*
  Warnings:

  - You are about to alter the column `endTime` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `fromTime` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "sesID" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "locationID" TEXT NOT NULL,
    "presenterID" INTEGER NOT NULL,
    "fromTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "schID" TEXT NOT NULL,
    CONSTRAINT "Session_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "Location" ("locationID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_presenterID_fkey" FOREIGN KEY ("presenterID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_schID_fkey" FOREIGN KEY ("schID") REFERENCES "Schedule" ("schID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("endTime", "fromTime", "locationID", "presenterID", "schID", "sesID", "title") SELECT "endTime", "fromTime", "locationID", "presenterID", "schID", "sesID", "title" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
