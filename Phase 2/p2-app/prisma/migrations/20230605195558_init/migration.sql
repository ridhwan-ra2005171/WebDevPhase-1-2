-- CreateTable
CREATE TABLE "Institution" (
    "instituteID" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Location" (
    "locationID" TEXT NOT NULL PRIMARY KEY,
    "building" TEXT NOT NULL,
    "room" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Paper" (
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

-- CreateTable
CREATE TABLE "Session" (
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

-- CreateTable
CREATE TABLE "Review" (
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

-- CreateTable
CREATE TABLE "Schedule" (
    "schID" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PaperAuthors" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PaperAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "Paper" ("paperID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PaperAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PaperAuthors_AB_unique" ON "_PaperAuthors"("A", "B");

-- CreateIndex
CREATE INDEX "_PaperAuthors_B_index" ON "_PaperAuthors"("B");
