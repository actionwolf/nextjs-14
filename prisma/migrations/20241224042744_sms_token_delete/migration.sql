-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SMS_Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "SMS_Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SMS_Token" ("created_at", "id", "token", "updated_at", "user_id") SELECT "created_at", "id", "token", "updated_at", "user_id" FROM "SMS_Token";
DROP TABLE "SMS_Token";
ALTER TABLE "new_SMS_Token" RENAME TO "SMS_Token";
CREATE UNIQUE INDEX "SMS_Token_token_key" ON "SMS_Token"("token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
