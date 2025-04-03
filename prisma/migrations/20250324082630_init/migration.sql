/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobile]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "members_mobile_key" ON "members"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "users_mobile_key" ON "users"("mobile");
