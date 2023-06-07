/*
  Warnings:

  - You are about to drop the `_PaperAuthors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paperID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_PaperAuthors_B_index";

-- DropIndex
DROP INDEX "_PaperAuthors_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PaperAuthors";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "paperID" TEXT NOT NULL,
    "instituteID" TEXT,
    CONSTRAINT "User_paperID_fkey" FOREIGN KEY ("paperID") REFERENCES "Paper" ("paperID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_instituteID_fkey" FOREIGN KEY ("instituteID") REFERENCES "Institution" ("instituteID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "first_name", "id", "instituteID", "last_name", "password", "role") SELECT "email", "first_name", "id", "instituteID", "last_name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
