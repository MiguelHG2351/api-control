/*
  Warnings:

  - Added the required column `name` to the `CatRegister` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CatRegister" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "catUserId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CatRegister_catUserId_fkey" FOREIGN KEY ("catUserId") REFERENCES "CatUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CatRegister" ("catUserId", "createdAt", "id") SELECT "catUserId", "createdAt", "id" FROM "CatRegister";
DROP TABLE "CatRegister";
ALTER TABLE "new_CatRegister" RENAME TO "CatRegister";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
