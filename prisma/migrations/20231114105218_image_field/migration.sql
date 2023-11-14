/*
  Warnings:

  - Added the required column `catImage` to the `CatUser` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CatUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "catId" TEXT NOT NULL,
    "catName" TEXT NOT NULL,
    "catImage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_CatUser" ("catId", "catName", "createdAt", "id") SELECT "catId", "catName", "createdAt", "id" FROM "CatUser";
DROP TABLE "CatUser";
ALTER TABLE "new_CatUser" RENAME TO "CatUser";
CREATE UNIQUE INDEX "CatUser_catId_key" ON "CatUser"("catId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
