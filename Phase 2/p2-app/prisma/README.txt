// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema







/////////////////////////////////////////////
/////////////////////////////////////////////

SUGGESTED DATA MODEL CHANGE


/////////////////////////////////////////////
/////////////////////////////////////////////





generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator dbml {
  provider = "prisma-dbml-generator"
}

model Institution {
  instituteID String  @id @default(cuid())
  code        String
  name        String
  country     String
  authors      Author[]
}

model Location {
  locationID String    @id @default(cuid())
  building   String
  room       String
  sessions   Session[]
}

model Paper {
  paperID     String      @id @default(cuid())
  title       String
  abstract    String
  authors     Author[]      @relation("PaperAuthor")
  presenterID Int?
  pdfLink     String
  reviews     Review[]    @relation("PaperReviews")
  session     Session?    @relation(fields: [sesID], references: [sesID])
  sesID       String?
  accepted  Boolean @default(false)
}


model Review {
  reviewID          String  @id @default(cuid())
  overallEvaluation Int     @default(0)
  paperContribution Int     @default(0)
  paperStrength     String  @default("")
  paperWeaknesses   String @default("")
  paper             Paper  @relation("PaperReviews",fields: [paperID], references: [paperID], onDelete: Cascade)
  paperID           String
  reviewer          Reviewer?  @relation("PapersReview",fields: [reviewerId], references: [reviewerId])
  reviewerId        Int?
}

model Session {
  sesID       String   @id @default(cuid())
  title       String
  location    Location @relation(fields: [locationID], references: [locationID])
  locationID  String
  // presenter   User     @relation("PresenterSessions", fields: [presenterID], references: [id])
  // presenterID Int   Cause related to paper not session    
  fromTime    String
  endTime     String
  schedule    Schedule @relation(fields: [schID], references: [schID], onDelete: Cascade)
  schID       String
  papers      Paper[]
}


model Schedule {
  schID    String    @id @default(cuid())
  date     String
  sessions Session[]
}

model User {
  id                Int       @id @default(autoincrement())
  first_name        String
  last_name         String
  email             String    @unique
  password          String
  role              String
  // authoredPaper    Paper?   @relation("PaperAuthor", fields: [paperID], references: [paperID])//for authors
  paperID String?
  // presentedSession Session[] @relation("PresenterSessions")//actually it is only one session per presenter
  
}

model Author {
  id                Int       @id @default(autoincrement())
  first_name        String
  last_name         String
  email             String    @unique
  password          String
  role              String
  authoredPaper    Paper?   @relation("PaperAuthor", fields: [paperID], references: [paperID])//for authors
  paperID           String?
  // presentedSession Session[] @relation("PresenterSessions")//actually it is only one session per presenter
  institute  Institution? @relation(fields: [instituteID], references: [instituteID])
  instituteID String?
}


model Reviewer {
  reviewerId        Int       @id @default(autoincrement())
  first_name        String
  last_name         String
  email             String    @unique
  password          String
  role              String
  // paperID String?
  // presentedSession Session[] @relation("PresenterSessions")//actually it is only one session per presenter
  reviews    Review[] @relation("PapersReview")//for reviewers
 
}
