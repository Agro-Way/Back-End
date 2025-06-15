-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USUARIO', 'PRODUTOR', 'CONDUTOR');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVO', 'INATIVO', 'PENDENTE', 'BANIDO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmPassword" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDENTE',
    "role" "Role" NOT NULL DEFAULT 'USUARIO',
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
